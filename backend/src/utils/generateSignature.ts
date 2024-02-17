const crypto = require("crypto");
import { GenerateSignatureParams } from "./types/signature";
import { giftLovTimeStampFormat } from "./giftLovTimeStampFormat";
import config from "../config/index";

// Extract all primitive values from the object
function extractPrimitiveValues(obj: any) {
  const values = [];

  function extract(obj) {
    for (const key in obj) {
      const value = obj[key];
      if (typeof value === "object") {
        extract(value);
      } else if (typeof value !== "function") {
        values.push(String(value));
      }
    }
  }

  extract(obj);
  return values;
}

export const generateSignature = async ({
  currentUrl,
  requestMethod,
  queryParams = {},
  body = {},
  authToken,
}: GenerateSignatureParams): Promise<[string, string]> => {
  const sortedQueryParams = Object.values(queryParams).sort().join("");

  body = extractPrimitiveValues(body);
  const sortedBody = body ? Object.values(body).sort().join("") : null;

  const parameters = [sortedBody, sortedQueryParams].sort().join("");
  const timestamp = await giftLovTimeStampFormat(config.app.currentTimezone);

  const signatureString = `${currentUrl}${requestMethod}${parameters}${timestamp}${authToken}`;

  // Get secret from environment variables
  const secret = config.app.secret;

  const signature: string = crypto
    .createHmac("sha512", secret)
    .update(signatureString)
    .digest("hex");

  return [timestamp, signature];
};

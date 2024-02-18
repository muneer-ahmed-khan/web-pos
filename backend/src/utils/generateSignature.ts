const crypto = require("crypto");
import { GenerateSignatureParams } from "./types/signature";
import { giftLovTimeStampFormat } from "./giftLovTimeStampFormat";
import config from "../config/index";

function flattenAndSortObject(obj) {
  const result = [];

  function flattenHelper(item) {
    if (typeof item === "object" && item !== null) {
      if (Array.isArray(item)) {
        item.forEach(flattenHelper);
      } else {
        Object.values(item).forEach(flattenHelper);
      }
    } else {
      result.push(String(item));
    }
  }

  flattenHelper(obj);
  return result.sort((a, b) => String(a).localeCompare(String(b)));
}

export const generateSignature = async ({
  currentUrl,
  requestMethod,
  queryParams = {},
  body = {},
  authToken,
}: GenerateSignatureParams): Promise<[string, string]> => {
  const sortedQueryParams = Object.values(queryParams).sort().join("");

  body = flattenAndSortObject(body);

  const sortedBody = body ? Object.values(body).sort().join("") : null;

  const parameters = [sortedBody, sortedQueryParams].sort().join("");
  const timestamp = await giftLovTimeStampFormat(config.app.currentTimezone);

  const signatureString = `${currentUrl}${requestMethod}${parameters}${timestamp}${authToken}`;

  const secret = config.giftLov.secret;

  const signature: string = crypto
    .createHmac("sha512", secret)
    .update(signatureString)
    .digest("hex");

  return [timestamp, signature];
};

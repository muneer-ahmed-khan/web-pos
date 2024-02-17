const crypto = require("crypto");
import { GenerateSignatureParams } from "./types/signature";
import { giftLovTimeStampFormat } from "./giftLovTimeStampFormat";
import config from "../config/index";

export const generateSignature = async ({
  currentUrl,
  requestMethod,
  queryParams = {},
  body = {},
  authToken,
}: GenerateSignatureParams): Promise<[string, string]> => {
  const sortedQueryParams = Object.values(queryParams).sort().join("");
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

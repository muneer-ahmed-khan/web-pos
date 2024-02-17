const crypto = require("crypto");
import { Body, Query } from "./types/signature";

export function generateSignature(
  currentUrl: string,
  requestMethod: string,
  queryParams: Query,
  body: Body,
  timestamp: string,
  authToken: string
): string {
  const sortedQueryParams = Object.values(queryParams).sort().join("");
  const sortedBody = body ? Object.values(body).sort().join("") : null;

  const parameters = [sortedBody, sortedQueryParams].sort().join("");

  const signatureString = `${currentUrl}${requestMethod}${parameters}${timestamp}${authToken}`;

  // Get secret from environment variables
  const secret = process.env.SECRET_KEY;

  const signature = crypto
    .createHmac("sha512", secret)
    .update(signatureString)
    .digest("hex");

  return signature;
}

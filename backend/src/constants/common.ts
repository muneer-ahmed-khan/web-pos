export enum HTTP_STATUS {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHENTICATED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

export enum RequestMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
  OPTIONS = "OPTIONS",
  HEAD = "HEAD",
}

export enum RequestHeader {
  ACCEPT = "Accept",
  CONTENT_TYPE = "Content-Type",
  AUTHORIZATION = "Authorization",
  USER_AGENT = "User-Agent",
  CONTENT_LENGTH = "Content-Length",
  CACHE_CONTROL = "Cache-Control",
  COOKIE = "Cookie",
  SET_COOKIE = "Set-Cookie",
  X_REQUESTED_WITH = "X-Requested-With",
  X_CSRF_TOKEN = "X-Csrf-Token",
  IF_MATCH = "If-Match",
  IF_NONE_MATCH = "If-None-Match",
  GIFT_LOV_DATE = "X-GIFTLOV-DATE",
  SIGNATURE = "signature",
}

export enum ApiContentType {
  JSON = "application/json",
  XML = "application/xml",
  FORM_URLENCODED = "application/x-www-form-urlencoded",
  HTML = "text/html",
  PLAIN_TEXT = "text/plain",
  MULTIPART_FORM_DATA = "multipart/form-data",
  OCTET_STREAM = "application/octet-stream",
}

export enum GIFT_LOV_URL_ENDPOINTS {
  GENERATE_TOKEN = "generateToken",
  CHECK_TOKEN = "checkToken",
  ITEMS = "items",
  GET_ORDERS = "orders",
  PLACE_ORDER = "placeOrder",
  GENERATE_SINGLE_USE_URL = "generateSingleUseURL",
}

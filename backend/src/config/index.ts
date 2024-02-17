import { GIFT_LOV_URL_ENDPOINTS } from "../constants/common";
import { getEnv } from "../helpers/common";

export default {
  app: {
    port: getEnv("APP_PORT"),
    name: getEnv("APP_NAME", "App Name"),
    environment: getEnv("NODE_ENV", "local"),
    secret: getEnv("SECRET"),
    currentTimezone: getEnv("CURRENT_TIMEZONE", 0),
  },
  database: {
    user: getEnv("DB_USERNAME"),
    host: getEnv("DB_HOST"),
    database: getEnv("DB_DATABASE"),
    password: getEnv("DB_PASSWORD"),
    port: Number(getEnv("DB_PORT")),
  },
  giftLovUrls: {
    BaseUrl: getEnv("BASE_URL"),
    Auth: {
      generateToken: GIFT_LOV_URL_ENDPOINTS.GENERATE_TOKEN,
      checkToken: GIFT_LOV_URL_ENDPOINTS.CHECK_TOKEN,
    },
    Catalogue: {
      items: GIFT_LOV_URL_ENDPOINTS.ITEMS,
    },
    Order: {
      getOrders: GIFT_LOV_URL_ENDPOINTS.GET_ORDERS,
      placeOrder: GIFT_LOV_URL_ENDPOINTS.PLACE_ORDER,
    },
  },
};

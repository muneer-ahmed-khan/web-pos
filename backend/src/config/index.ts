import { getEnv } from "../helpers/common";

export default {
  app: {
    port: getEnv("APP_PORT"),
    name: getEnv("APP_NAME", "App Name"),
    environment: getEnv("NODE_ENV", "local"),
    secret: getEnv("GIFTLOV_SECRET"),
    currentTimezone: getEnv("CURRENT_TIMEZONE", 0),
  },
  database: {
    user: getEnv("DB_USERNAME"),
    host: getEnv("DB_HOST"),
    database: getEnv("DB_DATABASE"),
    password: getEnv("DB_PASSWORD"),
    port: Number(getEnv("DB_PORT")),
  },
  giftLov: {
    baseUrl: getEnv("GIFTLOV_BASE_URL"),
    secret: getEnv("GIFTLOV_SECRET"),
  },
};

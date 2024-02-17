import { getEnv } from "../helpers/common";

export default {
  app: {
    port: getEnv("APP_PORT"),
    name: getEnv("APP_NAME", "App Name"),
    environment: getEnv("NODE_ENV", "local"),
  },
  database: {
    user: getEnv("DB_USERNAME"),
    host: getEnv("DB_HOST"),
    database: getEnv("DB_DATABASE"),
    password: getEnv("DB_PASSWORD"),
    port: Number(getEnv("DB_PORT")),
  },
  giftlov: {
    login: getEnv("LOGIN_URL")
  }
};

import { ApiEndpoints } from "@/constants/common";
import { getEnv } from "@/helpers/common";

export default {
  app: {
    baseUrl: getEnv("VITE_BASE_URL", "http:localhost:3000"),
  },
  apiEndPoints: {
    Auth: {
      login: ApiEndpoints.AUTH_LOGIN,
    },
    CATALOGUE: {
      items: ApiEndpoints.CATALOGUE_ITEMS,
    },
    Order: {
      orders: ApiEndpoints.ORDERS,
      placeOrder: ApiEndpoints.PLACE_ORDERS,
    },
  },
};

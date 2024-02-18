import { useTokenManager } from "@/composable/useTokenManager";
import type { NavigationGuard } from "vue-router";
import moment from "moment";
import { useStore } from "@/stores";

export const authGuard: NavigationGuard = async (to, from, next) => {
  let store = useStore();

  const { getToken } = useTokenManager();

  try {
    const tokenData = await getToken();

    if (tokenData) {
      const expiryDate = moment.utc(tokenData.expireDate);

      // check if current time is past expiry date
      if (moment().isSameOrAfter(expiryDate)) {
        next("/login");
      } else {
        store.isLoggedIn = true;
        next();
      }
    } else {
      next("/login");
    }
  } catch (error) {
    console.error("Error in authGuard:", error);
    next("/login");
  }
};

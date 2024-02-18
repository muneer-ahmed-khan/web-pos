import { ref } from "vue";
import { login } from "@/api/authService";
import { useStore } from "@/stores";

interface LoginParams {
  username: string;
  password: string;
}

export function useAuth() {
  const store = useStore();

  const username = ref("");
  const fullName = ref("");
  const organization = ref("");

  async function loginUser(body: LoginParams) {
    try {
      const response = await login(body.username, body.password);

      username.value = body.username;
      fullName.value = response.fullName;
      organization.value = response.organization;

      store.isLoggedIn = true;

      return { token: response.token, expireDate: response.expireDate };
    } catch (error) {
      console.error("error in useAuth - loginUser", error);
    }
  }

  return {
    username,
    fullName,
    organization,
    loginUser,
  };
}

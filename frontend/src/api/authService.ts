import axios from "@/utils/axios";
import config from "@/config";

interface LoginResponse {
  token: string;
  fullName: string;
  organization: string;
  expireDate: string;
  privileges: Array<string>;
  configurations: {
    placeOrder: {
      referenceNo: string;
    };
  };
}

export async function login(
  username: string,
  password: string
): Promise<LoginResponse> {
  try {
    const response = await axios.post(config.apiEndPoints.Auth.login, {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error("Login failed");
  }
}

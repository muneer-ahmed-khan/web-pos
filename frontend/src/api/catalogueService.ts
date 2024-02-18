import axios from "@/utils/axios";
import config from "@/config";
import { useLocalStorage } from "@/composable/useLocalStorage";

export interface ItemsResponse {
  id: string;
  name: string;
  brand: string;
  usageInstructions: string;
  termsAndConditions: string;
  giftCardInformation: string;
  fromValue: number;
  toValue: number;
  currency: string;
  cardFaceImage: string;
  productId: number;
  categories: Array<string>;
}

export async function items(paramString: string): Promise<ItemsResponse> {
  const { getLocal } = useLocalStorage();

  try {
    const response = await axios.get(
      config.apiEndPoints.CATALOGUE.items + paramString,
      {
        headers: {
          Authorization: getLocal("tokenData").token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error items in:", error);
    throw new Error("failed to fetch items");
  }
}

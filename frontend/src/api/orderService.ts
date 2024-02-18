import axios from "@/utils/axios";
import config from "@/config";
import { useLocalStorage } from "@/composable/useLocalStorage";

export interface OrdersResponse {
  id: string;
  customerName: string;
  deliveryChannel: string;
  emailAddress: string;
  smsMobileNumber: string;
  referenceNo: string;
  creationDate: string;
  placementDate: string;
  lineItems: [
    {
      lineNumber: number;
      cardItemId: string;
      cardItemName: string;
      value: number;
      currency: string;
      certificateGenerationKey: string;
      status: string;
      claimURL: string;
      settlementCurrency: string;
      exchangeRate: string;
      settlementPrice: string;
      netPrice: string;
    }
  ];
}

export async function orders(): Promise<OrdersResponse> {
  const { getLocal } = useLocalStorage();

  try {
    const response = await axios.get(config.apiEndPoints.Order.orders, {
      headers: {
        Authorization: getLocal("tokenData").token,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error order in:", error);
    throw new Error("failed to fetch orders");
  }
}

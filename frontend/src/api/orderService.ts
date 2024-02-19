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
  } catch (error: any) {
    console.error("Error order in:", error);
    throw new Error("failed to fetch orders");
  }
}

export async function getOrder(id: string): Promise<OrdersResponse> {
  const { getLocal } = useLocalStorage();

  try {
    const response = await axios.get(
      config.apiEndPoints.Order.orders + "/" + id,
      {
        headers: {
          Authorization: getLocal("tokenData").token,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error order in:", error);
    throw new Error("failed to fetch orders");
  }
}

export async function placeOrder(data: OrdersResponse): Promise<any> {
  const { getLocal } = useLocalStorage();

  try {
    const response = await axios.post(
      config.apiEndPoints.Order.placeOrder,
      data,
      {
        headers: {
          Authorization: getLocal("tokenData").token,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    // console.log("Error placeOrder service", error.message);
    throw new Error("failed in placeOrder");
  }
}

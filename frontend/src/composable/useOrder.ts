import { ref } from "vue";
import { orders, getOrder, placeOrder } from "@/api/orderService";

export function useOrders() {
  const isFetching = ref(true);
  const error = ref(false);

  async function fetchOrders(): Promise<any> {
    try {
      const data = await orders();
      isFetching.value = false;

      return data;
    } catch (err) {
      error.value = true;
      console.error("Error in useOrders - fetchOrders", err);
    }
  }

  async function getOrderStatus(id: string): Promise<any> {
    try {
      const data = await getOrder(id);
      isFetching.value = false;

      return data;
    } catch (err) {
      error.value = true;
      console.error("Error in useOrders - getOrderStatus", err);
    }
  }

  async function processOrder(body: any): Promise<any> {
    try {
      const data = await placeOrder(body);
      isFetching.value = false;

      return data;
    } catch (err: any) {
      error.value = true;
      isFetching.value = false;

      // console.log("Error in useOrders - processOrder", err.message);
      return;
    }
  }

  return {
    fetchOrders,
    processOrder,
    getOrderStatus,
    error,
    isFetching,
  };
}

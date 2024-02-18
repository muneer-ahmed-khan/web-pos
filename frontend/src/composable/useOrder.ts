import { ref } from "vue";
import { orders } from "@/api/orderService";

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
      console.error("Error in fetchOrders - fetchOrders", err);
    }
  }

  return {
    fetchOrders,
    error,
    isFetching,
  };
}

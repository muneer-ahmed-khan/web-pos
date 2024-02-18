import { ref } from "vue";
import { items } from "@/api/catalogueService";

export function useCatalogue() {
  const isFetching = ref(false);
  const error = ref(false);

  async function fetchItems(): Promise<any> {
    try {
      const params: { [key: string]: any } = {
        current: 1,
        rowCount: 100,
        lang: "EN",
        includePricingDetails: true,
      };

      let paramString = "?";
      let firstParam = true;

      for (const property in params) {
        if (firstParam) {
          paramString += `${property}=${params[property]}`;
          firstParam = false;
        } else paramString += `&${property}=${params[property]}`;
      }

      const data = await items(paramString);
      isFetching.value = true;

      return data;
    } catch (err) {
      error.value = true;
      console.error("Error in useCatalogue - fetchItems", err);
    }
  }

  return {
    fetchItems,
    error,
    isFetching,
  };
}

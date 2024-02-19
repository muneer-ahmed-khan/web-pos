<script setup lang="ts">
import { useOrders } from "@/composable/useOrder";
import { onMounted, ref } from "vue";
import Order from "@/components/Order.vue";

const { fetchOrders, isFetching, error } = useOrders();
const orders = ref<any[]>([]);
const loading = ref<boolean>(true);

onMounted(async () => {
  const data = await fetchOrders();
  if (!isFetching.value) {
    if (error.value) {
      console.error(
        "An error occurred fetching your orders. Please try again."
      );
    }

    if (data.orders.length) {
      loading.value = isFetching.value;
      orders.value = data.orders;
    }
  }
});
</script>

<template>
  <div class="mt-20 md:mt-28">
    <div v-if="loading" class="flex flex-wrap justify-center p-5 md:p-10">
      <div
        class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mx-2 my-3 bg-gray-200 rounded-lg p-5"
        v-for="index in 10"
        :key="index"
      ></div>
    </div>
    <div v-else class="flex flex-wrap justify-center p-5 md:p-10">
      <Order v-for="order in orders" :key="order.id" :order="order" />
    </div>
  </div>
</template>

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
  <div class="tw-my-20 mt-28">
    <div v-if="loading" class="md:tw-p-10 flex flex-wrap justify-around">
      <div
        class="tw-my-3 tw-mx-2 md:tw-w-1/2 w-full bg-gray-200 rounded-lg p-5"
        v-for="index in 10"
        :key="index"
      ></div>
    </div>
    <div v-else class="md:tw-pa-10 tw-p-5 flex flex-wrap justify-around">
      <Order v-for="order in orders" :key="order.id" :order="order" />
    </div>
  </div>
</template>

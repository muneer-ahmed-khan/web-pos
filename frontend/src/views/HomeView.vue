<script setup lang="ts">
import { ref } from "vue";

const viewsLinks = ref([
  {
    id: "catalogue",
    name: "Catalogue",
    path: "/catalogue",
  },
  {
    id: "orders",
    name: "Orders",
    path: "/orders",
  },
  {
    id: "ordering",
    name: "Place Order",
    path: "/ordering",
  },
]);
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <h1 class="text-3xl font-bold mb-4">Welcome to WEB-POS</h1>
    <p class="text-lg text-gray-700 mb-28">
      Thank you for logging in. You can navigate to different sections of our
      website using the links below.
    </p>
    <div class="flex flex-col space-y-2">
      <router-link
        v-for="link in viewsLinks"
        :key="link.id"
        :to="link.path"
        class="text-blue-500 hover:text-blue-700"
      >
        {{ link.name }}
      </router-link>
    </div>
  </div>
</template>

<style scoped>
/* Add any scoped styles here if needed */
</style>

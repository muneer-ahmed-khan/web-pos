<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

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

const router = useRouter();

function navigateTo(path: string) {
  router.push(path);
}
</script>

<template>
  <template v-for="view in viewsLinks" :key="view.id">
    <button
      class="mx-4 text-gray-700 hover:text-gray-900 focus:outline-none text-xl"
      @click="navigateTo(view.path)"
    >
      {{ view.name }}
    </button>
  </template>
</template>

<style scoped>
.mx-4 {
  margin-left: 1rem;
  margin-right: 1rem;
}
.text-gray-700 {
  color: #4b5563;
}
.hover\:text-gray-900:hover {
  color: #4a5568;
}
.focus\:outline-none:focus {
  outline: none;
}
</style>

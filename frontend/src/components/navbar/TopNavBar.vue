<script setup lang="ts">
import { ref } from "vue";
import NavbarItem from "./NavbarItem.vue";
import { useRouter } from "vue-router";
import { useLocalStorage } from "@/composable/useLocalStorage";
import { useStore } from "@/stores";

const store = useStore();
const router = useRouter();
const mobile = false;
const menuOpen = ref(false);

const { removeLocal } = useLocalStorage();

function toggleDrawer() {
  store.drawer = !store.drawer;
}

function logout() {
  removeLocal("tokenData");
  router.push("/login");

  store.isLoggedIn = false;
}
</script>

<template>
  <header
    class="fixed top-0 left-0 w-full flex items-center justify-between px-4 py-2 bg-white shadow-md"
  >
    <div class="flex items-center">
      <router-link v-if="!mobile" to="/">
        <img
          src="@/assets/munero-logo.png"
          class="w-10 h-10 ml-4"
          alt="munero-logo"
        />
      </router-link>
      <button v-else @click="toggleDrawer" class="p-2">
        <i class="fas fa-bars"></i>
      </button>
    </div>

    <div class="flex items-center">
      <div v-if="!mobile && store.isLoggedIn" class="flex items-end mr-4">
        <NavbarItem />
      </div>

      <div class="relative" v-if="store.isLoggedIn">
        <button @click="logout" class="p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped></style>

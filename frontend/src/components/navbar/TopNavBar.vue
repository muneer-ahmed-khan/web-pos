<script setup lang="ts">
import { reactive } from "vue";
import NavbarItem from "./NavbarItem.vue";
import { useRouter } from "vue-router";
import { useLocalStorage } from "@/composable/useLocalStorage";
import { useStore } from "@/stores";

const store = useStore();
const router = useRouter();

const state = reactive({
  isMobile: window.innerWidth <= 640, // Set your mobile breakpoint here
});

window.addEventListener("resize", () => {
  state.isMobile = window.innerWidth <= 640;
});

const mobile = state.isMobile;

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
      <router-link v-if="!state.isMobile" to="/" class="flex">
        <img
          src="@/assets/munero-logo.png"
          class="w-12 h-10 ml-4 inline"
          alt="munero-logo"
        />
        <h2 class="text-3xl text-cyan-700 font-semibold mb-6">WEB-POS</h2>
      </router-link>

      <button v-else @click="toggleDrawer" class="p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="h-6 w-6"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h13a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h13a1 1 0 110 2H4a1 1 0 01-1-1zM4 15a1 1 0 100 2h13a1 1 0 100-2H4z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <div class="flex items-center">
      <div
        v-if="!state.isMobile && store.isLoggedIn"
        class="flex items-end mr-4"
      >
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

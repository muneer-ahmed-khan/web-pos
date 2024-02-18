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

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

function closeMenu() {
  menuOpen.value = false;
}

function goToDashboard() {
  router.push("/");
}

function logout() {
  removeLocal("tokenData");
  router.push("/login");
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
    <div v-if="!mobile && store.isLoggedIn" class="flex justify-center">
      <NavbarItem />
    </div>
    <div class="flex items-center">
      <!-- <ThemeButton /> -->
      <div class="relative ml-2">
        <button @click="toggleMenu" class="p-2">
          <i class="fas fa-user"></i>
        </button>
        <div
          v-show="menuOpen"
          class="absolute top-8 right-0 bg-white shadow-md"
        >
          <ul>
            <li>
              <button
                @click="logout"
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped></style>

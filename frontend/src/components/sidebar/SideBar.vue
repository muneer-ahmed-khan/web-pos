<script setup lang="ts">
import { useStore } from "@/stores";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useLocalStorage } from "@/composable/useLocalStorage";

const { removeLocal } = useLocalStorage();
const store = useStore();
const router = useRouter();

const state = reactive({
  isMobile: window.innerWidth <= 640, // Set your mobile breakpoint here
});

window.addEventListener("resize", () => {
  state.isMobile = window.innerWidth <= 640;
});

function toggleDrawer() {
  store.drawer = !store.drawer;
}

function logout() {
  store.drawer = !store.drawer;
  removeLocal("tokenData");
  router.push("/login");
}
</script>

<template>
  <transition name="slide">
    <div
      v-if="state.isMobile"
      class="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
      v-show="store.drawer"
    >
      <div class="sidebar">
        <!-- Sidebar content -->
        <div class="bg-white w-80 p-6 rounded-lg shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-6 h-6 text-black cursor-auto"
            @click="toggleDrawer"
          >
            <path
              fill-rule="evenodd"
              d="M8.293 3.293a1 1 0 011.414 1.414L4.414 10l5.293 5.293a1 1 0 01-1.414 1.414l-6-6a1 1 0 010-1.414l6-6a1 1 0 010 1.414z"
              clip-rule="evenodd"
            />
          </svg>

          <ul class="navigation-links">
            <li><router-link to="/catalogue">Catalogue</router-link></li>
            <li><router-link to="/orders">Orders</router-link></li>
            <li><router-link to="/ordering">New Order</router-link></li>
          </ul>

          <div class="logout-button mt-4">
            <button
              @click="logout"
              class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}
.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 80%;
  max-width: 300px; /* Adjust as needed */
  background-color: #fff;
  z-index: 1000;
}
</style>

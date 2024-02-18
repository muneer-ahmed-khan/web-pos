<script setup lang="ts">
import { useStore } from "@/stores";

const store = useStore();
const mobile = false;
</script>

<template>
  <div v-if="mobile" class="fixed inset-0 flex z-50">
    <div class="fixed inset-0">
      <transition
        enter-active-class="transition-opacity ease-linear duration-300"
        leave-active-class="transition-opacity ease-linear duration-300"
      >
        <div
          class="absolute inset-0 bg-gray-600 opacity-75"
          @click="store.drawer = false"
        ></div>
      </transition>
    </div>
    <div class="relative flex-1 flex flex-col max-w-xs w-full bg-white">
      <div class="absolute top-0 right-0 -mr-14 p-1">
        <button
          @click="store.drawer = false"
          class="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600"
        >
          <svg
            class="h-6 w-6 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
          <span class="sr-only">Close sidebar</span>
        </button>
      </div>
      <div
        class="flex items-center justify-center h-16 bg-gray-100 border-b border-gray-200"
      >
        <div class="flex items-center">
          <div
            class="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center"
          >
            <i class="fas fa-user text-gray-600"></i>
          </div>
        </div>
      </div>
      <div class="flex-1 h-0 overflow-y-auto">
        <nav class="mt-5 px-2 space-y-1">
          <router-link
            to="/catalogue"
            class="group flex items-center px-2 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
          >
            <span class="truncate">Catalogue</span>
          </router-link>
          <router-link
            to="/orders"
            class="group flex items-center px-2 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
          >
            <span class="truncate">Orders</span>
          </router-link>
          <router-link
            to="/ordering"
            class="group flex items-center px-2 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
          >
            <span class="truncate">New Order</span>
          </router-link>
        </nav>
      </div>
      <div class="border-t border-gray-200 py-4">
        <button
          @click=""
          class="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

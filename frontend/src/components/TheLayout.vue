<script setup lang="ts">
import TopNavBar from "@/components/navbar/TopNavBar.vue";
import SideBar from "@/components/sidebar/SideBar.vue";
import TheFooter from "@/components/TheFooter.vue";
</script>

<template>
  <div class="w-screen h-screen flex flex-col">
    <!-- Sidebar -->
    <SideBar class="flex-shrink-0" />

    <!-- Top Navigation -->
    <TopNavBar />

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto bg-gray-100">
      <div class="p-4">
        <!-- Content Slot -->
        <slot />
      </div>
    </main>

    <!-- Footer -->
    <TheFooter />
  </div>
</template>

<style scoped>
.h-screen {
  height: 100vh;
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.flex-1 {
  flex: 1;
}

.flex-shrink-0 {
  flex-shrink: 0;
}

.overflow-y-auto {
  overflow-y: auto;
}

.bg-gray-100 {
  background-color: #f3f4f6;
}

.p-4 {
  padding: 1rem;
}
</style>

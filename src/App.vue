<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from './components/layout/AppHeader.vue'
import AppSidebar from './components/layout/AppSidebar.vue'

const sidebarOpen = ref(true)
const mobileSidebarOpen = ref(false)

const toggleSidebar = () => {
  if (window.innerWidth < 768) {
    mobileSidebarOpen.value = !mobileSidebarOpen.value
  } else {
    sidebarOpen.value = !sidebarOpen.value
  }
}
</script>

<template>
  <div class="h-svh w-full bg-black text-white flex flex-col overflow-hidden">
    <AppHeader @toggleSidebar="toggleSidebar" />

    <div class="flex flex-1 overflow-hidden relative">
      <AppSidebar
        :is-expanded="sidebarOpen"
        :mobile-open="mobileSidebarOpen"
        @close-mobile="mobileSidebarOpen = false"
      />

      <main class="flex-1 overflow-y-auto min-w-0 scroll-smooth overscroll-contain bg-transparent">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style>
body {
  height: 100svh;
  overflow: hidden;
  margin: 0;
  overscroll-behavior: none;
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
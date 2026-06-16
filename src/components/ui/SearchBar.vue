<template>
  <header class="h-16 border-b border-white/5 flex items-center justify-between px-4 md:px-8 bg-[#0a0a0a] sticky top-0 z-40">

    <!-- LEFT -->
    <div class="flex items-center gap-3 md:gap-6">

      <!-- MOBILE MENU BUTTON -->
      <button
        class="md:hidden p-2 text-gray-400 hover:text-purple-200 transition-colors"
        @click="$emit('toggleSidebar')"
      >
        <MenuIcon class="w-5 h-5" />
      </button>

      <!-- SEARCH -->
      <div class="relative group w-full md:w-auto">
        <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-purple-200 transition-colors" />

        <input
          type="text"
          placeholder="Search drivers or orders..."
          class="bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-200/50 w-full md:w-72 transition-all placeholder:text-gray-600"
        />
      </div>

      <!-- STATUS (hidden on small screens) -->
      <div class="hidden lg:flex items-center gap-2 px-3 py-1 bg-purple-200/10 rounded-full border border-purple-200/20">
        <span class="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
        <span class="text-[11px] font-bold text-purple-200 uppercase tracking-wide">System Online</span>
      </div>

    </div>

    <!-- RIGHT -->
    <div class="flex items-center gap-3 md:gap-6">

      <!-- NOTIFICATION -->
      <button class="relative p-2 text-gray-400 hover:text-purple-200 transition-colors">
        <BellIcon class="w-5 h-5" />
        <span class="absolute top-2 right-2 w-2 h-2 bg-purple-200 rounded-full border-2 border-[#0a0a0a]"></span>
      </button>

      <!-- USER -->
      <div class="flex items-center gap-2 md:gap-3 cursor-pointer">

        <div class="text-right hidden md:block">
          <p class="text-xs text-white font-bold leading-none">Mmesoma Favour</p>
          <p class="text-[10px] text-purple-200/60 font-medium mt-1">Administrator</p>
        </div>

        <div class="w-9 h-9 rounded-xl bg-purple-200 p-0.5">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Favour"
            class="w-full h-full rounded-[10px] bg-[#0a0a0a]"
            alt="Profile"
          />
        </div>

      </div>

    </div>
  </header>
</template>

<script setup lang="ts">
import { Search as SearchIcon, Bell as BellIcon, Menu as MenuIcon } from 'lucide-vue-next';

defineEmits(['toggleSidebar']);
</script>
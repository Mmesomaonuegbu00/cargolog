<script setup lang="ts">
import { ref, watch } from 'vue';
import { Search as SearchIcon } from 'lucide-vue-next';

const searchQuery = ref('');
const statusFilter = ref('All');

const emit = defineEmits(['update-filters']);

watch([searchQuery, statusFilter], () => {
  emit('update-filters', {
    search: searchQuery.value,
    status: statusFilter.value
  });
});
</script>

<template>
  <div class="flex flex-row lg:flex-col gap-3 lg:gap-8 font-sans w-full lg:max-w-xs items-center lg:items-stretch">

    <div class="flex flex-col gap-2 flex-1 lg:flex-none">
      <label class="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-black hidden lg:block">search units</label>
      <div class="relative group">
        <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 group-focus-within:text-purple-200 transition-colors" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="id or driver name..."
          class="w-full bg-white/5 border border-white/10 rounded-xl px-9 py-2 text-xs focus:border-purple-200/50 outline-none transition-all text-white placeholder:text-gray-700"
        />
      </div>
    </div>

    <div class="flex flex-row lg:flex-col gap-2 items-center lg:items-stretch">
      <label class="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-black hidden lg:block">status filter</label>
      <div class="flex flex-row lg:flex-col gap-2">
        <button
          v-for="status in ['All', 'On Route', 'Waiting', 'Inactive']"
          :key="status"
          @click="statusFilter = status"
          :class="[
            'px-3 py-2 rounded-xl text-[10px] font-bold lowercase tracking-wide transition-all border duration-300',
            statusFilter === status
              ? 'bg-purple-200/10 border-purple-200 text-purple-200 shadow-[0_0_15px_rgba(233,213,255,0.05)]'
              : 'bg-transparent border-white/5 text-gray-500 hover:bg-white/5 hover:text-gray-300'
          ]"
        >
          {{ status.toLowerCase() }}
        </button>
      </div>
    </div>

  </div>
</template>
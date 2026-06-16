<script setup lang="ts">
import { ref, computed } from 'vue';
import { useLogisticsStore } from '../stores/logistics';
import VehicleCard from '../components/tracking/VehicleCard.vue';
import FilterBar from '../components/tracking/FilterBar.vue';
import VehicleDetail from '../components/tracking/VehicleDetail.vue';

const store = useLogisticsStore();
const activeFilters = ref({ search: '', status: 'All' });

const handleFilterUpdate = (filters: { search: string; status: string }) => {
  activeFilters.value = filters;
};

const filteredVehicles = computed(() => {
  return store.vehicles.filter(v => {
    const matchesSearch =
      v.id.toLowerCase().includes(activeFilters.value.search.toLowerCase()) ||
      v.driver.toLowerCase().includes(activeFilters.value.search.toLowerCase());
    const matchesStatus =
      activeFilters.value.status === 'All' || v.status === activeFilters.value.status;
    return matchesSearch && matchesStatus;
  });
});

const selectedVehicle = computed(
  () => store.vehicles.find(v => v.id === store.selectedId) || filteredVehicles.value[0]
);

const isMobileDetailOpen = ref(false);

const selectVehicle = (id: string) => {
  store.selectedId = id;
  isMobileDetailOpen.value = true;
};

const closeMobileDetail = () => {
  isMobileDetailOpen.value = false;
};
</script>

<template>
  <main class="flex flex-col lg:flex-row text-green-100 overflow-hidden font-sans">

    <aside class="lg:w-72 lg:border-r lg:border-white/10 lg:p-6 lg:bg-white/5 lg:backdrop-blur-xl w-full border-b  border-white/10 px-4 py-3 bg-white/5 backdrop-blur-xl flex-shrink-0">

      <div class="mb-8 block">
        <h2 class="text-xs font-black tracking-[0.2em] text-gray-400 mb-4">
          Truck Status
        </h2>
        <div class="p-4 rounded-xl bg-black/40 border border-white/10">
          <div class="flex items-center justify-between mb-3">
            <span class="text-[10px] font-bold uppercase text-green-600/50">
              Connection Status
            </span>
            <div class="flex gap-0.5 items-end h-3">
              <div v-for="i in 4" :key="i" :class="['w-1 rounded-full transition-all duration-500',
                store.isStreaming ? 'bg-green-400' : 'bg-gray-800',
                store.isStreaming && i === 4 ? 'animate-pulse h-3' : `h-${i + 1}`]"></div>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="relative flex h-3 w-3">
              <span
                :class="['absolute inline-flex h-full w-full rounded-full opacity-75', store.isStreaming ? 'animate-ping bg-green-400' : 'bg-red-500']"></span>
              <span
                :class="['relative inline-flex rounded-full h-3 w-3', store.isStreaming ? 'bg-green-500' : 'bg-red-500']"></span>
            </div>
            <span class="text-sm font-black tracking-tight">
              {{ store.isStreaming ? 'Truck Tracking Active' : 'Tracking Offline' }}
            </span>
          </div>
        </div>
      </div>

      <FilterBar @update-filters="handleFilterUpdate" />

      <div v-if="store.isStreaming" class="mt-8 hidden lg:block">
        <p class="text-[9px] font-black uppercase text-green-800 mb-2 tracking-widest text-center">
          Live Truck Updates
        </p>
        <div class="h-24 overflow-hidden relative text-center">
          <div class="space-y-1 animate-pulse">
            <div v-for="n in 3" :key="n" class="text-[8px] font-mono text-green-900/40 uppercase">
              >> NEW_UPDATE_{{ Math.random().toString(36).substring(7).toUpperCase() }}...OK
            </div>
          </div>
        </div>
      </div>
    </aside>

    <section class="flex-1 overflow-y-auto p-6 bg-transparent">
      <div v-if="filteredVehicles.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <VehicleCard v-for="v in filteredVehicles" :key="v.id" :vehicle="v" :active="v.id === selectedVehicle?.id"
          @click="selectVehicle(v.id)" />
      </div>
      <div v-else class="flex flex-col items-center justify-center h-64 text-green-900">
        <p class="font-mono text-sm uppercase tracking-widest">No Trucks Found</p>
      </div>
    </section>

    <Teleport to="body">
      <Transition name="fade-slide">
        <div v-if="isMobileDetailOpen" class="fixed inset-0 z-50 xl:hidden flex flex-col bg-black/90 backdrop-blur-2xl">
          <div class="p-4 border-b border-white/10 flex justify-between items-center">
            <span class="text-xs font-black tracking-widest text-green-400">VEHICLE SPECS</span>
            <button @click="closeMobileDetail"
              class="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 text-white">
              ✕
            </button>
          </div>
          <div class="flex-1 overflow-y-auto p-6">
            <VehicleDetail :vehicle="selectedVehicle" />
          </div>
        </div>
      </Transition>
    </Teleport>

    <aside class="w-96 border-l border-white/30 p-6 overflow-y-auto hidden xl:block bg-black/50 backdrop-blur-lg">
      <VehicleDetail :vehicle="selectedVehicle" />
    </aside>

  </main>
</template>
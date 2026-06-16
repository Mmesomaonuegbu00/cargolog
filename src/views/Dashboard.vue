<script setup lang="ts">
import { computed } from 'vue';
import { useLogisticsStore } from '../stores/logistics';

import ShipmentBarChart from '../components/charts/ShipmentBarChart.vue';
import SalesLineChart from '../components/charts/SalesLineChart.vue';
import ActivityFeed from '../components/feed/ActivityFeed.vue';
import KpiCard from '../components/feed/KpiCard.vue';
import PieCharts from '../components/charts/PieCharts.vue';

const store = useLogisticsStore();

const totalVehicles = computed(() => store.vehicles.length);
const activeCount = computed(() => store.vehicles.filter(v => v.status === 'On Route').length);
const delayedCount = computed(() => store.vehicles.filter(v => v.status === 'Delayed').length);

const avgFuel = computed(() => {
  if (!store.vehicles.length) return 0;
  const total = store.vehicles.reduce((acc, v) => acc + v.fuelLevel, 0);
  return Math.round(total / store.vehicles.length);
});

const activePercent = computed(() =>
  totalVehicles.value ? Math.round((activeCount.value / totalVehicles.value) * 100) : 0
);
</script>

<template>
  <div class="p-6 min-h-full font-sans">

    <header class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl font-black text-purple-200 tracking-tight">Main Dashboard</h1>
      </div>
      <div class="flex items-center gap-3">
        <div v-if="store.isStreaming" class="flex items-center gap-2 px-3 py-1 bg-purple-200/10 border border-purple-200/20 rounded-full backdrop-blur-md">
          <span class="w-1.5 h-1.5 bg-purple-200 rounded-full animate-pulse"></span>
          <span class="text-[10px] font-bold text-purple-200 uppercase tracking-widest">Live Stream</span>
        </div>
      </div>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
      <KpiCard
        title="Totaltrucks"
        :value="totalVehicles"
        color-class="bg-purple-900/80 backdrop-blur-md"
      />
      <KpiCard
        title="Active Units"
        :value="activeCount"
        :percent="activePercent"
        color-class="bg-purple-200/10 border border-purple-300/20 backdrop-blur-md"
      />
      <KpiCard
        title="System Health"
        value="98.2%"
        percent="OPTIMAL"
        color-class="bg-green-600/80 border border-purple-400/10 backdrop-blur-md"
      />
      <KpiCard
        title="Alerts/Delayed"
        :value="delayedCount"
        :percent="delayedCount > 0 ? 'ACTION_REQ' : 'CLEAR'"
        color-class="bg-red-900/80 text-red-300 border border-red-700 backdrop-blur-md"
      />
      <KpiCard
        title="Avg Fuel"
        :value="`${avgFuel}%`"
        color-class="bg-purple-200/50 border border-purple-300 backdrop-blur-md"
      />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
      <div class="lg:col-span-7 bg-black/10 p-6 rounded-3xl border border-purple-300/30 backdrop-blur-lg">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xs font-bold uppercase tracking-widest text-purple-300">Shipment Status</h3>
          <button class="text-[10px] font-black px-3 py-1 bg-purple-950/40 rounded border border-purple-700 text-purple-300 hover:border-purple-400 hover:text-purple-200 transition-colors font-mono backdrop-blur-md">
            EXPORT_CSV
          </button>
        </div>
        <ShipmentBarChart />
      </div>

      <div class="lg:col-span-5 bg-purple-200/10 p-6 rounded-3xl border border-purple-300 flex flex-col backdrop-blur-lg">
        <h3 class="text-xs font-bold uppercase tracking-widest text-purple-300 mb-6">Live Events</h3>
        <div class="flex-1 overflow-hidden">
          <ActivityFeed />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div class="lg:col-span-8 bg-purple-200/10 p-6 rounded-3xl border border-purple-300 backdrop-blur-lg">
        <h3 class="text-xs font-bold uppercase tracking-widest text-purple-300 mb-6">Frequent locations (Real-time)</h3>
        <SalesLineChart />
      </div>

      <div class="lg:col-span-4 bg-purple-200/10 p-6 rounded-3xl border border-purple-300 backdrop-blur-lg">
        <h3 class="text-xs font-bold uppercase tracking-widest text-purple-300 mb-6">Regional Distribution</h3>
        <div class="h-[300px]">
          <PieCharts/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overflow-y-auto { scrollbar-width: none; }
.overflow-y-auto::-webkit-scrollbar { display: none; }
</style>

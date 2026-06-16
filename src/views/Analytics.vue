<script setup lang="ts">
import { computed } from 'vue';
import { useLogisticsStore } from '../stores/logistics';
import KpiCard from '../components/feed/KpiCard.vue';

const store = useLogisticsStore();

const totalVehicles = computed(() => store.vehicles.length);

const activeCount = computed(() =>
  store.vehicles.filter(v => v.status === 'On Route').length
);

const delayedCount = computed(() =>
  store.vehicles.filter(v => v.status === 'Delayed').length
);

const avgFuel = computed(() => {
  if (!store.vehicles.length) return 0;
  const total = store.vehicles.reduce((acc, v) => acc + v.fuelLevel, 0);
  return Math.round(total / store.vehicles.length);
});

const activePercent = computed(() =>
  totalVehicles.value
    ? Math.round((activeCount.value / totalVehicles.value) * 100)
    : 0
);

const totalRevenue = computed(() => {
  return store.vehicles.reduce((acc, v) => acc + (Number(v.revenue) || 0), 0);
});

const totalCost = computed(() => {
  return Math.round(totalRevenue.value * 0.68);
});

const totalProfit = computed(() => {
  return totalRevenue.value - totalCost.value;
});

const lostProfit = computed(() => {
  return delayedCount.value * 1250;
});

const topDriver = computed(() => {
  if (!store.vehicles.length) return 'N/A';
  const sorted = [...store.vehicles].sort((a, b) => (b.revenue || 0) - (a.revenue || 0));
  return sorted[0]?.driver || 'N/A';
});

const topVehicle = computed(() => {
  if (!store.vehicles.length) return 'N/A';
  const sorted = [...store.vehicles].sort((a, b) => (b.revenue || 0) - (a.revenue || 0));
  return sorted[0]?.id || 'N/A';
});

const waitingCount = computed(() =>
  store.vehicles.filter(v => v.status === 'Waiting').length
);

const avgRevenuePerTruck = computed(() => {
  if (!store.vehicles.length) return 0;
  return Math.round(totalRevenue.value / store.vehicles.length);
});
</script>

<template>
  <div class="min-h-full bg-[#020203] text-white p-6">
    <header class="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
      <div>
        <h1 class="text-2xl font-black tracking-tight text-purple-200">
          Analytics
        </h1>
        <p class="text-xs text-zinc-500 font-bold tracking-[0.25em] mt-3">
          Logistics Intelligence Overview
        </p>
      </div>

      <div v-if="store.isStreaming"
        class="flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-2xl w-fit">
        <span class="w-2 h-2 rounded-full bg-purple-200 animate-pulse shadow-[0_0_10px_#e9d5ff]"></span>
        <span class="text-[10px] uppercase tracking-[0.25em] font-black text-purple-200">
          Live Stream
        </span>
      </div>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
      <KpiCard title="vehicle Revenue" :value="`$${totalRevenue.toLocaleString()}`" percent="+12%"
        color-class="bg-purple-900 border border-white/5" />
      <KpiCard title="Operational Cost" :value="`$${totalCost.toLocaleString()}`" percent="68%"
        color-class="bg-yellow-400/60 border border-white/5" />
      <KpiCard title="Total Profit" :value="`$${totalProfit.toLocaleString()}`" percent="+24%"
        color-class="bg-gradient-to-br from-green-900 to-[#020203] border border-emerald-500/10 text-emerald-400 backdrop-blur-xl" />
      <KpiCard title="Lost Profit" :value="`$${lostProfit.toLocaleString()}`" percent="Delayed Units"
        color-class="bg-gradient-to-br from-red-900 to-[#020203] border border-red-500/10 text-red-400 backdrop-blur-xl" />
      <KpiCard title="Total vehicles" :value="totalVehicles" percent="Connected"
        color-class="bg-black border border-white/5" />
      <KpiCard title="Active Trucks" :value="activeCount" :percent="`${activePercent}% Active`"
        color-class="bg-green-900 border border-white/5" />
      <KpiCard title="Delayed Trucks" :value="delayedCount" percent="Attention Needed"
        color-class="bg-red-900 border border-red-500/10" />
      <KpiCard title="Waiting Trucks" :value="waitingCount" percent="Idle Units"
        color-class="bg-yellow-900 border border-amber-500/10" />
      <KpiCard title="Avg Fuel" :value="`${avgFuel}%`" percent="Fleet Average"
        color-class="border border-white/5 text-purple-700 bg-purple-200" />
      <KpiCard title="Best Driver" :value="topDriver" percent="Top Revenue"
        color-class="border border-white/5 text-purple-200" />
      <KpiCard title="Top Vehicle" :value="topVehicle" percent="Highest Earnings"
        color-class="border  bg-yellow-700 border-white/5" />
      <KpiCard title="Avg Revenue" :value="`$${avgRevenuePerTruck.toLocaleString()}`" percent="Per Vehicle"
        color-class="border bg-green-700 border-white/5 " />
    </div>

    <div class="rounded-[36px] border border-white/5 bg-white/[0.01] backdrop-blur-2xl p-6">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h3 class="text-sm font-black uppercase tracking-[0.3em]">
            Driver Board
          </h3>
          <p class="text-[10px] uppercase tracking-[0.25em] text-zinc-500 mt-2 font-black">
            Real-time Fleet Operators
          </p>
        </div>
        <div class="px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/5">
          <span class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
            {{ store.vehicles.length }} Active Units
          </span>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        <div v-for="vehicle in store.vehicles.slice(0, 6)" :key="vehicle.id"
          class="relative overflow-hidden rounded-[30px] border border-white/15 p-5 transition-all duration-500 hover:border-purple-200/20 hover:-translate-y-1">
          <div class="absolute top-0 right-0 w-32 h-32 bg-purple-200/[0.02] blur-3xl rounded-full"></div>

          <div class="relative flex items-start justify-between mb-6">
            <div class="flex items-center gap-3">
              <div
                class="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center font-black text-lg">
                {{ vehicle.driver.charAt(0) }}
              </div>
              <div>
                <h4 class="font-black text-sm leading-tight">
                  {{ vehicle.driver }}
                </h4>
                <p class="text-[10px] uppercase tracking-[0.25em] text-zinc-500 mt-1">
                  {{ vehicle.id }}
                </p>
              </div>
            </div>
            <span class="text-[9px] px-3 py-1.5 rounded-full uppercase font-black border backdrop-blur-md" :class="[
              vehicle.status === 'On Route'
                ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/10'
                : vehicle.status === 'Delayed'
                  ? 'bg-red-500/5 text-red-400 border-red-500/10'
                  : 'bg-amber-500/5 text-amber-400 border-amber-500/10'
            ]">
              {{ vehicle.status }}
            </span>
          </div>

          <div class="grid grid-cols-2 gap-3 relative">
            <div class="rounded-2xl border border-white/[0.03] bg-white/[0.01] p-4">
              <p class="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-500 mb-2">
                Revenue
              </p>
              <h5 class="text-lg font-black">
                ${{ vehicle.revenue }}
              </h5>
              <div class="mt-3 h-1 rounded-full bg-white/5 overflow-hidden">
                <div class="h-full rounded-full bg-green-700"
                  :style="{ width: `${Math.min(((vehicle.revenue || 0) / 10000) * 100, 100)}%` }"></div>
              </div>
            </div>

            <div class="rounded-2xl border border-white/[0.03] bg-white/[0.01] p-4">
              <p class="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-500 mb-2">
                Fuel
              </p>
              <h5 class="text-lg font-black text-zinc-100">
                {{ vehicle.fuelLevel }}%
              </h5>
              <div class="mt-3 h-1 rounded-full bg-white/5 overflow-hidden">
                <div class="h-full rounded-full" :class="[
                  vehicle.fuelLevel > 60 ? 'bg-purple-500' : vehicle.fuelLevel > 30 ? 'bg-amber-500' : 'bg-red-500'
                ]" :style="{ width: `${vehicle.fuelLevel}%` }"></div>
              </div>
            </div>
          </div>

          <div class="relative mt-5 pt-4 border-t border-white/[0.03] flex items-center justify-between">
            <div>
              <p class="text-[9px] uppercase tracking-[0.2em] text-zinc-600 font-black">
                Last Update
              </p>
              <p class="text-xs text-zinc-400 font-semibold mt-1">
                {{ new Date(vehicle.lastUpdated).toLocaleTimeString() }}
              </p>
            </div>
            <button
              class="px-4 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 text-[10px] uppercase tracking-[0.2em] font-black text-purple-200 transition-all">
              Track
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(233, 213, 255, 0.1);
  border-radius: 20px;
}
</style>
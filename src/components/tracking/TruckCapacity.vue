<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ percent: number }>();

const statusMessage = computed(() => {
  if (props.percent >= 90) return 'Fully Loaded';
  if (props.percent >= 50) return 'Half Full';
  return 'Plenty of Space';
});

const chartOptions = computed(() => ({
  backgroundColor: 'transparent',
  series: [{
    type: 'pie',
    radius: ['82%', '90%'],
    startAngle: 90,
    silent: true,
    label: { show: false },
    data: [
      { value: props.percent, itemStyle: { color: '#e9d5ff' } },
      { value: 100 - props.percent, itemStyle: { color: 'rgba(255, 255, 255, 0.05)' } }
    ]
  }]
}));
</script>

<template>
  <div class="relative w-full h-100 bg-purple-900 rounded-2xl p-8 border border-white/5 group hover:border-purple-200/20 transition-all font-sans">

    <div class="flex justify-between items-start mb-2">
      <div>
        <h3 class="text-white text-[10px] uppercase tracking-[0.2em] font-black">Truck Space Used</h3>
        <p class="text-purple-900 text-lg font-bold mt-1">{{ statusMessage }}</p>
      </div>

      <div class="px-2 py-1 rounded text-[9px] font-bold tracking-widest uppercase bg-white text-purple-900">
        {{ percent > 85 ? 'Alert' : 'Good' }}
      </div>
    </div>

    <div class="relative flex items-center justify-center h-48">
      <VChart class="h-full w-full" :option="chartOptions" autoresize />

      <div class="absolute flex flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-white/40 mb-2">
          <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-5h-7v6h2"/><path d="M13 9h4"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>
        </svg>

        <span class="text-4xl font-black text-white tracking-tighter">{{ percent }}%</span>
        <span class="text-[10px] text-white font-bold uppercase tracking-widest mt-1">Occupied</span>
      </div>
    </div>

    <div class="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
      <span class="text-[10px] text-white font-bold uppercase tracking-widest">Fleet Unit #772</span>

      <div class="flex gap-1">
        <div
          v-for="i in 5"
          :key="i"
          :class="['w-1.5 h-1.5 rounded-full bg-white', (percent / 20) >= i ? 'opacity-100' : 'opacity-20']"
        ></div>
      </div>
    </div>

  </div>
</template>
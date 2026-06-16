<script setup lang="ts">
import { computed } from 'vue';
import type { Vehicle } from '../../types/logistics';
import StatusBadge from '../ui/StatusBadge.vue';
import { Clock, Navigation, CheckCircle2, User } from 'lucide-vue-next';

const props = defineProps<{
  vehicle: Vehicle;
  active?: boolean;
}>();

// Layman-friendly distance logic (mocking a rhyme based on ETA)
const distanceLeft = computed(() => {
  const hours = parseInt(props.vehicle.eta) || 1;
  return hours * 45; // Relatable math: roughly 45 miles per hour left
});


// Determine the journey stops based on vehicle type for variety
const journeyStops = computed(() => {
  return props.vehicle.type === 'truck'
    ? ['Lagos Hub', 'Ibadan Station', 'Benin Terminal']
    : ['Main Warehouse', 'Sorting Center', 'Final Delivery'];
});
</script>
<!-- vechile card -->
<template>
  <div :class="[
    'p-6 rounded-2xl border transition-all duration-500 cursor-pointer group font-sans',
    active
      ? 'bg-[#0f0f0f] border-purple-200 shadow-[0_0_30px_rgba(233,213,255,0.05)]'
      : 'bg-[#0a0a0a] border-white/5 hover:border-white/20'
  ]">
    <div class="flex justify-between items-start mb-6">
      <div>
        <h4 class="text-xl font-black text-white tracking-tighter mb-1 uppercase">
          {{ vehicle.id }}
        </h4>
        <div class="flex items-center gap-3">
          <StatusBadge :status="vehicle.status" />
          <div class="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold uppercase">
            <User class="w-3 h-3" />
            {{ vehicle.driver.split(' ')[0] }}
          </div>
          <div v-if="vehicle.location && typeof vehicle.location === 'string'"
            class="flex items-center gap-1.5 text-[10px] text-purple-400/60 font-bold uppercase">
            <Navigation class="w-3 h-3" />
            {{ vehicle.location }}
          </div>
        </div>
        
      </div>
      <div class="text-right">
        <p class="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Est. Arrival</p>
        <p class="text-sm text-purple-200 font-bold">{{ vehicle.eta }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <div class="bg-white/5 rounded-xl p-4 border border-white/5 space-y-4">
        <div class="flex items-center gap-3">
          <div class="p-2 bg-purple-200/10 rounded-lg">
            <Clock class="w-4 h-4 text-purple-200" />
          </div>
          <div>
            <p class="text-[9px] text-gray-500 font-black uppercase">Time Remaining</p>
            <p class="text-white text-sm font-bold">{{ vehicle.eta }}</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <div class="p-2 bg-purple-200/10 rounded-lg">
            <Navigation class="w-4 h-4 text-purple-200" />
          </div>
          <div>
            <p class="text-[9px] text-gray-500 font-black uppercase">Distance Left</p>
            <p class="text-white text-sm font-bold">{{ distanceLeft }} Miles</p>
          </div>
        </div>
      </div>

      <div class="space-y-3 relative pl-4 border-l border-white/10 ml-2">
        <div v-for="(stop, index) in journeyStops" :key="index" class="relative flex items-center gap-3">
          <div :class="['absolute -left-[21px] w-3 h-3 rounded-full border-2 border-[#0a0a0a]',
            index === 2 ? 'bg-purple-200 shadow-[0_0_8px_#e9d5ff]' : 'bg-gray-700']"></div>
          <span :class="['text-[11px] font-medium', index === 2 ? 'text-white' : 'text-gray-500']">
            {{ stop }}
          </span>
          <CheckCircle2 v-if="index < 2" class="w-3 h-3 text-emerald-500" />
        </div>
      </div>
    </div>

    <div class="relative py-8 flex justify-center overflow-hidden">
      <svg v-if="vehicle.type === 'truck'" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg"
        class="w-full max-w-[200px] text-white/10 group-hover:text-purple-200/20 transition-colors duration-700">
        <rect x="10" y="5" width="75" height="25" rx="2" fill="currentColor" />
        <path d="M86 10H105C107.209 10 109 11.7909 109 14V30H86V10Z" fill="currentColor" opacity="0.8" />
        <circle cx="25" cy="35" r="4" fill="#1a1a1a" stroke="currentColor" stroke-width="1.5" />
        <circle cx="65" cy="35" r="4" fill="#1a1a1a" stroke="currentColor" stroke-width="1.5" />
        <circle cx="98" cy="35" r="4" fill="#1a1a1a" stroke="currentColor" stroke-width="1.5" />
      </svg>
      <svg v-else viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg"
        class="w-full max-w-[160px] text-white/10 group-hover:text-purple-200/20 transition-colors duration-700">
        <path
          d="M10 12C10 9.79086 11.7909 8 14 8H80L105 15V30C105 32.2091 103.209 34 101 34H14C11.7909 34 10 32.2091 10 30V12Z"
          fill="currentColor" />
        <circle cx="25" cy="34" r="5" fill="#1a1a1a" stroke="currentColor" stroke-width="1.5" />
        <circle cx="85" cy="34" r="5" fill="#1a1a1a" stroke="currentColor" stroke-width="1.5" />
      </svg>
    </div>

    <div class="space-y-2">
      <div class="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-600">
        <span>Cargo Load</span>
        <span class="text-purple-200 font-bold">{{ vehicle.capacity }}% Occupied</span>
      </div>
      <div class="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <div class="bg-purple-200 h-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(233,213,255,0.3)]"
          :style="{ width: `${vehicle.capacity}%` }"></div>
      </div>
    </div>
  </div>
</template>
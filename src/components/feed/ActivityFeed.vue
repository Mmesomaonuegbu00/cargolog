<script setup lang="ts">
import { computed } from 'vue';
import { useLogisticsStore } from '../../stores/logistics';

const store = useLogisticsStore();
const events = computed(() => store.logs);

const getStatusColor = (type: string) => {
  if (type === 'critical') return 'text-red-400 bg-red-400/10 border-red-400/20';
  if (type === 'warning') return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
  return 'text-purple-200 bg-purple-200/10 border-purple-200/20';
};

const formatTime = (timestamp: string) => {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
};
</script>

<template>
  <div class="h-[500px] overflow-y-scroll flex flex-col gap-3">

    <transition-group name="list" tag="div" class="flex flex-col gap-3">
      <div
        v-for="event in events"
        :key="event.id"
        class="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition-all group relative overflow-hidden shrink-0"
      >

        <div class="flex justify-between items-start mb-2">
          <span
            :class="[
              'text-[9px] font-black uppercase px-2 py-0.5 rounded-md border',
              getStatusColor(event.type)
            ]"
          >
            {{ event.type }}
          </span>
          <p class="text-[9px] font-mono text-white/20">
            {{ formatTime(event.timestamp) }}
          </p>
        </div>

        <p class="text-xs font-bold text-white/80 leading-relaxed tracking-tight italic">
          {{ event.message }}
        </p>

        <div class="mt-3 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-opacity">
          <p class="text-[8px] font-black text-purple-200 uppercase tracking-widest">
            Truck ID: {{ event.vehicleId }}
          </p>
          <span class="text-[8px] font-black text-white bg-white/10 px-2 py-1 rounded cursor-pointer">
            VIEW DETAILS →
          </span>
        </div>

      </div>
    </transition-group>

    <div v-if="events.length === 0" class="text-center py-20">
      <div class="w-10 h-10 border-2 border-dashed border-purple-500/20 border-t-purple-500 animate-spin rounded-full mx-auto mb-4"></div>
      <p class="text-[10px] font-black text-purple-200/20 uppercase tracking-widest italic">
        Listening for live truck updates...
      </p>
    </div>

  </div>
</template>
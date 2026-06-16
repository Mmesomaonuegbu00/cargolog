<script setup lang="ts">
// Defined props for flexible metric display
defineProps<{
  label: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
}>();
</script>

<template>
  <div class="bg-[#0a0a0a] border border-white/5 p-5 rounded-2xl hover:border-purple-200/30 transition-all group">
    <p class="text-gray-500 text-xs font-bold uppercase tracking-wider">{{ label }}</p>
    <div class="flex items-end justify-between mt-3">
      <h3 class="text-2xl font-bold text-white tracking-tight">{{ value }}</h3>
      <p v-if="trend" 
         :class="['text-[10px] font-bold px-2 py-0.5 rounded-full', 
                  trendUp ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400']">
        {{ trendUp ? '▲' : '▼' }} {{ trend }}
      </p>
    </div>
    <div class="w-0 group-hover:w-full h-0.5 bg-purple-200 transition-all duration-500 mt-4 opacity-20"></div>
  </div>
</template>
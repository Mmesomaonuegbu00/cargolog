<script setup lang="ts">
defineProps<{
  title: string;
  value: string | number;
  percent?: string | number;
  colorClass: string;
}>();
</script>

<template>
  <div :class="['p-5 rounded-2xl flex flex-col justify-between min-h-[110px]', colorClass]">
    <span class="text-[9px] font-bold uppercase opacity-70 tracking-widest font-mono">{{ title }}</span>

    <div class="flex flex-col lg:flex-row lg:items-end justify-between mt-2">
      <span class="text-2xl font-black tracking-tight">{{ value }}</span>
      <span v-if="percent !== undefined" class="text-[9px] font-bold mb-1 opacity-80 font-mono">
        {{ typeof percent === 'number' ? `${percent}% of total` : percent }}
      </span>
    </div>
  </div>
</template>
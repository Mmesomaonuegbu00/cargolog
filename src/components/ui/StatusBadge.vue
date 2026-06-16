<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  status: 'On Route' | 'Waiting' | 'Inactive' | 'Delayed' | 'Delivered' | string;
}>();

const config = computed(() => {
  const status = props.status.toLowerCase();
  
  // Rhyming logic to match server-side faker strings
  if (status.includes('route')) 
    return { label: 'Moving', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' };
  if (status.includes('wait')) 
    return { label: 'Paused', color: 'text-amber-400 bg-amber-400/10 border-amber-400/20' };
  if (status.includes('delay')) 
    return { label: 'Late', color: 'text-red-400 bg-red-400/10 border-red-400/20' };
  if (status.includes('deliver')) 
    return { label: 'Finished', color: 'text-blue-400 bg-blue-400/10 border-blue-400/20' };
    
  return { label: 'Off Duty', color: 'text-purple-200 bg-purple-200/10 border-purple-200/20' };
});
</script>

<template>
  <span 
    :class="[
      'px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all duration-300',
      config.color
    ]"
  >
    {{ config.label }}
  </span>
</template>
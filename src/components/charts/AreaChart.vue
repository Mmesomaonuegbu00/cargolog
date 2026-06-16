<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  data: number[];
  title?: string;
}>();

const chartOptions = computed(() => ({
  backgroundColor: 'transparent',
  grid: { top: 10, right: 0, bottom: 0, left: 0 },
  xAxis: { type: 'category', show: false },
  yAxis: { type: 'value', show: false },
  series: [{
    data: props.data,
    type: 'line',
    smooth: true,
    symbol: 'none',
    lineStyle: { width: 0 },
    areaStyle: {
      opacity: 0.8,
      color: {
        type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [{ offset: 0, color: '#3b82f6' }, { offset: 1, color: '#1d4ed800' }]
      }
    }
  }]
}));
</script>

<template>
  <div class="w-full h-full">
    <VChart :option="chartOptions" autoresize />
  </div>
</template>
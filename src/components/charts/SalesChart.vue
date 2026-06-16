<script setup lang="ts">
import { computed } from 'vue';
import { useLogisticsStore } from '../../stores/logistics';

const store = useLogisticsStore();

const chartOptions = computed(() => ({
  tooltip: { trigger: 'axis' },
  grid: { top: 20, right: 10, bottom: 20, left: 40 },
  xAxis: {
    type: 'category',
    data: store.metrics.timestamps,
    axisLine: { show: false }
  },
  yAxis: { type: 'value', splitLine: { lineStyle: { color: '#f1f5f9' } } },
  series: [{
    data: store.metrics.utilization,
    type: 'line',
    smooth: true,
    showSymbol: false,
    lineStyle: { width: 3, color: '#1e3a8a' },
    areaStyle: {
      color: {
        type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [{ offset: 0, color: '#1e3a8a22' }, { offset: 1, color: '#1e3a8a00' }]
      }
    }
  }]
}));
</script>

<template>
  <div class="h-[300px] w-full">
    <VChart :option="chartOptions" autoresize />
  </div>
</template>
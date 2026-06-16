<script setup lang="ts">
import { computed } from 'vue';
import { useLogisticsStore } from '../../stores/logistics';
import { use } from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { TooltipComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from 'vue-echarts';

use([BarChart, TooltipComponent, GridComponent, CanvasRenderer]);

const store = useLogisticsStore();

const locationData = computed(() => {
  const counts: Record<string, number> = {};
  store.vehicles.forEach(v => {
    const loc = typeof v.location === 'string'
      ? v.location
      : v.location
        ? `${(v.location as { lat: number; lng: number }).lat.toFixed(2)}, ${(v.location as { lat: number; lng: number }).lng.toFixed(2)}`
        : 'Unknown';
    counts[loc] = (counts[loc] || 0) + 1;
  });
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return {
    locations: sorted.map(([loc]) => loc),
    values: sorted.map(([, count]) => count)
  };
});

const chartOptions = computed(() => ({
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(26, 5, 13, 0.9)',
    borderColor: 'rgba(233, 213, 255, 0.2)',
    textStyle: { color: '#fff', fontSize: 12 },
    borderWidth: 1,
    formatter: (params: any) => {
      const d = params[0];
      return `<div style="padding:4px 8px">
                <p style="color:#a78bfa;font-size:10px;font-weight:900;text-transform:uppercase;margin-bottom:4px">${d.name}</p>
                <p style="color:#fff;font-weight:bold">${d.value} truck${d.value > 1 ? 's' : ''}</p>
              </div>`;
    }
  },
  grid: { top: '5%', left: '3%', right: '3%', bottom: '5%', containLabel: true },
 xAxis: {
    type: 'value',
    minInterval: 1,
    splitLine: { lineStyle: { color: 'rgba(233, 213, 255, 0.05)' } },
    axisLine: { show: false },
    axisLabel: { color: '#6b21a8', fontSize: 10 }
  },
  yAxis: {
    type: 'category',
    data: locationData.value.locations,
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: '#a78bfa', fontSize: 9, fontWeight: 'bold' }
  },
  series: [{
    type: 'bar',
    data: locationData.value.values,
    barMaxWidth: 40,
    itemStyle: {
      borderRadius: [6, 6, 0, 0],
      color: {
        type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [
          { offset: 0, color: '#e9d5ff' },
          { offset: 1, color: '#7e22ce' }
        ]
      }
    },
    emphasis: {
      itemStyle: { color: '#f3e8ff' }
    }
  }]
}));
</script>

<template>
  <div class="w-full h-[320px]">
    <VChart :option="chartOptions" autoresize />
  </div>
</template>
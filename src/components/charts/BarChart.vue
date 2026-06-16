<script setup lang="ts">
import { computed } from 'vue';
import { useLogisticsStore } from '../../stores/logistics';

const store = useLogisticsStore();

const chartOptions = computed(() => {
  // Logic: Group vehicles by status and calculate average capacity for each
  const statuses = ['On Route', 'Waiting', 'Inactive'];
  const data = statuses.map(status => {
    const group = store.vehicles.filter(v => v.status === status);
    if (group.length === 0) return 0;
    const avg = group.reduce((acc, v) => acc + v.capacity, 0) / group.length;
    return Math.round(avg);
  });

  return {
    backgroundColor: 'transparent',
    tooltip: { 
      trigger: 'axis',
      backgroundColor: '#111',
      borderColor: '#333',
      textStyle: { color: '#fff' }
    },
    grid: { top: 20, right: 10, bottom: 40, left: 40 },
    xAxis: {
      type: 'category',
      data: statuses,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#6b7280', fontWeight: 'bold' }
    },
    yAxis: {
      type: 'value',
      max: 100,
      splitLine: { lineStyle: { color: '#1f2937', type: 'dashed' } },
      axisLabel: { color: '#6b7280' }
    },
    series: [{
      data: data,
      type: 'bar',
      barWidth: '40%',
      itemStyle: {
        // Dynamic coloring: Green if high utilization, Blue if standard
        color: (params: any) => params.value > 80 ? '#10b981' : '#3b82f6',
        borderRadius: [6, 6, 0, 0]
      },
      emphasis: { 
        itemStyle: { color: '#60a5fa' } 
      }
    }]
  };
});
</script>

<template>
  <div class="h-full w-full min-h-[300px]">
    <VChart :option="chartOptions" autoresize />
  </div>
</template>
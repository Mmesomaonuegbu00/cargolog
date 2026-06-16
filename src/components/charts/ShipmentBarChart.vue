<script setup lang="ts">
import { computed } from 'vue';


const chartOptions = computed(() => ({
  backgroundColor: 'transparent',
  grid: { 
    top: '10%', 
    right: '2%', 
    bottom: '15%', 
    left: '5%',
    containLabel: true 
  },
  // Matches the circular legend in your screenshot
  legend: { 
    bottom: 0, 
    icon: 'circle', 
    itemGap: 25,
    textStyle: { color: '#64748b', fontSize: 12 }
  },
  tooltip: { 
    trigger: 'axis',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 0,
    textStyle: { color: '#1e293b' },
    extraCssText: 'shadow-sm rounded-lg border border-slate-100'
  },
  xAxis: {
    type: 'category',
    data: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: '#94a3b8', margin: 15 }
  },
  yAxis: { 
    type: 'value', 
    splitLine: { 
      lineStyle: { color: '#f1f5f9', type: 'solid' } 
    },
    axisLabel: { color: '#94a3b8' }
  },
  series: [
    {
      name: 'Returned',
      type: 'bar',
      stack: 'total',
      barWidth: 22,
      itemStyle: { 
        color: '#f87171', // Light coral/red
        // Only round the very top of the stack (the last item)
        borderRadius: [4, 4, 0, 0] 
      },
      // You can replace these with store.monthlyStats.returned if available
      data: [35, 45, 30, 48, 32, 50, 42]
    },
    {
      name: 'Delivered',
      type: 'bar',
      stack: 'total',
      itemStyle: { color: '#86efac' }, // Soft green
      data: [110, 125, 95, 130, 85, 120, 105]
    },
    {
      name: 'On Delivery',
      type: 'bar',
      stack: 'total',
      itemStyle: { color: '#bae6fd' }, // Soft blue
      data: [70, 85, 60, 90, 75, 80, 70]
    }
  ]
}));
</script>

<template>
  <div class="h-[320px] w-full">
    <VChart :option="chartOptions" autoresize />
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useLogisticsStore } from '../../stores/logistics';
import { use } from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from 'vue-echarts';

use([PieChart, TooltipComponent, CanvasRenderer]);

const store = useLogisticsStore();

const chartOptions = computed(() => {
  const statuses = [
    { name: 'Moving', key: 'On Route', color: '#e9d5ff' },
    { name: 'Resting', key: 'Waiting', color: '#a855f7' },
    { name: 'Inactive', key: 'Inactive', color: '#3b0764' }
  ];

  const chartData = statuses.map(status => {
    const count = store.vehicles.filter(v => v.status === status.key).length;
    return {
      name: status.name,
      value: count,
      itemStyle: { color: status.color }
    };
  });

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(26, 5, 13, 0.9)',
      borderColor: 'rgba(233, 213, 255, 0.2)',
      textStyle: { color: '#fff', fontSize: 12 }
    },
    series: [
      {
        name: 'Fleet Status',
        type: 'pie',
        radius: ['50%', '80%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: 'transparent',
          borderWidth: 2
        },
        label: { show: false, position: 'center' },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold',
            color: '#fff',
            formatter: '{b}\n{c} Trucks'
          }
        },
        labelLine: { show: false },
        data: chartData
      }
    ]
  };
});
</script>

<template>
  <div class="h-full w-full min-h-[300px] flex flex-col">
    <VChart :option="chartOptions" autoresize />
    <div class="flex justify-center gap-6 mt-4">
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-[#e9d5ff]"></span>
        <span class="text-[10px] font-black uppercase text-purple-200/50 tracking-widest">On Path</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-[#a855f7]"></span>
        <span class="text-[10px] font-black uppercase text-purple-200/50 tracking-widest">Idle</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-[#3b0764]"></span>
        <span class="text-[10px] font-black uppercase text-purple-200/50 tracking-widest">Offline</span>
      </div>
    </div>
  </div>
</template>
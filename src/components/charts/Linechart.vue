<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  history: {
    value: number;
    location: string;
  }[];
}>();

const option = computed(() => ({
  tooltip: {
    trigger: 'axis'
  },

  grid: {
    left: 0,
    right: 0,
    top: 10,
    bottom: 0,
    containLabel: true
  },

  xAxis: {
    type: 'category',
    data: props.history.map(i => i.location),

    axisLine: {
      lineStyle: {
        color: 'rgba(255,255,255,0.1)'
      }
    },

    axisLabel: {
      color: 'rgba(255,255,255,0.4)',
      fontSize: 10
    }
  },

  yAxis: {
    type: 'value',

    axisLine: {
      show: false
    },

    splitLine: {
      lineStyle: {
        color: 'rgba(255,255,255,0.05)'
      }
    },

    axisLabel: {
      color: 'rgba(255,255,255,0.4)',
      fontSize: 10
    }
  },

  series: [
    {
      data: props.history.map(i => i.value),
      type: 'line',
      smooth: true,

      areaStyle: {},

      lineStyle: {
        width: 4,
        color: '#e9d5ff'
      },

      showSymbol: false
    }
  ]
}));
</script>

<template>
  <VChart
    class="w-full h-full"
    :option="option"
    autoresize
  />
</template>
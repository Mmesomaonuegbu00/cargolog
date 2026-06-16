import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';
import './style.css';

import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent
} from 'echarts/components';

import { streamService } from './services/stream';
import { useLogisticsStore } from './stores/logistics';
import { generateInitialFleet } from './mocks/deliveryGenerators';


use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent
]);

const app = createApp(App);

const pinia = createPinia();

app.component('VChart', VChart);

app.use(pinia);
app.use(router);

app.mount('#app');

/* ---------------- FIX STARTS HERE ---------------- */

const store = useLogisticsStore(pinia);

// 1. Seed data immediately (NO route dependency anymore)
if (store.vehicles.length === 0) {
  store.setVehicles(generateInitialFleet(12));
}

// 2. Start stream AFTER Vue + Pinia are fully mounted
requestAnimationFrame(() => {
  streamService.init();
});
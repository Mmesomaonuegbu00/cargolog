import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Tracking from '../views/Tracking.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Dashboard', component: Dashboard },
    { path: '/tracking', name: 'Tracking', component: Tracking },
    { path: '/analytics', name: 'Analytics', component: () => import('../views/Analytics.vue') },
    { path: '/partners', name: 'Partners', component: () => import('../views/Partners.vue') },
    { path: '/requests', name: 'Requests', component: () => import('../views/Request.vue') },
    { path: '/history', name: 'History', component: () => import('../views/History.vue') },
  ]
});

export default router;
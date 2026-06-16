<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useLogisticsStore } from '../stores/logistics';
import { faker } from '@faker-js/faker';

const store = useLogisticsStore();
const requests = computed(() => store.cargoRequests);

const generateMockRequest = () => ({
  id: `REQ-${faker.string.numeric(6)}`,
  origin: faker.location.city(),
  destination: faker.location.city(),
  weight: `${faker.number.int({ min: 500, max: 5000 })}kg`,
  priority: faker.helpers.arrayElement(['Urgent', 'Standard', 'Low']),
  timestamp: new Date().toISOString()
});

onMounted(() => {
  if (store.cargoRequests.length === 0) {
    const initialData = Array.from({ length: 10 }, generateMockRequest);
    store.setRequests(initialData);
  }
});

const handleAssign = (id: string) => {
  store.removeRequest(id);
};
</script>

<template>
  <div class="p-8 bg-black h-full overflow-hidden flex flex-col">
    <header class="mb-8 flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-purple-200 tracking-tighter ">Cargo Requests</h1>
        <p class="text-gray-400 font-medium">Pending freight awaiting dispatch terminal.</p>
      </div>

      <div class="flex gap-3">
        <span class="flex items-center gap-2 text-[10px] font-bold text-gray-300 bg-white/5 px-3 py-1 rounded-full border border-gray-700">
          <span :class="['w-1.5 h-1.5 rounded-full bg-gray-400', store.isStreaming ? 'animate-pulse' : '']"></span>
          {{ store.isStreaming ? 'LIVE_FEED' : 'SIMULATED' }} // {{ requests.length }} UNITS
        </span>
      </div>
    </header>

    <div class="flex-1 border border-gray-800 rounded-2xl bg-[#050505] overflow-hidden flex flex-col">
      <div class="overflow-y-auto custom-scrollbar">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-gray-800 bg-gray-900/30 sticky top-0 z-10 backdrop-blur-md">
              <th class="p-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">ID</th>
              <th class="p-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Route Telemetry</th>
              <th class="p-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Payload</th>
              <th class="p-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Priority</th>
              <th class="p-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Dispatch</th>
            </tr>
          </thead>

          <tbody class="text-sm font-mono">
            <transition-group name="list">
              <tr
                v-for="req in requests"
                :key="req.id"
                class="border-b border-gray-800/50 hover:bg-gray-900/30 transition-all"
              >
                <td class="p-4 text-gray-300 font-bold">{{ req.id }}</td>

                <td class="p-4 text-gray-400">
                  <span class="text-gray-500">{{ req.origin }}</span>
                  <span class="mx-2 text-gray-600">→</span>
                  <span class="text-gray-300">{{ req.destination }}</span>
                </td>

                <td class="p-4 text-gray-400">{{ req.weight }}</td>

                <td class="p-4">
                  <span
                    :class="[
                      'text-[9px] px-2 py-0.5 rounded-sm font-black border',
                      req.priority === 'Urgent'
                        ? 'bg-red-500/10 text-red-400 border-red-500/20'
                        : req.priority === 'Standard'
                        ? 'bg-gray-800 text-gray-300 border-gray-700'
                        : 'bg-gray-900 text-gray-500 border-gray-800'
                    ]"
                  >
                    {{ req.priority }}
                  </span>
                </td>

                <td class="p-4 text-right">
                  <button
                    @click="handleAssign(req.id)"
                    class="bg-purple-900 text-white hover:bg-gray-300 px-3 py-1 rounded-sm text-[10px] font-black transition-all"
                  >
                    DEPLOY
                  </button>
                </td>
              </tr>
            </transition-group>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.list-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.list-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #1f2937;
  border-radius: 10px;
}
</style>
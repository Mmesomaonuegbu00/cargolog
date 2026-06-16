<script setup lang="ts">
import { ref } from 'vue';
import { faker } from '@faker-js/faker';

const historyEntries = ref(Array.from({ length: 12 }, () => ({
  id: faker.string.uuid(),
  event: faker.helpers.arrayElement([
    'GATE_EXIT',
    'DELIVERY_CONFIRMED',
    'FUEL_REFRESH',
    'ROUTE_DIVERTED',
    'MAINTENANCE_LOG'
  ]),
  vehicleId: `SD-${faker.string.numeric(5)}`,
  location: faker.location.city(),
  time: faker.date.recent().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  date: 'MAY 10, 2026',
  status: faker.helpers.arrayElement(['completed', 'delayed', 'Onroute'])
})));
</script>

<template>
  <div class="min-h-full bg-black text-white p-6 md:p-10 overflow-y-auto">

    <header class="mb-10">
      <h1 class="text-2xl font-black text-purple-200 tracking-tight">
        History
      </h1>
      <p class="text-xs text-purple-200/40 font-semibold tracking-widest mt-2 uppercase">
        history event log
      </p>
    </header>

    <div class="relative lg:w-600 mx-auto">

      <div class="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-purple-200/10"></div>

      <div
        v-for="(entry) in historyEntries"
        :key="entry.id"
        class="relative mb-8 flex md:justify-between items-start"
      >

        <div class="w-28 text-right pr-4 hidden md:block">
          <p class="text-[10px] text-white/40 font-mono">{{ entry.time }}</p>
          <p class="text-[9px] text-purple-200/30">{{ entry.date }}</p>
        </div>

        <div
          class="absolute left-3 md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full border-2 border-black z-10"
          :class="[
            entry.status === 'completed'
              ? 'bg-purple-200'
              : entry.status === 'delayed'
              ? 'bg-red-400'
              : 'bg-white/40'
          ]"
        ></div>

        <div
          class="ml-10 md:ml-0 md:w-[48%] bg-white/5 border border-purple-200/10 rounded-2xl p-5 backdrop-blur-xl hover:border-purple-200/30 transition-all"
        >

          <div class="flex justify-between items-start">
            <div>
              <p class="text-[10px] uppercase tracking-[0.2em] text-purple-200/60 font-black">
                {{ entry.event }}
              </p>

              <h3 class="text-white font-bold mt-1">
                {{ entry.vehicleId }}
              </h3>

              <p class="text-xs text-white/40 mt-1">
                {{ entry.location }}
              </p>
            </div>

            <span
              class="text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-widest border"
              :class="[
                entry.status === 'completed'
                  ? 'bg-purple-200/10 text-purple-200 border-purple-200/20'
                  : entry.status === 'delayed'
                  ? 'bg-red-500/10 text-red-300 border-red-500/20'
                  : 'bg-white/5 text-white/40 border-white/10'
              ]"
            >
              {{ entry.status }}
            </span>
          </div>

        </div>

        <div class="hidden md:block md:w-[48%]"></div>

      </div>

    </div>

  </div>
</template>
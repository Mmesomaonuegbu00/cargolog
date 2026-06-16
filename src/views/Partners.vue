<script setup lang="ts">
import { ref } from 'vue';
import { faker } from '@faker-js/faker';
import type { Partner } from '../types/logistics';

const partners = ref<Partner[]>(
  Array.from({ length: 6 }, () => ({
    id: faker.string.uuid(),
    name: faker.company.name(),
    reliability: faker.number.int({ min: 75, max: 99 }),
    activeFleet: faker.number.int({ min: 10, max: 50 }),
    region: faker.location.city(),
    status: faker.helpers.arrayElement(['Preferred', 'Probation', 'Standard'])
  }))
);
</script>

<template>
  <div class="min-h-full bg-black text-white p-6 md:p-10 overflow-y-auto">

    <header class="mb-10">
      <h1 class="text-2xl font-black text-purple-200 tracking-tight">
        Network Partners
      </h1>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">

      <div
        v-for="partner in partners"
        :key="partner.id"
        class="relative rounded-3xl p-6 bg-black/50 border border-gray-800 backdrop-blur-xl hover:border-gray-600 transition-all duration-300 group overflow-hidden"
      >

        <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/5"></div>

        <div class="relative z-10">

          <div class="flex justify-between items-start mb-6">

            <div>
              <h3 class="text-lg font-black text-white group-hover:text-gray-300 transition-colors">
                {{ partner.name }}
              </h3>

              <p class="text-[10px] font-mono text-gray-500 mt-1 uppercase tracking-widest">
                {{ partner.id.slice(0, 8) }} // {{ partner.region }}
              </p>
            </div>

            <span
              class="text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-[0.2em] border"
              :class="[
                partner.status === 'Preferred'
                  ? 'bg-gray-200/10 text-gray-300 border-gray-600'
                  : partner.status === 'Probation'
                  ? 'bg-gray-800 text-gray-400 border-gray-700'
                  : 'bg-black/40 text-gray-500 border-gray-800'
              ]"
            >
              {{ partner.status }}
            </span>

          </div>

          <div class="mb-6">

            <div class="flex justify-between text-xs mb-2">
              <span class="text-gray-400 uppercase tracking-widest font-bold">
                Reliability
              </span>
              <span class="text-gray-200 font-mono font-bold">
                {{ partner.reliability }}%
              </span>
            </div>

            <div class="h-2 w-full bg-gray-900 rounded-full overflow-hidden border border-gray-800">
              <div
                class="h-full bg-gray-400 transition-all duration-700"
                :style="{ width: `${partner.reliability}%` }"
              ></div>
            </div>

          </div>

          <div class="grid grid-cols-2 gap-4">

            <div class="bg-black/40 border border-gray-800 rounded-2xl p-4">
              <p class="text-[9px] uppercase tracking-widest text-gray-500 font-black">
                Active Fleet
              </p>
              <p class="text-2xl font-black text-white mt-2">
                {{ partner.activeFleet }}
              </p>
            </div>

            <div class="bg-black/40 border border-gray-800 rounded-2xl p-4">
              <p class="text-[9px] uppercase tracking-widest text-gray-500 font-black">
                ETA Delay
              </p>
              <p class="text-2xl font-black text-gray-300 mt-2">
                -{{ faker.number.int({ min: 2, max: 15 }) }}m
              </p>
            </div>

          </div>

          <button
            class="w-full mt-6 py-3 rounded-2xl bg-purple-200/50 text-black text-[10px] font-black uppercase tracking-[0.25em] hover:bg-gray-300 transition-colors"
          >
            View Compliance
          </button>

        </div>

      </div>

    </div>

  </div>
</template>
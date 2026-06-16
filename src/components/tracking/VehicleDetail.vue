<script setup lang="ts">
import TruckCapacity from './TruckCapacity.vue';
import RouteMap from './RouteMap.vue';

defineProps<{
    vehicle: any
}>();
</script>

<template>
    <template v-if="vehicle">
        
        <!-- vehicle detail -->
        <div class="flex justify-between items-center mb-8">
            <div>
                <p class="text-[10px] font-black text-purple-300 uppercase tracking-[0.2em]">
                    Active Truck
                </p>
                <h2 class="text-2xl font-black text-purple-100 italic tracking-tighter">
                    {{ vehicle.id }}
                </h2>
            </div>

            <div
                :class="['px-3 py-1 rounded-lg text-[10px] font-black border transition-all duration-500',
                    vehicle.status === 'On Route' ? 'bg-purple-500/10 text-purple-200 border-purple-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20']">
                {{ vehicle.status.toUpperCase() }}
            </div>
        </div>

        <TruckCapacity :percent="vehicle.capacity" />

        <div class="mt-8 space-y-4">

            <div
                class="p-5 bg-black/40 rounded-2xl border border-purple-900/20 group hover:border-purple-500/30 transition-all">
                <p class="text-[9px] text-purple-300 uppercase font-black tracking-widest mb-4">
                    Driver Info
                </p>

                <div class="flex items-center gap-4">
                    <div
                        class="w-12 h-12 rounded-full bg-purple-500/10 border-2 border-purple-500/20 flex items-center justify-center text-purple-400 font-black italic">
                      {{ vehicle.driver.split(' ').map((n: string) => n[0]).join('').slice(0, 2) }}
                    </div>

                    <div>
                        <p class="font-black text-purple-50 text-base tracking-tight">
                            {{ vehicle.driver }}
                        </p>
                        <p class="text-[10px] text-purple-100 font-mono uppercase italic">
                            ETA: {{ vehicle.eta }}
                        </p>
                    </div>
                </div>
            </div>


            <div class="p-5 bg-black/40 rounded-2xl border border-purple-900/20">
                <p class="text-[9px] text-purple-300 uppercase font-black tracking-widest mb-3">
                    Earnings
                </p>

                <div class="flex justify-between items-center">
                    <p class="text-[10px] text-purple-200 font-mono uppercase">
                        Total Revenue
                    </p>

                    <p class="text-lg font-black text-green-400">
                        ${{ vehicle.revenue?.toLocaleString() || 0 }}
                    </p>
                </div>

                <p class="text-[9px] text-gray-500 mt-2">
                    Estimated delivery earnings for this truck
                </p>
            </div>

            <div class="p-5 bg-black/40 rounded-2xl border border-purple-900/20">
                <div class="flex justify-between items-center mb-3">
                    <p class="text-[9px] text-purple-300 uppercase font-black tracking-widest">
                        Fuel Level
                    </p>

                    <p
                        :class="['text-sm font-black font-mono', vehicle.fuelLevel < 20 ? 'text-red-500' : 'text-purple-200']">
                        {{ Math.round(vehicle.fuelLevel) }}%
                    </p>
                </div>

                <div class="w-full bg-purple-900/20 h-2 rounded-full overflow-hidden">
                    <div class="h-full transition-all duration-1000 ease-in-out rounded-full shadow-[0_0_15px_rgba(236,72,153,0.4)]"
                        :class="vehicle.fuelLevel < 20 ? 'bg-red-500' : 'bg-purple-300'"
                        :style="{ width: `${vehicle.fuelLevel}%` }" />
                </div>
            </div>

            <div class="p-5 bg-black/40 rounded-2xl border border-purple-900/20">
                <p class="text-[9px] text-purple-300 uppercase font-black tracking-widest mb-4">
                    Route Map
                </p>

                <RouteMap :history="vehicle.history || []" :current-location="vehicle.location" />
            </div>

            <div class="pt-4 border-t border-purple-900/10 text-center">
                <p class="text-[8px] text-purple-200 font-mono tracking-[0.3em] uppercase">
                    Last Update: {{ new Date(vehicle.lastUpdated).toLocaleTimeString() }}
                </p>
            </div>

        </div>

    </template>

    <div v-else class="flex flex-col items-center justify-center h-full opacity-20">
        <p class="font-black uppercase tracking-[0.3em] text-purple-200 text-xs">
            Select a truck to view details...
        </p>
    </div>
</template>
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Vehicle, ActivityLog } from '../types/logistics';

export const useLogisticsStore = defineStore('logistics', () => {
    const vehicles = ref<Vehicle[]>([]);
    const logs = ref<ActivityLog[]>([]);
    const cargoRequests = ref<any[]>([]);
    const selectedId = ref<string | null>(null);
    const isStreaming = ref(false);

    const metrics = ref({
        utilization: [] as number[],
        timestamps: [] as string[]
    });

    const activeVehicles = computed(() =>
        vehicles.value.filter(v => v.status === 'On Route')
    );

    const selectedVehicle = computed(() =>
        vehicles.value.find(v => v.id === selectedId.value)
    );

    const setVehicles = (data: Vehicle[]) => {
        vehicles.value = data;
    };

    const setRequests = (data: any[]) => {
        cargoRequests.value = data;
    };

    const addRequest = (req: any) => {
        cargoRequests.value = [req, ...cargoRequests.value].slice(0, 20);
    };

    const removeRequest = (id: string) => {
        cargoRequests.value = cargoRequests.value.filter(r => r.id !== id);
    };

    const addLog = (log: ActivityLog) => {
        logs.value = [log, ...logs.value].slice(0, 50);
    };

    const updateVehicle = (id: string, updates: Partial<Vehicle>) => {
        const index = vehicles.value.findIndex(v => v.id === id);
        if (index === -1) return;

        vehicles.value[index] = {
            ...vehicles.value[index],
            ...updates,
            lastUpdated: new Date().toISOString()
        };

        vehicles.value = [...vehicles.value];

        calculateMetrics();
    };

    const calculateMetrics = () => {
        if (!vehicles.value.length) return;

        const avg =
            vehicles.value.reduce((a, b) => a + (Number(b.revenue) || 0), 0) /
            vehicles.value.length;

        metrics.value.utilization.push(Math.round(avg));
        metrics.value.timestamps.push(
            new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            })
        );

        if (metrics.value.utilization.length > 20) {
            metrics.value.utilization.shift();
            metrics.value.timestamps.shift();
        }
    };

    return {
        vehicles,
        logs,
        cargoRequests,
        selectedId,
        isStreaming,
        metrics,
        activeVehicles,
        selectedVehicle,
        setVehicles,
        setRequests,
        addRequest,
        removeRequest,
        addLog,
        updateVehicle
    };
});
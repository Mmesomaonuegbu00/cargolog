<script setup lang="ts">
import { onMounted, watch, ref } from 'vue';
import type { Coordinate } from '../../types/logistics';

const props = defineProps<{
  history: Coordinate[];
  currentLocation: Coordinate;
}>();

const canvasRef = ref<HTMLCanvasElement | null>(null);

function draw() {
  const c = canvasRef.value;
  if (!c) return;
  const ctx = c.getContext('2d')!;
  const W = c.width, H = c.height;
  ctx.clearRect(0, 0, W, H);

  // Background
  ctx.fillStyle = '#030a03';
  ctx.fillRect(0, 0, W, H);

  // Grid lines
  ctx.strokeStyle = '#0d1f0d';
  ctx.lineWidth = 0.5;
  for (let i = 0; i < W; i += 20) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, H); ctx.stroke();
  }
  for (let j = 0; j < H; j += 20) {
    ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(W, j); ctx.stroke();
  }

  const hist = props.history;
  if (!hist.length) {
    // Just draw current location dot
    ctx.beginPath(); ctx.arc(W / 2, H / 2, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#4ade80'; ctx.fill();
    return;
  }

  const all = [...hist, props.currentLocation];
  const lats = all.map(p => p.lat);
  const lngs = all.map(p => p.lng);
  const minLat = Math.min(...lats), maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs), maxLng = Math.max(...lngs);
  const pad = 20;

  const scX = (lng: number) =>
    (maxLng === minLng ? 0.5 : (lng - minLng) / (maxLng - minLng)) * (W - 2 * pad) + pad;
  const scY = (lat: number) =>
    (maxLat === minLat ? 0.5 : 1 - (lat - minLat) / (maxLat - minLat)) * (H - 2 * pad) + pad;

  // Draw fading trail
  for (let i = 1; i < hist.length; i++) {
    const alpha = 0.1 + 0.9 * (i / hist.length);
    ctx.beginPath();
    ctx.moveTo(scX(hist[i - 1].lng), scY(hist[i - 1].lat));
    ctx.lineTo(scX(hist[i].lng), scY(hist[i].lat));
    ctx.strokeStyle = `rgba(34,197,94,${alpha})`;
    ctx.lineWidth = 1.5;
    ctx.lineJoin = 'round';
    ctx.stroke();
  }

  // Trail dots
  hist.slice(0, -1).forEach(p => {
    ctx.beginPath();
    ctx.arc(scX(p.lng), scY(p.lat), 1.5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(34,197,94,0.25)';
    ctx.fill();
  });

  // Line from last history point to current
  const lastH = hist[hist.length - 1];
  ctx.beginPath();
  ctx.moveTo(scX(lastH.lng), scY(lastH.lat));
  ctx.lineTo(scX(props.currentLocation.lng), scY(props.currentLocation.lat));
  ctx.strokeStyle = 'rgba(74,222,128,0.9)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Current position — outer glow ring
  const cx = scX(props.currentLocation.lng);
  const cy = scY(props.currentLocation.lat);
  ctx.beginPath(); ctx.arc(cx, cy, 10, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(34,197,94,0.1)'; ctx.fill();
  ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(34,197,94,0.2)'; ctx.fill();
  ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2);
  ctx.fillStyle = '#4ade80'; ctx.fill();
}

onMounted(draw);
watch(() => [props.history, props.currentLocation], draw, { deep: true });
</script>

<template>
  <div class="relative rounded-lg overflow-hidden bg-[#030a03]">
    <canvas ref="canvasRef" width="280" height="150" class="block w-full" />
    <span class="absolute bottom-1.5 left-2 text-[9px] text-[#2d5a3d] tracking-widest font-mono">
      LIVE GPS TRACK
    </span>
    <span class="absolute top-1.5 right-2 text-[9px] text-[#22c55e] font-mono animate-pulse">●</span>
  </div>
</template>
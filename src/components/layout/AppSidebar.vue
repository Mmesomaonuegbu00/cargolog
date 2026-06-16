<script setup lang="ts">
import {
  LayoutDashboard,
  MapPin,
  Users,
  FileText,
  BarChart3,
  History,
} from 'lucide-vue-next'

defineProps<{
  isExpanded: boolean
  mobileOpen: boolean
}>()

const emit = defineEmits(['close-mobile'])

const navLinks = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Tracking', path: '/tracking', icon: MapPin },
  { name: 'Partners', path: '/partners', icon: Users },
  { name: 'Requests', path: '/requests', icon: FileText },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'History', path: '/history', icon: History }
]
</script>

<template>
  <div
    v-if="mobileOpen"
    class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
    @click="$emit('close-mobile')"
  />

  <aside
    class="h-screen bg-[#0a0a0a] flex flex-col border-r border-white/5 transition-all duration-300 ease-in-out fixed md:static z-50"
    :class="[
      isExpanded ? 'w-64' : 'w-20',
      mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
    ]"
  >
    <div class="p-5 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-purple-200 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)]">
          <span class="text-black font-black text-xs">CL</span>
        </div>
        <h1 v-if="isExpanded" class="text-white font-bold text-sm tracking-widest uppercase">
          CargoLog
        </h1>
      </div>
      <button class="md:hidden text-white/50 hover:text-white" @click="$emit('close-mobile')">
        ✕
      </button>
    </div>

    <nav class="flex-1 px-3 space-y-2 mt-4">
     <RouterLink
  v-for="link in navLinks"
  :key="link.path"
  :to="link.path"
  @click="$emit('close-mobile')"
  v-slot="{ isActive }"
>
  <div
    class="flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group relative"
    :class="[
      isActive
        ? 'bg-purple-500/10 text-purple-200'
        : 'text-gray-500 hover:bg-white/5 hover:text-white'
    ]"
  >
    <div
      v-if="isActive"
      class="absolute left-0 w-1 h-6 bg-purple-200 rounded-r-full shadow-[0_0_10px_rgb(168,85,247)]"
    />

    <component
      :is="link.icon"
      class="w-5 h-5 transition-transform duration-200"
      :class="isActive ? 'scale-110' : 'group-hover:scale-110'"
    />

    <span
      v-if="isExpanded"
      class="text-sm font-medium tracking-wide"
    >
      {{ link.name }}
    </span>

    <div
      v-if="!isExpanded"
      class="absolute left-16 px-2 py-1 bg-purple-600 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 font-bold uppercase tracking-tighter"
    >
      {{ link.name }}
    </div>
  </div>
</RouterLink>
    </nav>
  </aside>
</template>
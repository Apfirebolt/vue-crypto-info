<template>
  <footer class="w-full bg-primary text-secondary-100 border-t border-slate-800/80 transition-colors">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      
      <!-- Brand & Dynamic Copyright -->
      <div class="flex items-center gap-2 text-xs sm:text-sm text-secondary-200">
        <span>&copy; {{ currentYear }} <strong class="text-white font-semibold">CryptoTrack</strong>. All rights reserved.</span>
      </div>

      <!-- Quick Links & Theme Switcher -->
      <div class="flex items-center gap-4">
        <button
          type="button"
          @click="toggleTheme"
          class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800/90 text-secondary-100 hover:bg-slate-700/80 border border-slate-700 active:scale-95 transition-all shadow-sm"
          :aria-label="isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'"
        >
          <SunIcon v-if="isDark" class="w-4 h-4 text-amber-400" />
          <MoonIcon v-else class="w-4 h-4 text-secondary-300" />
          <span>{{ isDark ? 'Light Mode' : 'Dark Mode' }}</span>
        </button>
      </div>

    </div>
  </footer>
</template>

<script setup>
import { onMounted } from 'vue';
import { SunIcon, MoonIcon } from '@heroicons/vue/20/solid';
import { useTheme } from '../composables/useTheme';

const { isDark, toggleTheme, initTheme } = useTheme();
const currentYear = new Date().getFullYear();

onMounted(() => {
  initTheme();
});
</script>
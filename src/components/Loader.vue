<template>
  <div
    v-if="isLoading"
    role="status"
    aria-live="polite"
    class="flex flex-col justify-center items-center min-h-[50vh] w-full p-6 text-center select-none"
  >
    <!-- Spinner Ring Container -->
    <div class="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
      <!-- Background Track (Theme Secondary Accent Tint) -->
      <div class="absolute inset-0 rounded-full border-4 border-secondary-200/40 dark:border-neutral-800"></div>

      <!-- Animated Leading Spinner (Theme Primary / Secondary-300 Accent) -->
      <div class="absolute inset-0 rounded-full border-4 border-transparent border-t-secondary-300 border-r-primary dark:border-r-secondary-300 animate-spin"></div>

      <!-- Center Ambient Glow -->
      <div class="w-6 h-6 rounded-full bg-secondary-300/20 blur-sm animate-pulse"></div>
    </div>

    <!-- Accompanying Status Message -->
    <p class="mt-4 text-xs sm:text-sm font-semibold tracking-wide text-slate-700 dark:text-secondary-200">
      {{ message }}
    </p>
    <span class="sr-only">Loading content, please wait...</span>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  message: {
    type: String,
    default: "Loading data, please wait...",
  },
});

const isLoading = ref(true);
</script>
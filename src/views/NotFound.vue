<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-16 bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-secondary-100 transition-colors">
    <div class="max-w-md w-full text-center bg-white dark:bg-neutral-900/80 border border-slate-200 dark:border-neutral-800 rounded-3xl p-8 sm:p-10 shadow-xl backdrop-blur-md">
      
      <!-- 404 Illustration from Internet -->
      <div class="relative w-64 h-52 mx-auto mb-6 flex items-center justify-center">
        <img
          src="https://illustrations.popertee.com/illustrations/404-error.svg"
          alt="404 Page Not Found Illustration"
          class="w-full h-full object-contain select-none drop-shadow-md"
          loading="lazy"
        />
      </div>

      <!-- Error Status & Header -->
      <div class="space-y-2 mb-8">
        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-secondary-300/10 text-secondary-300 border border-secondary-300/20">
          Error 404
        </span>
        <h1 class="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight text-slate-900 dark:text-white">
          Page Not Found
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
        <router-link
          to="/"
          class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-secondary-100 font-semibold text-xs sm:text-sm hover:opacity-90 active:scale-95 transition-all shadow-sm"
        >
          <HomeIcon class="w-4 h-4" />
          <span>Back to Home</span>
        </router-link>

        <button
          type="button"
          @click="$router.back()"
          class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-secondary-200 border border-slate-200 dark:border-neutral-700 hover:bg-slate-200 dark:hover:bg-neutral-700 text-xs sm:text-sm font-semibold active:scale-95 transition-all"
        >
          <ArrowLeftIcon class="w-4 h-4" />
          <span>Go Back</span>
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { HomeIcon, ArrowLeftIcon } from "@heroicons/vue/20/solid";
</script>
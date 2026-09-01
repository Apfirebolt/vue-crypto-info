<template>
  <div class="min-h-screen bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-secondary-100 transition-colors">
    <!-- Header Section -->
    <header class="p-6 sm:px-8 border-b border-slate-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md sticky top-0 z-20">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-heading font-extrabold tracking-tight text-slate-900 dark:text-white">
            Crypto Assets
          </h1>
          <p class="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Real-time market overview, rankings, and 24-hour high/low range metrics.
          </p>
        </div>

        <!-- Pagination Controls -->
        <div class="flex items-center gap-2 self-start md:self-auto bg-slate-100 dark:bg-neutral-800/90 p-1.5 rounded-2xl border border-slate-200 dark:border-neutral-700 shadow-inner">
          <button
            type="button"
            @click="previousPage"
            :disabled="currentPage === 1 || isLoading"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-neutral-900 text-slate-800 dark:text-secondary-100 border border-slate-200/80 dark:border-neutral-700 hover:bg-slate-50 dark:hover:bg-neutral-800 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-sm"
          >
            <ChevronLeftIcon class="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>

          <span class="px-3 text-xs font-mono font-bold text-slate-700 dark:text-secondary-200">
            Page {{ currentPage }}
          </span>

          <button
            type="button"
            @click="nextPage"
            :disabled="isLoading"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-primary text-secondary-100 hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-sm"
          >
            <span>Next</span>
            <ChevronRightIcon class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>

    <Loader v-if="isLoading" message="Fetching crypto market data..." />

    <!-- Main Grid Content -->
    <main v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="coin in coins"
          :key="coin.id"
          class="group bg-white dark:bg-neutral-900/90 rounded-3xl border border-slate-200/80 dark:border-neutral-800/80 p-6 shadow-sm hover:shadow-xl hover:border-secondary-300/50 transition-all duration-300 flex flex-col justify-between"
        >
          <!-- Top Row: Icon, Name, Rank Badge -->
          <div>
            <div class="flex items-start justify-between gap-4 mb-5">
              <div class="flex items-center gap-3.5 min-w-0">
                <div class="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-neutral-800 p-2.5 border border-slate-100 dark:border-neutral-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <img
                    class="w-full h-full object-contain"
                    :src="coin.image"
                    :alt="coin.name"
                    loading="lazy"
                  />
                </div>
                <div class="min-w-0">
                  <h2 class="font-heading font-bold text-base text-slate-900 dark:text-white truncate">
                    {{ coin.name }}
                  </h2>
                  <span class="inline-block text-xs font-mono uppercase font-semibold text-slate-400 dark:text-slate-500">
                    {{ coin.symbol }}
                  </span>
                </div>
              </div>

              <span class="px-2.5 py-1 rounded-xl text-[11px] font-mono font-bold bg-primary/10 text-primary dark:bg-secondary-300/20 dark:text-secondary-200 border border-primary/20 dark:border-secondary-300/30 shrink-0">
                #{{ coin.market_cap_rank ?? 'N/A' }}
              </span>
            </div>

            <!-- Current Price Billboard -->
            <div class="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-800/50 border border-slate-100 dark:border-neutral-800 mb-5">
              <span class="block text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
                Current Price
              </span>
              <p class="text-2xl font-mono font-extrabold tracking-tight text-slate-900 dark:text-white mt-0.5">
                {{ formatCurrency(coin.current_price) }}
              </p>
            </div>

            <!-- 24H Price Stats Matrix -->
            <div class="grid grid-cols-2 gap-3 mb-2">
              <div class="p-3 rounded-xl bg-slate-50/80 dark:bg-neutral-800/40 border border-slate-100 dark:border-neutral-800/60">
                <div class="flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  <ArrowTrendingUpIcon class="w-3.5 h-3.5 text-emerald-500" />
                  <span>24h High</span>
                </div>
                <p class="text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                  {{ formatCurrency(coin.high_24h) }}
                </p>
              </div>

              <div class="p-3 rounded-xl bg-slate-50/80 dark:bg-neutral-800/40 border border-slate-100 dark:border-neutral-800/60">
                <div class="flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  <ArrowTrendingDownIcon class="w-3.5 h-3.5 text-danger" />
                  <span>24h Low</span>
                </div>
                <p class="text-sm font-mono font-bold text-danger mt-1">
                  {{ formatCurrency(coin.low_24h) }}
                </p>
              </div>
            </div>
          </div>

          <!-- 24H Range Progress Indicator -->
          <div class="pt-4 mt-2 border-t border-slate-100 dark:border-neutral-800">
            <div class="flex justify-between text-[10px] font-mono text-slate-400 mb-1.5">
              <span>24h Range</span>
              <span>{{ calculateRangePercentage(coin.current_price, coin.low_24h, coin.high_24h) }}%</span>
            </div>
            <div class="w-full h-1.5 rounded-full bg-slate-100 dark:bg-neutral-800 overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-secondary-300 to-primary rounded-full transition-all duration-500"
                :style="{ width: `${calculateRangePercentage(coin.current_price, coin.low_24h, coin.high_24h)}%` }"
              ></div>
            </div>
          </div>
        </article>
      </div>

      <!-- Bottom Pagination -->
      <div class="flex justify-center items-center gap-3 mt-12">
        <button
          type="button"
          @click="previousPage"
          :disabled="currentPage === 1 || isLoading"
          class="px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-neutral-900 text-slate-800 dark:text-secondary-100 border border-slate-200 dark:border-neutral-800 hover:bg-slate-50 dark:hover:bg-neutral-800 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-sm flex items-center gap-1.5"
        >
          <ChevronLeftIcon class="w-4 h-4" />
          <span>Previous Page</span>
        </button>

        <span class="px-4 py-2 text-xs font-mono font-bold bg-slate-100 dark:bg-neutral-800 rounded-xl text-slate-700 dark:text-secondary-200 border border-slate-200/80 dark:border-neutral-700">
          Page {{ currentPage }}
        </span>

        <button
          type="button"
          @click="nextPage"
          :disabled="isLoading"
          class="px-4 py-2 rounded-xl text-xs font-semibold bg-primary text-secondary-100 hover:opacity-90 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-sm flex items-center gap-1.5"
        >
          <span>Next Page</span>
          <ChevronRightIcon class="w-4 h-4" />
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/vue/20/solid";
import { useCoin } from "../store/coin";
import Loader from "../components/Loader.vue";

const coinStore = useCoin();
const currentPage = ref(1);
const coins = computed(() => coinStore.coinList);
const isLoading = computed(() => coinStore.isLoading);

const formatCurrency = (val) => {
  if (val === null || val === undefined || isNaN(val)) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: val < 1 ? 6 : 2,
  }).format(val);
};

const calculateRangePercentage = (current, low, high) => {
  if (!low || !high || high === low) return 50;
  const percentage = ((current - low) / (high - low)) * 100;
  return Math.min(Math.max(Math.round(percentage), 0), 100);
};

const nextPage = () => {
  currentPage.value++;
  coinStore.getCoinsAction(currentPage.value);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    coinStore.getCoinsAction(currentPage.value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

onMounted(async () => {
  await coinStore.getCoinsAction(currentPage.value);
});
</script>
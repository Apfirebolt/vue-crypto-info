<template>
  <div class="min-h-screen bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-secondary-100 transition-colors pb-16">
    <!-- Header Section -->
    <header class="p-6 sm:px-8 border-b border-slate-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md sticky top-0 z-20">
      <div class="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="p-1.5 rounded-lg bg-secondary-300/10 text-secondary-300 dark:bg-secondary-300/20">
              <FireIcon class="w-5 h-5" />
            </span>
            <h1 class="text-2xl font-heading font-extrabold tracking-tight text-slate-900 dark:text-white">
              Trending Market
            </h1>
          </div>
          <p class="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Top searched tokens, trending NFT collections, and growing sectors in the last 24 hours.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Live Activity
          </span>
        </div>
      </div>
    </header>

    <Loader v-if="isLoading" message="Fetching trending market data..." />

    <!-- Main Content -->
    <main v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <!-- 1. Trending Coins Section -->
      <section v-if="trendingList?.coins?.length" class="space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-neutral-800">
          <div class="flex items-center gap-2">
            <h2 class="text-xl font-heading font-bold text-slate-900 dark:text-white">
              Trending Cryptocurrencies
            </h2>
          </div>
          <span class="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-slate-300">
            {{ trendingList.coins.length }} Listed
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <article
            v-for="entry in trendingList.coins"
            :key="entry.item.id"
            class="group bg-white dark:bg-neutral-900/90 rounded-3xl border border-slate-200/80 dark:border-neutral-800/80 p-5 shadow-sm hover:shadow-xl hover:border-secondary-300/40 transition-all flex flex-col justify-between"
          >
            <div>
              <!-- Header with thumbnail and market cap rank -->
              <div class="flex items-start justify-between gap-3 mb-4">
                <div class="w-13 h-13 rounded-2xl bg-slate-50 dark:bg-neutral-800 p-2 border border-slate-100 dark:border-neutral-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <img
                    :src="entry.item.large"
                    :alt="entry.item.name"
                    class="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <span class="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-primary/10 text-primary dark:bg-secondary-300/20 dark:text-secondary-200 border border-primary/20 dark:border-secondary-300/30">
                  #{{ entry.item.market_cap_rank ?? 'N/A' }}
                </span>
              </div>

              <!-- Name and Symbol -->
              <h3 class="font-heading font-bold text-base text-slate-900 dark:text-white truncate">
                {{ entry.item.name }}
              </h3>
              <p class="text-xs font-mono uppercase text-slate-400 font-semibold mb-4">
                {{ entry.item.symbol }}
              </p>
            </div>

            <!-- Price & Stats Module -->
            <div class="space-y-2 pt-3 border-t border-slate-100 dark:border-neutral-800/80">
              <div class="p-3 rounded-2xl bg-slate-50 dark:bg-neutral-800/60 border border-slate-100 dark:border-neutral-800">
                <span class="block text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
                  Valuation (BTC)
                </span>
                <p class="text-xs font-mono font-bold text-slate-800 dark:text-secondary-100 truncate mt-0.5">
                  {{ formatBtcPrice(entry.item.price_btc) }}
                </p>
              </div>

              <div v-if="entry.item.data?.price" class="p-3 rounded-2xl bg-slate-50 dark:bg-neutral-800/60 border border-slate-100 dark:border-neutral-800">
                <span class="block text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
                  USD Price
                </span>
                <p class="text-xs font-mono font-bold text-slate-800 dark:text-secondary-100 truncate mt-0.5">
                  {{ entry.item.data.price }}
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- 2. Trending NFTs Section -->
      <section v-if="trendingList?.nfts?.length" class="space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-neutral-800">
          <div class="flex items-center gap-2">
            <h2 class="text-xl font-heading font-bold text-slate-900 dark:text-white">
              Trending NFT Collections
            </h2>
          </div>
          <span class="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-slate-300">
            {{ trendingList.nfts.length }} Collections
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <article
            v-for="item in trendingList.nfts"
            :key="item.id"
            class="group p-4 rounded-2xl bg-white dark:bg-neutral-900/80 border border-slate-200/80 dark:border-neutral-800/80 shadow-sm hover:border-secondary-300/40 transition-all flex items-center gap-3.5"
          >
            <div class="w-12 h-12 rounded-xl bg-slate-50 dark:bg-neutral-800 p-1.5 border border-slate-100 dark:border-neutral-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform overflow-hidden">
              <img
                :src="item.thumb"
                :alt="item.name"
                class="w-full h-full object-cover rounded-lg"
                loading="lazy"
              />
            </div>
            <div class="min-w-0">
              <h3 class="text-sm font-semibold text-slate-900 dark:text-white truncate">
                {{ item.name }}
              </h3>
              <p class="text-xs font-mono uppercase text-slate-400 truncate">
                {{ item.symbol }}
              </p>
            </div>
          </article>
        </div>
      </section>

      <!-- 3. Trending Categories Section -->
      <section v-if="trendingList?.categories?.length" class="space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-neutral-800">
          <h2 class="text-xl font-heading font-bold text-slate-900 dark:text-white">
            Trending Categories & Ecosystems
          </h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div
            v-for="category in trendingList.categories"
            :key="category.id || category.name"
            class="p-4 rounded-2xl bg-white dark:bg-neutral-900/80 border border-slate-200/80 dark:border-neutral-800/80 shadow-sm hover:border-secondary-300/40 transition-colors flex items-center justify-between gap-3"
          >
            <div class="min-w-0">
              <h3 class="text-xs sm:text-sm font-semibold text-slate-800 dark:text-secondary-100 truncate">
                {{ category.name }}
              </h3>
              <p class="text-[11px] text-slate-400 mt-0.5">
                {{ category.coins_count ?? 0 }} Assets
              </p>
            </div>

            <span class="p-2 rounded-xl bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-secondary-200 shrink-0">
              <SparklesIcon class="w-4 h-4 text-secondary-300" />
            </span>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { FireIcon, SparklesIcon } from "@heroicons/vue/20/solid";
import { useTrending } from "../store/trending";
import Loader from "../components/Loader.vue";

const trendingStore = useTrending();
const trendingList = computed(() => trendingStore.trending);
const isLoading = computed(() => trendingStore.isLoading);

const formatBtcPrice = (price) => {
  if (price === null || price === undefined || isNaN(price)) return "0.00000000 BTC";
  return `${Number(price).toFixed(8)} BTC`;
};

onMounted(async () => {
  await trendingStore.getTrendingCoinsAction();
});
</script>
<template>
  <div class="min-h-screen bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-secondary-100 transition-colors pb-16">
    <!-- Sticky Glassmorphic Header -->
    <header class="p-6 sm:px-8 border-b border-slate-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md sticky top-0 z-20">
      <div class="max-w-7xl mx-auto flex flex-col gap-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="p-1.5 rounded-lg bg-secondary-300/10 text-secondary-300 dark:bg-secondary-300/20">
                <BuildingLibraryIcon class="w-5 h-5" />
              </span>
              <h1 class="text-2xl font-heading font-extrabold tracking-tight text-slate-900 dark:text-white">
                Crypto Exchanges
              </h1>
            </div>
            <p class="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Top centralized and decentralized digital asset trading platforms worldwide.
            </p>
          </div>

          <!-- Total / Filtered Count Badge -->
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-primary/10 text-primary dark:bg-secondary-300/20 dark:text-secondary-200 border border-primary/20 dark:border-secondary-300/30">
              <span class="w-1.5 h-1.5 rounded-full bg-secondary-300 animate-pulse"></span>
              {{ filteredExchanges.length }} of {{ exchanges.length }} Platforms
            </span>
          </div>
        </div>

        <!-- Search & Filter Controls Bar -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <!-- Text Search -->
          <div class="relative sm:col-span-2">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by name, country, or description..."
              class="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded-xl text-slate-900 dark:text-secondary-100 placeholder-slate-400 focus:outline-none focus:border-secondary-300 focus:ring-2 focus:ring-secondary-300/20 transition-all shadow-sm"
            />
            <MagnifyingGlassIcon class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <button
              v-if="searchQuery"
              type="button"
              @click="searchQuery = ''"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Clear search"
            >
              <XMarkIcon class="w-4 h-4" />
            </button>
          </div>

          <!-- Country Filter Dropdown -->
          <div class="relative">
            <select
              v-model="selectedCountry"
              class="w-full appearance-none pl-3.5 pr-8 py-2.5 text-xs sm:text-sm bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded-xl text-slate-900 dark:text-secondary-100 focus:outline-none focus:border-secondary-300 focus:ring-2 focus:ring-secondary-300/20 transition-all shadow-sm cursor-pointer"
            >
              <option value="all">All Countries ({{ countriesList.length }})</option>
              <option v-for="country in countriesList" :key="country" :value="country">
                {{ country }}
              </option>
            </select>
            <ChevronUpDownIcon class="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <!-- Sort Order Dropdown -->
          <div class="relative">
            <select
              v-model="sortBy"
              class="w-full appearance-none pl-3.5 pr-8 py-2.5 text-xs sm:text-sm bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded-xl text-slate-900 dark:text-secondary-100 focus:outline-none focus:border-secondary-300 focus:ring-2 focus:ring-secondary-300/20 transition-all shadow-sm cursor-pointer"
            >
              <option value="rank_asc">Rank: Top to Bottom</option>
              <option value="trust_desc">Trust Score: High to Low</option>
              <option value="year_desc">Established: Newest First</option>
              <option value="year_asc">Established: Oldest First</option>
              <option value="name_asc">Name: A to Z</option>
            </select>
            <ChevronUpDownIcon class="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>
    </header>

    <Loader v-if="isLoading" message="Fetching exchange platforms..." />

    <!-- Main Content -->
    <main v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Empty State -->
      <div
        v-if="filteredExchanges.length === 0"
        class="text-center py-16 px-4 bg-white dark:bg-neutral-900/80 rounded-3xl border border-slate-200/80 dark:border-neutral-800/80 max-w-lg mx-auto shadow-sm"
      >
        <div class="w-12 h-12 rounded-2xl bg-secondary-300/10 text-secondary-300 flex items-center justify-center mx-auto mb-4">
          <MagnifyingGlassIcon class="w-6 h-6" />
        </div>
        <h3 class="text-base font-heading font-bold text-slate-900 dark:text-white mb-1">
          No Exchanges Found
        </h3>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
          No platforms match your current search and filter settings.
        </p>
        <button
          type="button"
          @click="resetFilters"
          class="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-primary text-secondary-100 hover:opacity-90 active:scale-95 transition-all shadow-sm"
        >
          Reset All Filters
        </button>
      </div>

      <!-- Card Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="exchange in filteredExchanges"
          :key="exchange.id"
          class="group bg-white dark:bg-neutral-900/90 rounded-3xl border border-slate-200/80 dark:border-neutral-800/80 p-6 shadow-sm hover:shadow-xl hover:border-secondary-300/40 transition-all flex flex-col justify-between"
        >
          <div>
            <!-- Header: Logo, Name, Trust Score/Rank Badge -->
            <div class="flex items-start justify-between gap-4 mb-5">
              <div class="flex items-center gap-3.5 min-w-0">
                <div class="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-neutral-800 p-2.5 border border-slate-100 dark:border-neutral-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <img
                    :src="exchange.image"
                    :alt="exchange.name"
                    class="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div class="min-w-0">
                  <h2 class="font-heading font-bold text-base text-slate-900 dark:text-white truncate">
                    {{ exchange.name }}
                  </h2>
                  <div class="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                    <MapPinIcon class="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    <span class="truncate">{{ exchange.country || "Global / Decentralized" }}</span>
                  </div>
                </div>
              </div>

              <span
                v-if="exchange.trust_score_rank"
                class="px-2.5 py-1 rounded-xl text-[11px] font-mono font-bold bg-primary/10 text-primary dark:bg-secondary-300/20 dark:text-secondary-200 border border-primary/20 dark:border-secondary-300/30 shrink-0"
              >
                Rank #{{ exchange.trust_score_rank }}
              </span>
            </div>

            <!-- Description -->
            <div class="mb-5">
              <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                {{ exchange.description || "Leading digital asset trading venue providing liquid spot, derivatives, and fiat on-ramp services." }}
              </p>
            </div>

            <!-- Metrics Bar -->
            <div class="grid grid-cols-2 gap-3 mb-2">
              <div class="p-3 rounded-2xl bg-slate-50 dark:bg-neutral-800/60 border border-slate-100 dark:border-neutral-800">
                <span class="block text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
                  Established
                </span>
                <p class="text-xs font-mono font-bold text-slate-800 dark:text-secondary-100 mt-0.5">
                  {{ exchange.year_established || "N/A" }}
                </p>
              </div>

              <div class="p-3 rounded-2xl bg-slate-50 dark:bg-neutral-800/60 border border-slate-100 dark:border-neutral-800">
                <span class="block text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
                  Trust Score
                </span>
                <p class="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 flex items-center gap-1">
                  <span>{{ exchange.trust_score ?? "N/A" }}</span>
                  <span v-if="exchange.trust_score" class="text-[10px] text-slate-400 font-normal">/ 10</span>
                </p>
              </div>
            </div>
          </div>

          <!-- Card Footer Action -->
          <div class="pt-4 mt-3 border-t border-slate-100 dark:border-neutral-800 flex items-center justify-between">
            <a
              v-if="exchange.url"
              :href="exchange.url"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-semibold bg-primary text-secondary-100 hover:opacity-90 active:scale-95 transition-all shadow-sm"
            >
              <span>Visit Exchange</span>
              <ArrowTopRightOnSquareIcon class="w-3.5 h-3.5" />
            </a>
            <span
              v-else
              class="text-xs text-slate-400 italic text-center w-full"
            >
              Official link unavailable
            </span>
          </div>
        </article>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import {
  BuildingLibraryIcon,
  MapPinIcon,
  ArrowTopRightOnSquareIcon,
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  XMarkIcon,
} from "@heroicons/vue/20/solid";
import { useExchange } from "../store/exchange";
import Loader from "../components/Loader.vue";

const exchangeStore = useExchange();
const exchanges = computed(() => exchangeStore.exchanges || []);
const isLoading = computed(() => exchangeStore.isLoading);

// Search and Filter State
const searchQuery = ref("");
const selectedCountry = ref("all");
const sortBy = ref("rank_asc");

// Extract sorted, unique countries list
const countriesList = computed(() => {
  const set = new Set();
  exchanges.value.forEach((e) => {
    if (e.country && e.country.trim()) {
      set.add(e.country.trim());
    }
  });
  return Array.from(set).sort((a, b) => a.localeCompare(b));
});

// Filtered and Sorted Exchanges
const filteredExchanges = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  return exchanges.value
    .filter((exchange) => {
      // 1. Text Search across name, country, and description
      const matchesSearch =
        !query ||
        exchange.name?.toLowerCase().includes(query) ||
        exchange.country?.toLowerCase().includes(query) ||
        exchange.description?.toLowerCase().includes(query);

      // 2. Country Filter
      const matchesCountry =
        selectedCountry.value === "all" ||
        exchange.country?.trim() === selectedCountry.value;

      return matchesSearch && matchesCountry;
    })
    .sort((a, b) => {
      // 3. Sorting logic
      if (sortBy.value === "rank_asc") {
        return (a.trust_score_rank ?? 9999) - (b.trust_score_rank ?? 9999);
      }
      if (sortBy.value === "trust_desc") {
        return (b.trust_score ?? 0) - (a.trust_score ?? 0);
      }
      if (sortBy.value === "year_desc") {
        return (b.year_established ?? 0) - (a.year_established ?? 0);
      }
      if (sortBy.value === "year_asc") {
        return (a.year_established ?? 9999) - (b.year_established ?? 9999);
      }
      if (sortBy.value === "name_asc") {
        return (a.name || "").localeCompare(b.name || "");
      }
      return 0;
    });
});

const resetFilters = () => {
  searchQuery.value = "";
  selectedCountry.value = "all";
  sortBy.value = "rank_asc";
};

onMounted(async () => {
  await exchangeStore.getExchangesAction();
});
</script>
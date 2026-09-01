<template>
  <div class="min-h-screen bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-secondary-100 transition-colors">
    <!-- Header Section -->
    <div class="p-6 sm:px-8 border-b border-slate-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md sticky top-0 z-20">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-heading font-extrabold tracking-tight text-slate-900 dark:text-white">
            Crypto Market
          </h1>
          <p class="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Real-time popular cryptocurrencies, exchanges, and token categories in USD/INR.
          </p>
        </div>

        <!-- Search Input with Icon -->
        <div class="relative w-full md:w-80">
          <input
            v-model="searchText"
            type="text"
            placeholder="Search by name or symbol..."
            class="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 rounded-xl text-slate-900 dark:text-secondary-100 placeholder-slate-400 focus:outline-none focus:border-secondary-300 focus:ring-2 focus:ring-secondary-300/20 transition-all shadow-sm"
          />
          <MagnifyingGlassIcon class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>
    </div>

    <Loader v-if="isLoading" />

    <!-- Main Container -->
    <main v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <!-- Combobox Quick Selector -->
      <div
        v-if="coinData && coinData.coins"
        class="max-w-xl mx-auto p-4 rounded-2xl bg-white dark:bg-neutral-900/80 border border-slate-200 dark:border-neutral-800 shadow-sm backdrop-blur-md"
      >
        <label class="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          Quick Jump to Token
        </label>
        <Combobox v-model="selectedCoin">
          <div class="relative w-full">
            <div
              class="relative w-full cursor-default overflow-hidden rounded-xl bg-slate-50 dark:bg-neutral-800/90 border border-slate-200 dark:border-neutral-700 text-left shadow-inner focus-within:ring-2 focus-within:ring-secondary-300 transition-all sm:text-sm"
            >
              <ComboboxInput
                class="w-full border-none py-2.5 pl-3.5 pr-10 text-xs sm:text-sm leading-5 bg-transparent text-slate-900 dark:text-secondary-100 placeholder-slate-400 focus:outline-none"
                :displayValue="(coin) => coin?.name || ''"
                placeholder="Type to filter coins list..."
                @change="onChangeHandler"
              />
              <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-3">
                <ChevronUpDownIcon class="h-4 w-4 text-slate-400" aria-hidden="true" />
              </ComboboxButton>
            </div>

            <TransitionRoot
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              @after-leave="query = ''"
            >
              <ComboboxOptions
                class="absolute z-30 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white dark:bg-neutral-900 py-1.5 text-xs sm:text-sm shadow-xl border border-slate-200 dark:border-neutral-800 ring-1 ring-black/5 focus:outline-none scrollbar-thin"
              >
                <div
                  v-if="filteredCoins && filteredCoins.length === 0 && query !== ''"
                  class="relative cursor-default select-none px-4 py-2.5 text-slate-500 dark:text-slate-400 text-center"
                >
                  No matching coins found.
                </div>

                <ComboboxOption
                  v-for="coin in filteredCoins"
                  :key="coin.id"
                  :value="coin"
                  as="template"
                  v-slot="{ selected, active }"
                >
                  <li
                    class="relative cursor-pointer select-none py-2.5 pl-10 pr-4 transition-colors"
                    :class="[
                      active ? 'bg-primary text-secondary-100 dark:bg-secondary-300 dark:text-white' : 'text-slate-900 dark:text-slate-200',
                    ]"
                  >
                    <div class="flex items-center gap-2">
                      <span class="block truncate" :class="{ 'font-semibold': selected, 'font-normal': !selected }">
                        {{ coin.name }}
                      </span>
                      <span class="text-[11px] opacity-70 uppercase font-mono">
                        ({{ coin.symbol }})
                      </span>
                    </div>
                    <span
                      v-if="selected"
                      class="absolute inset-y-0 left-0 flex items-center pl-3"
                      :class="{ 'text-secondary-100': active, 'text-secondary-300': !active }"
                    >
                      <CheckIcon class="h-4 w-4" aria-hidden="true" />
                    </span>
                  </li>
                </ComboboxOption>
              </ComboboxOptions>
            </TransitionRoot>
          </div>
        </Combobox>
      </div>

      <!-- Coins Section -->
      <section v-if="coinData?.coins?.length" class="space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-neutral-800">
          <div>
            <h2 class="text-xl font-heading font-bold text-slate-900 dark:text-white">
              Trending Tokens
            </h2>
            <p class="text-xs text-slate-400 mt-0.5">Top-ranked cryptocurrency assets</p>
          </div>
          <span class="text-xs font-mono font-medium px-3 py-1 rounded-full bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-slate-300">
            {{ coinData.coins.length }} Listed
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <div
            v-for="coin in coinData.coins"
            :key="coin.id"
            class="group bg-white dark:bg-neutral-900/90 rounded-2xl border border-slate-200/80 dark:border-neutral-800/80 shadow-sm hover:shadow-md hover:border-secondary-300/40 transition-all p-5 flex flex-col justify-between"
          >
            <div>
              <div class="flex items-start justify-between gap-3 mb-4">
                <div class="w-14 h-14 rounded-xl bg-slate-50 dark:bg-neutral-800 p-2 border border-slate-100 dark:border-neutral-700 flex items-center justify-center shrink-0">
                  <img :src="coin.large" :alt="coin.name" class="w-full h-full object-contain" />
                </div>
                <span class="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-primary/10 text-primary dark:bg-secondary-300/20 dark:text-secondary-200 border border-primary/20 dark:border-secondary-300/30">
                  #{{ coin.market_cap_rank ?? 'N/A' }}
                </span>
              </div>

              <h3 class="font-heading font-bold text-base text-slate-900 dark:text-white truncate">
                {{ coin.name }}
              </h3>
              <p class="text-xs font-mono uppercase text-slate-400 tracking-wide mb-4">
                {{ coin.symbol }}
              </p>
            </div>

            <!-- Price Buttons -->
            <div class="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 dark:border-neutral-800/80">
              <button
                type="button"
                @click="showPriceInUSD(coin.id)"
                class="w-full py-2 px-3 text-xs font-semibold rounded-xl bg-primary text-secondary-100 hover:opacity-90 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-1"
              >
                <span>Price (USD)</span>
              </button>
              <button
                type="button"
                @click="showPriceInINR(coin.id)"
                class="w-full py-2 px-3 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-neutral-800 text-slate-800 dark:text-secondary-200 hover:bg-slate-200 dark:hover:bg-neutral-700 active:scale-95 transition-all border border-slate-200/80 dark:border-neutral-700 flex items-center justify-center gap-1"
              >
                <span>Price (INR)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Exchanges Section -->
      <section v-if="coinData?.exchanges?.length" class="space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-neutral-800">
          <div>
            <h2 class="text-xl font-heading font-bold text-slate-900 dark:text-white">
              Exchanges
            </h2>
            <p class="text-xs text-slate-400 mt-0.5">Active spot and derivative platforms</p>
          </div>
          <span class="text-xs font-mono font-medium px-3 py-1 rounded-full bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-slate-300">
            {{ coinData.exchanges.length }} Platforms
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          <div
            v-for="exchange in coinData.exchanges"
            :key="exchange.id"
            class="p-4 rounded-2xl bg-white dark:bg-neutral-900/80 border border-slate-200/80 dark:border-neutral-800/80 shadow-sm flex items-center gap-4"
          >
            <div class="w-12 h-12 rounded-xl bg-slate-50 dark:bg-neutral-800 p-2 border border-slate-100 dark:border-neutral-700 flex items-center justify-center shrink-0">
              <img :src="exchange.large" :alt="exchange.name" class="w-full h-full object-contain" />
            </div>
            <div class="min-w-0">
              <h3 class="text-sm font-semibold text-slate-900 dark:text-white truncate">
                {{ exchange.name }}
              </h3>
              <p class="text-xs text-slate-400 truncate">
                Market: <span class="font-medium text-slate-600 dark:text-slate-300 capitalize">{{ exchange.market_type || 'Spot' }}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Categories Section -->
      <section v-if="coinData?.categories?.length" class="space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-neutral-800">
          <div>
            <h2 class="text-xl font-heading font-bold text-slate-900 dark:text-white">
              Token Sectors & Categories
            </h2>
            <p class="text-xs text-slate-400 mt-0.5">DeFi, Layer 1, Gaming, NFTs, and more</p>
          </div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <div
            v-for="item in coinData.categories"
            :key="item.id || item.name"
            class="p-3.5 rounded-xl bg-white dark:bg-neutral-900/80 border border-slate-200/80 dark:border-neutral-800/80 text-center shadow-sm hover:border-secondary-300/40 transition-colors"
          >
            <p class="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">
              {{ item.name }}
            </p>
          </div>
        </div>
      </section>
    </main>

    <!-- Modal for Price Details -->
    <TransitionRoot appear :show="isPriceModalOpen" as="template">
      <Dialog as="div" @close="closePriceModal" class="relative z-50">
        <TransitionChild
          as="template"
          enter="duration-200 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-150 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as="template"
              enter="duration-200 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-150 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-sm transform overflow-hidden rounded-3xl bg-white dark:bg-neutral-900 p-6 text-left align-middle shadow-2xl border border-slate-200 dark:border-neutral-800 transition-all space-y-4"
              >
                <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-neutral-800">
                  <DialogTitle as="h3" class="text-base font-heading font-bold text-slate-900 dark:text-white">
                    Token Valuation
                  </DialogTitle>
                  <span class="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-secondary-300/10 text-secondary-300 font-bold">
                    Live Rates
                  </span>
                </div>

                <div class="py-2">
                  <p class="text-sm font-mono text-slate-700 dark:text-slate-300 leading-relaxed break-words">
                    {{ priceMessage }}
                  </p>
                </div>

                <div class="pt-2">
                  <button
                    type="button"
                    class="w-full inline-flex justify-center rounded-xl bg-primary text-secondary-100 px-4 py-2.5 text-xs font-semibold hover:opacity-90 active:scale-95 transition-all shadow-sm"
                    @click="closePriceModal"
                  >
                    Close Window
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { computed, ref, watch, onUnmounted } from "vue";
// Fixed Heroicons v2 import paths
import {
  CheckIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/vue/20/solid";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/vue";
import { useCoin } from "../store/coin";
import Loader from "../components/Loader.vue";

const coinStore = useCoin();
const searchText = ref("");
const isPriceModalOpen = ref(false);
const selectedCoin = ref(null);
const query = ref("");
let timeoutId = null;

const priceMessage = computed(() => coinStore.priceMessage);
const coinData = computed(() => coinStore.coinList);
const isLoading = computed(() => coinStore.isLoading);

const searchCoinUtil = async () => {
  await coinStore.searchCoinsAction(searchText.value);
};

const debouncedSearch = (value) => {
  if (timeoutId) clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    if (value && value.length > 3) {
      searchCoinUtil();
    }
  }, 600);
};

watch(searchText, debouncedSearch);

const filteredCoins = computed(() => {
  if (!coinData.value?.coins) return [];
  if (!query.value) return coinData.value.coins;
  return coinData.value.coins.filter((coin) => {
    return (
      coin.name.toLowerCase().includes(query.value.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(query.value.toLowerCase())
    );
  });
});

const showPriceInUSD = (coinId) => {
  coinStore.showPriceUSD(coinId);
  openPriceModal();
};

const showPriceInINR = (coinId) => {
  coinStore.showPriceINR(coinId);
  openPriceModal();
};

const openPriceModal = () => {
  isPriceModalOpen.value = true;
};

const closePriceModal = () => {
  isPriceModalOpen.value = false;
};

watch(coinData, (newValue) => {
  if (newValue?.coins?.length && !selectedCoin.value) {
    selectedCoin.value = newValue.coins[0];
  }
});

const onChangeHandler = (event) => {
  query.value = event.target.value;
  if (query.value === "" && coinData.value?.coins?.length) {
    selectedCoin.value = coinData.value.coins[0];
  }
};

onUnmounted(() => {
  if (timeoutId) clearTimeout(timeoutId);
});
</script>
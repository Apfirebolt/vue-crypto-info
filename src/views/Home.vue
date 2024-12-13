<template>
  <div>
    <div class="p-5 border-b border-gray-200">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Home
      </h3>
      <p class="mt-2 max-w-4xl text-sm text-gray-500">
        List of popular cryptocurrencies and their price in USD
      </p>
      <input
        v-model="searchText"
        type="text"
        class="mt-3 p-2 border w-1/5 border-gray-300 rounded-md"
        placeholder="Search by name or symbol"
      />
    </div>
    <Loader v-if="isLoading" />

    <div class="mx-auto w-3/4 my-3">
      <h2
        v-if="coinData && coinData.coins && coinData.coins.length > 0"
        class="text-center bg-blue-700 text-white text-xl px-2 py-3"
      >
        Coins
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 px-2 py-4">
        <div
          v-for="coin in coinData.coins"
          :key="coin.id"
          class="max-w-sm rounded overflow-hidden text-center shadow-lg my-4"
        >
          <img
            class="w-64 h-64 mx-auto my-3"
            :src="coin.large"
            :alt="coin.name"
          />
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">
              {{ coin.name }} ({{ coin.symbol.toUpperCase() }})
            </div>
            <p class="text-gray-700 text-base">
              Market Cap Rank: {{ coin.market_cap_rank }}
            </p>
            <div class="flex justify-between items-center p-2">
              <button
                @click="showPriceInUSD(coin.id)"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Show Price in USD
              </button>
              <button
                @click="showPriceInINR(coin.id)"
                class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
              >
                Show Price in INR
              </button>
            </div>
          </div>
        </div>
      </div>
      <h2
        v-if="coinData && coinData.exchanges && coinData.exchanges.length > 0"
        class="text-center bg-blue-700 text-white text-xl px-2 py-3"
      >
        Exchanges
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 px-2 py-4">
        <div
          v-for="exchange in coinData.exchanges"
          :key="exchange.id"
          class="max-w-sm rounded overflow-hidden text-center shadow-lg my-4"
        >
          <img
            class="w-64 h-64 mx-auto my-3"
            :src="exchange.large"
            :alt="exchange.name"
          />
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">
              {{ exchange.name }}
            </div>
            <p class="text-gray-700 text-base">
              Market Type: {{ exchange.market_type }}
            </p>
          </div>
        </div>
      </div>
      <h2
        v-if="coinData && coinData.categories && coinData.categories.length > 0"
        class="text-center bg-blue-700 text-white text-xl px-2 py-3"
      >
        Categories
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 px-2 py-4">
        <div
          v-for="item in coinData.categories"
          :key="item.id"
          class="max-w-sm rounded overflow-hidden text-center shadow-lg my-4"
        >
          <div class="px-6 py-4">
            <p class="text-gray-700 text-base">
              {{ item.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <TransitionRoot appear :show="isPriceModalOpen" as="template">
      <Dialog as="div" @close="closePriceModal" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
                >
                  Price Details
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    {{ priceMessage }}
                  </p>
                </div>

                <div class="mt-4">
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="closePriceModal"
                  >
                    Got it, thanks!
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
import { computed, ref, watch, onMounted } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { useCoin } from "../store/coin";
import Loader from "../components/Loader.vue";

const coinStore = useCoin();
const searchText = ref("");
const isPriceModalOpen = ref(false);
const priceMessage = computed(() => coinStore.priceMessage);
const coinData = computed(() => coinStore.coinList);
const isLoading = computed(() => coinStore.isLoading);
let timeoutId;

const searchCoinUtil = async () => {
  await coinStore.searchCoinsAction(searchText.value);
};

const debouncedSearch = (value) => {
  if (timeoutId) clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    if (value.length > 3) {
      searchCoinUtil();
    }
  }, 1000); // Adjust delay as needed (in milliseconds)
};

watch(searchText, debouncedSearch);

const showPriceInUSD = (coinId) => {
  coinStore.showPriceUSD(coinId);
  openPriceModal();
};

const closePriceModal = () => {
  isPriceModalOpen.value = false;
};

const openPriceModal = () => {
  isPriceModalOpen.value = true;
};

const showPriceInINR = (coinId) => {
  coinStore.showPriceINR(coinId);
  openPriceModal();
};

onMounted(() => {
  // Cleanup function to clear timeout on component unmount
  return () => clearTimeout(timeoutId);
});
</script>

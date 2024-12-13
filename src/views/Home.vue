<template>
  <div>
    <div class="p-5 border-b border-gray-200">
      <h3 class="text-lg leading-6 font-medium text-gray-900">Home</h3>
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
      <h2 class="text-center bg-blue-700 text-white text-xl px-2 py-3">
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
          </div>
        </div>
      </div>
      <h2 class="text-center bg-blue-700 text-white text-xl px-2 py-3">
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
      <h2 class="text-center bg-blue-700 text-white text-xl px-2 py-3">
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
  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted } from "vue";
import { useCoin } from "../store/coin";
import Loader from "../components/Loader.vue";

const coinStore = useCoin();
const searchText = ref("");
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

onMounted(() => {
  // Cleanup function to clear timeout on component unmount
  return () => clearTimeout(timeoutId);
});
</script>

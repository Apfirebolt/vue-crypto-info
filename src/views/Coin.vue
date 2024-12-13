<template>
  <div>
    <div class="p-5 border-b border-gray-200">
      <h3 class="text-lg leading-6 font-medium text-gray-900">Coins</h3>
      <p class="mt-2 max-w-4xl text-sm text-gray-500">
        List of popular cryptocurrencies and their price in USD
      </p>
    </div>
    <Loader v-if="isLoading" />

    <div class="mx-auto w-3/4 my-3">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 px-2 py-4">
        <div
          v-for="coin in coins"
          :key="coin.id"
          class="max-w-sm rounded overflow-hidden text-center shadow-lg my-4"
        >
          <img
            class="w-64 h-64 mx-auto my-3"
            :src="coin.image"
            :alt="coin.name"
          />
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">
              {{ coin.name }} ({{ coin.symbol.toUpperCase() }})
            </div>
            <p class="text-gray-700 text-base">
              Current Price: ${{ coin.current_price }}
            </p>
            <p class="text-gray-700 text-base">
              Market Cap: ${{ coin.market_cap }}
            </p>
            <p class="text-gray-700 text-base">
              24h High: ${{ coin.high_24h }}
            </p>
            <p class="text-gray-700 text-base">24h Low: ${{ coin.low_24h }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useCoin } from "../store/coin";
import Loader from "../components/Loader.vue";
const coinStore = useCoin();

const coins = computed(() => coinStore.coinList);
const isLoading = computed(() => coinStore.isLoading);

onMounted(async () => {
  // API call
  await coinStore.getCoinsAction();
});
</script>

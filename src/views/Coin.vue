<template>
  <div>
    <div class="p-5 border-b border-gray-200">
      <h3 class="text-lg leading-6 font-medium text-gray-900">Coins</h3>
      <p class="mt-2 max-w-4xl text-sm text-gray-500">
        List of popular cryptocurrencies and their price in USD
      </p>
      <div class="w-1/2 mx-auto my-3 bg-neutral-100 rounded-md p-1">
        <div class="flex justify-between items-center mt-4">
          <button
            @click="previousPage"
            :disabled="currentPage === 1"
            class="bg-blue-500 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>Page {{ currentPage }}</span>
          <button
            @click="nextPage"
            class="bg-blue-500 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
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
            <div class="mb-2">
              <div class="flex justify-between items-center my-2 bg-neutral-100 p-2">
                <p>
                  Name 
                </p>
                <p>
                  {{ coin.name }}
                </p>
              </div>
              <div class="flex justify-between items-center my-2 bg-neutral-100 p-2">
                <p>
                  Symbol
                </p>
                <p>
                  {{ coin.symbol.toUpperCase() }}
                </p>
              </div>
              <div class="flex justify-between items-center my-2 bg-neutral-100 p-2">
                <p>
                  Market Cap Rank
                </p>
                <p>
                  {{ coin.market_cap_rank }}
                </p>
              </div>
              <div class="flex justify-between items-center my-2 bg-neutral-100 p-2">
                <p>
                  Current Price
                </p>
                <p>
                  ${{ coin.current_price }}
                </p>
              </div>
              <div class="flex justify-between items-center my-2 bg-neutral-100 p-2">
                <p>
                  24 Hour High
                </p>
                <p>
                  ${{ coin.high_24h }}
                </p>
              </div>
              <div class="flex justify-between items-center bg-neutral-100 p-2">
                <p>
                  24 Hour Low
                </p>
                <p>
                  ${{ coin.low_24h }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, h } from "vue";
import { useCoin } from "../store/coin";
import Loader from "../components/Loader.vue";

const coinStore = useCoin();
const currentPage = ref(1);
const coins = computed(() => coinStore.coinList);
const isLoading = computed(() => coinStore.isLoading);

const nextPage = () => {
  currentPage.value++;
  coinStore.getCoinsAction(currentPage.value);
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    coinStore.getCoinsAction(currentPage.value);
  }
};

onMounted(async () => {
  // API call
  await coinStore.getCoinsAction();
});
</script>

<template>
    <div>
      <div class="p-5 border-b border-gray-200">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Trending</h3>
        <p class="mt-2 max-w-4xl text-sm text-gray-500">
          List of popular trending cryptocurrencies across the world
        </p>
      </div>
      <Loader v-if="isLoading" />
  
      <div class="mx-auto w-3/4 my-3">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 px-2 py-4">
          <div
            v-for="item in trendingList.coins"
            :key="item.id"
            class="max-w-sm rounded overflow-hidden text-center shadow-lg my-4"
          >
            <img
              class="w-64 h-64 mx-auto my-3"
              :src="item.item.large"
              :alt="item.item.name"
            />
            <div class="px-6 py-4">
              <div class="mb-2">
                <img
                  :src="item.item.small"
                  :alt="item.item.name"
                  class="w-16 h-16 mx-auto my-2"
                />
              </div>
              <div>
                <p class="text-lg font-bold">
                  {{ item.item.name }} ({{ item.item.symbol.toUpperCase() }})
                </p>
                <p>
                    Market Cap Rank: {{ item.item.market_cap_rank }}
                </p>
                <p>
                    Price in BTC: {{ item.item.price_btc }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, onMounted } from "vue";
  import { useTrending } from "../store/trending";
  import Loader from "../components/Loader.vue";
  const trendingStore = useTrending();
  
  const trendingList = computed(() => trendingStore.trending);
  const isLoading = computed(() => trendingStore.isLoading);
  
  onMounted(async () => {
    // API call
    await trendingStore.getTrendingCoinsAction();
  });
  </script>
  
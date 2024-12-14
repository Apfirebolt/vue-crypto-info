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
        <h2
          v-if="trendingList && trendingList.coins && trendingList.coins.length > 0"
          class="text-center bg-blue-700 text-white text-xl px-2 py-3"
        >
          Trending Coins
        </h2>
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
              <div>
                <div class="flex justify-between items-center bg-neutral-100 p-2 my-2">
                  <p>
                    Name
                  </p>
                  <p>
                    {{ item.item.name }}
                  </p>
                </div>
                <div class="flex justify-between items-center bg-neutral-100 p-2 my-2">
                  <p>
                    Symbol
                  </p>
                  <p>
                    ({{ item.item.symbol.toUpperCase() }})
                  </p>
                </div>
                <div class="flex justify-between items-center bg-neutral-100 p-2 my-2">
                  <p>
                    Market Cap Rank
                  </p>
                  <p>
                    {{ item.item.market_cap_rank }}
                  </p>
                </div>
                <div class="flex justify-between items-center bg-neutral-100 p-2 my-2">
                  <p>
                    Price in BTC
                  </p>
                  <p>
                    {{ item.item.price_btc }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h2
          v-if="trendingList && trendingList.coins && trendingList.coins.length > 0"
          class="text-center bg-blue-700 text-white text-xl px-2 py-3"
        >
          Trending NFTS
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 px-2 py-4">
          <div
            v-for="item in trendingList.nfts"
            :key="item.id"
            class="max-w-sm rounded overflow-hidden text-center shadow-lg my-4"
          >
            <img
              class="w-64 h-64 mx-auto my-3"
              :src="item.thumb"
              :alt="item.name"
            />
            <div class="px-6 py-4">
              <div>
                <div class="flex justify-between items-center bg-neutral-100 p-2 my-2">
                  <p>
                    Name
                  </p>
                  <p>
                    {{ item.name }}
                  </p>
                </div>
                <div class="flex justify-between items-center bg-neutral-100 p-2 my-2">
                  <p>
                    Symbol
                  </p>
                  <p>
                    ({{ item.symbol.toUpperCase() }})
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h2
          v-if="trendingList && trendingList.categories && trendingList.categories.length > 0"
          class="text-center bg-blue-700 text-white text-xl px-2 py-3"
        >
          Trending Categories
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 px-2 py-4">
          <div
            v-for="item in trendingList.categories"
            :key="item.id"
            class="max-w-sm rounded overflow-hidden text-center shadow-lg my-4"
          >
            <div class="px-6 py-4">
              <div>
                <div class="flex justify-between items-center bg-neutral-100 p-2 my-2">
                  <p>
                    Name
                  </p>
                  <p>
                    {{ item.name }}
                  </p>
                </div>
                <div class="flex justify-between items-center bg-neutral-100 p-2 my-2">
                  <p>
                    Coin Count
                  </p>
                  <p>
                    {{ item.coins_count }}
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
  
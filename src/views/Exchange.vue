<template>
  <div>
    <div class="p-5 border-b border-gray-200">
      <h3 class="text-lg leading-6 font-medium text-gray-900">Exchanges</h3>
      <p class="mt-2 max-w-4xl text-sm text-gray-500">
        List of popular crypto exchanges across the world
      </p>
    </div>
    <Loader v-if="isLoading" />

    <div class="mx-auto w-3/4 my-3">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 px-2 py-4">
        <div
          v-for="exchange in exchanges"
          :key="exchange.id"
          class="max-w-sm rounded overflow-hidden text-center shadow-lg my-4"
        >
          <img
            class="w-64 h-64 mx-auto my-3"
            :src="exchange.image"
            :alt="exchange.name"
          />
          <div class="px-6 py-4">
            <div class="mb-2">
              <img
                :src="exchange.image"
                :alt="exchange.name"
                class="w-16 h-16 mx-auto my-2"
              />
              <p class="text-lg font-bold">
                {{ exchange.name }} ({{ exchange.country }}) -
                {{ exchange.year_established }}
              </p>
              <p class="text-md my-3">
                {{ exchange.description }}
              </p>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useExchange } from "../store/exchange";
import Loader from "../components/Loader.vue";
const exchangeStore = useExchange();

const exchanges = computed(() => exchangeStore.exchanges);
const isLoading = computed(() => exchangeStore.isLoading);

onMounted(async () => {
  // API call
  await exchangeStore.getExchangesAction();
});
</script>

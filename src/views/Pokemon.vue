<template>
    <div>
      <div class="p-5 border-b border-gray-200">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Pokemon
        </h3>
        <p class="mt-2 max-w-4xl text-sm text-gray-500">
          A sample pokemon page added to show integrations from multiple API end-points.
        </p>
      </div>
      <Loader v-if="isLoading" />
  
      <div class="mx-auto w-3/4 my-3">
        <h2
          v-if="pokemonData && pokemonData.results && pokemonData.results.length > 0"
          class="text-center bg-blue-700 text-white text-xl px-2 py-3"
        >
          Pokemon
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 px-2 py-4">
          <div
            v-for="pokemon in pokemonData.results"
            :key="pokemon.id"
            class="max-w-sm rounded overflow-hidden text-center shadow-lg my-4"
          >
            <div class="px-6 py-4">
              <p class="text-lg font-semibold">
                {{ capitalizePokemonName(pokemon.name) }}
              </p>
              <a :href="pokemon.url" class="text-blue-500 hover:underline">
                {{ pokemon.url }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, onMounted } from "vue";
  import { usePokemon } from "../store/pokemon";
  import Loader from "../components/Loader.vue";
  
  const pokemonStore = usePokemon();
  const pokemonData = computed(() => pokemonStore.pokemonData);
  const isLoading = computed(() => pokemonStore.isLoading);

  const capitalizePokemonName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };
  
  onMounted(async () => {
    await pokemonStore.getPokemonAction();    
  });
  </script>
  
import { defineStore } from "pinia";
import { ref } from "vue";
import { pokemonClient } from "../plugins/interceptor";

export const usePokemon = defineStore("pokemon", {
  state: () => ({
    pokemon: ref({}),
    pokemonData: ref([]),
    loading: ref(false),
  }),

  getters: {
    getPokemon() {
      return this.pokemon;
    },
    getPokemonData() {
      return this.pokemonData;
    },
    isLoading() {
      return this.loading;
    },
  },

  actions: {
    async getPokemonAction(page = 1) {
      try {
        this.loading = true;
        const response = await pokemonClient.get(`pokemon?limit=20&offset=${page}`);
        if (response) {
          this.pokemonData = response.data;
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    resetpokemonData() {
      this.pokemon = {};
      this.pokemonData = [];
    },
  },
});
import { defineStore } from "pinia";
import { ref } from "vue";
import { httpClient } from "../plugins/interceptor";

export const useTrending = defineStore("trending", {
  state: () => ({
    trending: ref([]),
    loading: ref(false),
  }),

  getters: {
    getTrending() {
      return this.trending;
    },
    isLoading() {
      return this.loading;
    },
  },

  actions: {
    async getTrendingCoinsAction() {
      try {
        this.loading = true;
        const response = await httpClient.get("search/trending");
        this.loading = false;
        this.trending = response.data;
      } catch (error) {
        this.loading = false;
        console.log(error);
        return error;
      }
    },

    resetTrendingData() {
      this.trending = [];
      this.loading = false;
    },
  },
});
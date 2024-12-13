import { defineStore } from "pinia";
import { ref } from "vue";
import httpClient from "../plugins/interceptor";

export const useExchange = defineStore("exchange", {
  state: () => ({
    exchanges: ref({}),
    loading: ref(false),
  }),

  getters: {
    getExchanges() {
      return this.exchanges;
    },
    isLoading() {
      return this.loading;
    },
  },

  actions: {
    async getExchangesAction() {
      try {
        this.loading = true;
        const response = await httpClient.get("exchanges?page=" + page, {
          headers,
        });
        this.exchanges = response.data;
      } catch (error) {
        this.loading = false;
        console.log(error);
        return error;
      }
    },

    resetcoinData() {
      this.exchanges = [];
    },
  },
});
import { defineStore } from "pinia";
import { ref } from "vue";
import httpClient from "../plugins/interceptor";

export const useCoin = defineStore("coin", {
  state: () => ({
    coin: ref({}),
    coinList: ref([]),
    loading: ref(false),
  }),

  getters: {
    getCoin() {
      return this.coin;
    },
    getCoinList() {
      return this.coinList;
    },
    isLoading() {
      return this.loading;
    },
  },

  actions: {
    async getCoinsAction(page = 1) {
      try {
        this.loading = true;
        const response = await httpClient.get(`coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${page}&sparkline=false`);
        if (response) {
          this.coinList = response.data;
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    resetcoinData() {
      this.coin = {};
      this.coinList = [];
    },
  },
});
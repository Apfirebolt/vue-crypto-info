import { defineStore } from "pinia";
import { ref } from "vue";
import httpClient from "../plugins/interceptor";

export const usecoin = defineStore("coin", {
  state: () => ({
    coin: ref({}),
    coinList: ref([]),
    loading: ref(false),
  }),

  getters: {
    getcoin() {
      return this.coin;
    },
    getcoinList() {
      return this.coinList;
    },
    isLoading() {
      return this.loading;
    },
  },

  actions: {
    async searchCoinAction(name, page = 1) {
      try {
        this.loading = true;
        const response = await httpClient.get(`coin`, {
          params: {
            q: name,
            page: page,
          },
        });
        if (response) {
          this.coinList = response.data;
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    async getCoinsAction(id) {
      try {
        this.loading = true;
        const response = await httpClient.get("groups?page=" + page, {
          headers,
        });
        this.coinList = response.data;
      } catch (error) {
        this.loading = false;
        console.log(error);
        return error;
      }
    },

    resetcoinData() {
      this.coin = {};
      this.coinList = [];
    },
  },
});
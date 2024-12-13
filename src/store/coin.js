import { defineStore } from "pinia";
import { ref } from "vue";
import httpClient from "../plugins/interceptor";

export const useCoin = defineStore("coin", {
  state: () => ({
    coin: ref({}),
    coinList: ref([]),
    priceMessage: ref(""),
    loading: ref(false),
  }),

  getters: {
    getCoin() {
      return this.coin;
    },
    getCoinList() {
      return this.coinList;
    },
    getPriceMessage() {
      return this.priceMessage;
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

    async searchCoinsAction(searchText) {
      try {
        this.loading = true;
        const response = await httpClient.get(`search?query=${searchText}`);
        if (response) {
          this.coinList = response.data;
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    async showPriceINR (coinId) {
      try {
        this.loading = true;
        const { data } = await httpClient.get(
          `simple/price?ids=${coinId}&vs_currencies=inr`
        );
        this.loading = false;
        // set the price message
        this.priceMessage = `1 ${coinId} = ₹${data[coinId].inr}`;
      } catch (error) {
        this.loading = false;
        console.error(error);
      }
    },

    async showPriceUSD (coinId) {
      try {
        this.loading = true;
        const { data } = await httpClient.get(
          `simple/price?ids=${coinId}&vs_currencies=usd`
        );
        this.loading = false;
        // set the price message
        this.priceMessage = `1 ${coinId} = $${data[coinId].usd}`;
      } catch (error) {
        this.loading = false;
        console.error(error);
      }
    },

    resetcoinData() {
      this.coin = {};
      this.coinList = [];
    },
  },
});
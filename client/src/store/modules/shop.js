import Vue from 'vue';
import { catchAsync } from '@/utils';

export default {
  namespaced: true,
  state: {
    currentShop: {},
    shops: [],
  },
  getters: {},
  actions: {
    async getShop({ commit, state }, shopId) {
      try {
        if (state.currentShop.id == shopId) return;
        const response = await Vue.prototype.$http
          .get(`shop/${shopId}`)
          .catch((res) => console.log(res.response));
        commit('SET_SHOP', response.data.data.data);
      } catch (error) {}
    },
    async getAllShop({ commit, state }) {
      try {
        if (!state.shops.length) return;
        const response = await Vue.prototype.$http.get(`shop/`);
        commit('SET_SHOPS', response.data.data.data);
      } catch (error) {}
    },
  },
  mutations: {
    SET_SHOP(state, shop) {
      state.currentShop = shop;
    },
    SET_SHOPS(state, shops) {
      state.shops = shops;
    },
  },
};

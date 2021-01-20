import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import orders from './modules/orders';
import cart from './modules/cart';
import shop from './modules/shop';
import product from './modules/product';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: auth,
    orders: orders,
    product: product,
    cart: cart,
    shop: shop,
  },
});

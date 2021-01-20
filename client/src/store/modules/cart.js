import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    cartId: null,
    cart: { products: [] },
  },
  getters: {
    products(state) {
      // Retorna un diccionario que tiene como claves productId y valor quantity

      const prodIds = state.cart.products.map((el) => [el.product.productId, el.quantity]); // [[1,2], [2,1]]

      const products = {};
      prodIds.forEach((el) => {
        if (products[el[0]]) {
          products[el[0]] += el[1];
        } else {
          products[el[0]] = el[1];
        }
      });
      //console.log('PRODUCTS:', products);
      return products;
    },
  },
  actions: {
    async deleteCart({ commit, state }) {
      try {
        Vue.$http.delete(`cart/${localStorage.getItem('cartId')}`);
      } catch (error) {}
      localStorage.removeItem('cartId');
      commit('DELETE_CART');
      commit('DELETE_CART_ID');
    },
    async getOrCreateCart({ commit, dispatch, state, rootState, getters }) {
      const cart = {
        userId: rootState.auth.currentUser.id,
        shopId: rootState.shop.currentShop.id, //TODO: HAY ERROR; APARECE UNDEFINED, VER PORQUE // SOLO SI SE ACTUALIZA DESDE SHOP
      };

      const currentLocalStorageId = localStorage.getItem('cartId');

      if (currentLocalStorageId) {
        if (currentLocalStorageId === state.cartId) return;

        try {
          // GET CART
          const response = await Vue.prototype.$http.get(`cart/${currentLocalStorageId * 1}`);
          if (rootState.auth.currentUser.id !== response.data.data.data.userId) {
            throw Error('El usuario no coincide con el carro!');
          } else if (rootState.shop.currentShop.id !== response.data.data.data.shopId) {
            throw Error('La tienda no coincide con el carro!');
          }

          commit('SET_CART_ID', response.data.data.data);
          commit('SET_CART', response.data.data.data);
        } catch (error) {
          console.log(error.response);
          await dispatch('deleteCart');
          dispatch('getOrCreateCart');
        }
      }

      if (!state.cartId) {
        // CREATE CART
        try {
          const response = await Vue.prototype.$http.post('cart', cart);
          localStorage.setItem('cartId', response.data.data.id);
          commit('SET_CART_ID', response.data.data);
          commit('SET_CART', response.data.data);
        } catch (error) {
          console.log(error.response);
        }
      }

      if (state.cart.validTo > new Date().toISOString()) {
        // DELETE OLD CART
        try {
          dispatch('deleteCart');
          const response = await Vue.prototype.$http.post('cart', cart);
          localStorage.setItem('cartId', response.data.data.data.id);
          commit('SET_CART_ID', response.data.data.data);
          commit('SET_CART', response.data.data.data);
          Vue.prototype.$toast.error('Se reseteo tu carro! era muy antiguo.');
        } catch (error) {}
      }
    },

    async addOrUpdateProductToCart({ commit, state }, payload) {
      // payload = variant & quantity

      let cartProduct = null;
      try {
        cartProduct = state.cart.products.filter(
          (vari) => vari.productVariantId === payload.variant.id
        )[0];
      } catch (error) {}

      //console.log('Producto encontrado', cartProduct);

      if (cartProduct) {
        // Actualizar
        if (payload.quantity > 0) {
          try {
            const res = await Vue.prototype.$http.patch(
              `cart/${state.cartId}/product/${cartProduct.id}/`,
              {
                quantity: payload.quantity,
              }
            );

            commit('UPDATE_PRODUCT', res.data.data.data);
            return res.data.data.data;
          } catch (error) {}
        } else {
          // Borrar

          try {
            const res = await Vue.prototype.$http.delete(
              `cart/${state.cartId}/product/${cartProduct.id}`
            );
            commit('REMOVE_PRODUCT', payload.variant);
            return { quantity: 0 };
          } catch (error) {}
        }
      } else {
        // Crear
        const res = await Vue.prototype.$http.post(`cart/${state.cartId}/product/`, {
          productVariantId: payload.variant.id,
          quantity: payload.quantity,
        });
        console.log(res.data.data);
        commit('ADD_PRODUCT', res.data.data);
        return res.data.data;
      }
    },

    async addOrUpdateProductToCartInCartPage({ commit, state }, payload) {
      // payload = {cartProductId, quantity}

      // Actualizar
      if (payload.quantity > 0) {
        try {
          const res = await Vue.prototype.$http.patch(
            `cart/${state.cartId}/product/${payload.cartProductId}/`,
            {
              quantity: payload.quantity,
            }
          );

          commit('UPDATE_PRODUCT_IN_CART_PAGE', payload);
          return res.data.data.data;
        } catch (error) {}
      } else {
        // Borrar
        try {
          const res = await Vue.prototype.$http.delete(
            `cart/${state.cartId}/product/${payload.cartProductId}`
          );
          commit('REMOVE_PRODUCT_IN_CART_PAGE', payload);
          return { quantity: 0 };
        } catch (error) {}
      }
    },
  },
  mutations: {
    SET_CART_ID(state, cart) {
      state.cartId = cart.id;
    },
    DELETE_CART_ID(state) {
      state.cartId = null;
    },
    SET_CART(state, cart) {
      state.cart = cart;
    },
    DELETE_CART(state) {
      state.cart = { products: [] };
    },
    UPDATE_PRODUCT(state, payload) {
      Object.assign(state.cart.products.filter((prod) => prod.id === payload.id)[0], payload);
    },
    ADD_PRODUCT(state, payload) {
      //console.log(state.cart);
      state.cart.products.push(payload);
    },
    REMOVE_PRODUCT(state, variant) {
      state.cart.products = state.cart.products.filter(
        (prod) => prod.productVariantId !== variant.id
      );
    },
    // Usados solo en la pagina Cart!
    UPDATE_PRODUCT_IN_CART_PAGE(state, payload) {
      Object.assign(state.cart.products.filter((prod) => prod.id === payload.cartProductId)[0], {
        quantity: payload.quantity,
      });
    },
    REMOVE_PRODUCT_IN_CART_PAGE(state, payload) {
      state.cart.products = state.cart.products.filter((prod) => prod.id !== payload.cartProductId);
    },
  },
};

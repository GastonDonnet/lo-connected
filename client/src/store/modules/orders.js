import Vue from 'vue';
import router from '@/router';
import { catchAsync } from '@/utils';

export default {
  namespaced: true,
  state: {
    orders: [],
    order: {},
    newOrder: {},
    orderState: [
      {
        id: 1,
        name: 'Generada',
        description: 'Order realizada, aun no atendida',
      },
      {
        id: 2,
        name: 'En Preparación',
        description: 'Order aceptada, en preparación',
      },
      {
        id: 3,
        name: 'Esperando Envió',
        description: 'Order ya preparada, esperando asignación de envió',
      },
      {
        id: 4,
        name: 'En Envió',
        description: 'Orden asignada a envió, en camino al cliente',
      },
      {
        id: 5,
        name: 'Cerrada',
        description: 'Orden entregada a cliente y aceptada',
      },
      {
        id: 100,
        name: 'Cancelada',
        description: 'Orden cancelada',
      },
      {
        id: 101,
        name: 'Rechazada por vendedor',
        description: 'Order rechazada por el vendedor',
      },
      {
        id: 102,
        name: 'Rechazada por cliente',
        description: 'Orden enviada a cliente y rechazada',
      },
    ],
    orderStatus: [
      {
        id: 1,
        name: 'En espera',
      },
      {
        id: 2,
        name: 'Procesando',
      },
      {
        id: 3,
        name: 'Suspendida',
      },
      {
        id: 4,
        name: 'Terminada',
      },
      {
        id: 5,
        name: 'Error',
      },
    ],
    orderProductState: [
      {
        id: 1,
        name: 'No Preparado',
        description: 'Producto no preparado',
      },
      {
        id: 2,
        name: 'En Preparación',
        description: 'Producto siendo preparado',
      },
      {
        id: 3,
        name: 'Preparado',
        description: 'Producto preparado',
      },
      {
        id: 101,
        name: 'Fuera de stock',
        description: 'Producto fuera de stock',
      },
      {
        id: 102,
        name: 'Producto rechazado',
        description: 'Producto rechazado por razones no especificadas.',
      },
    ],
  },
  getters: {
    inProgressOrders(state) {
      return state.orders.filter((ord) => ord.statusId <= 3); //TODO:
    },
    finishedOrders(state) {
      return state.orders.filter((ord) => ord.statusId > 3); //TODO:
    },
  },
  actions: {
    async getOrders({ commit, rootState }) {
      try {
        const response = await Vue.prototype.$http.get(
          `order/?userId=${rootState.auth.currentUser.id}`
        );
        //console.log(response);
        commit('SET_ORDERS', response.data.data.data);
      } catch (error) {}
    },
    async getOrder({ commit, state }, orderId) {
      try {
        const response = await Vue.prototype.$http.get(`order/${orderId}`);

        commit('SET_ORDER', response.data.data.data);
      } catch (error) {}
    },
    updateNewOrderData({ commit, state, rootState }, orderData) {
      orderData.userId = rootState.auth.currentUser.id;
      orderData.shopId = rootState.shop.currentShop.id;
      commit('UPDATE_NEW_ORDER', orderData);
    },
    async createOrder({ commit, state, rootState }) {
      try {
        commit('UPDATE_NEW_ORDER', { cart: rootState.cart.cart });
        const response = await Vue.prototype.$http.post('order/', state.newOrder);
        commit('cart/DELETE_CART', null, { root: true });
        return response.data.data;
      } catch (error) {
        console.log(error.response);
      }
    },
  },
  mutations: {
    SET_ORDERS(state, orders) {
      state.orders = orders;
    },
    SET_ORDER(state, order) {
      state.order = order;
    },
    UPDATE_NEW_ORDER(state, orderData) {
      Object.assign(state.newOrder, orderData);
    },
  },
};

// const orders = [
//   {
//     token: '4a0s9fsa09soah0g920920',
//     state: {
//       name: 'En Envio',
//       description: 'Orden asignada a envio, en camino al cliente',
//     },
//     status: {
//       name: 'Procesando',
//       id: 2, //TODO:
//     },
//     user: {},
//     shop: {}, //TODO:
//     total: 558.0,
//     transaction: [
//       {
//         name: 'Generada',
//         validFrom: '20/04/2020 11:46:21',
//       },
//       {
//         name: 'En Preparacion',
//         validFrom: '20/04/2020 12:00:42',
//       },
//     ],
//     orderProducts: [
//       {
//         token: 'fsaopf215jspaofsa',
//         subtotal: 500.0,
//         variant: {
//           sku: 'ZAAB3',
//           name: 'Zapatillas Adidas All-Black',
//           price: 500,
//           quantity: 1,
//           atributes: [
//             {
//               name: 'Talle',
//               value: 'XL',
//             },
//             {
//               name: 'Color',
//               value: 'Negro',
//             },
//           ],
//         },
//       },
//       {
//         token: 'fsaopfasrgsagjspaofsa',
//         subtotal: 58.0,
//         variant: {
//           sku: 'BD5',
//           name: 'Bizcochos Criollitos',
//           price: 58,
//           quantity: 1,
//           atributes: [
//             {
//               name: 'Gramos',
//               value: '500g',
//             },
//           ],
//           product: {
//             shop: {}, //TODO:
//             name: 'Bizcochos',
//             model: 'Dulces',
//             price: 480,
//           },
//         },
//       },
//     ],
//   },
// ];

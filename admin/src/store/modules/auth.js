import Vue from 'vue';
import router from '@/router';

export default {
  namespaced: true,
  state: {
    loggedIn: localStorage.getItem('loggedIn') || '0',
    currentUser: {
      address: {},
      employees: [
        {
          role: {
            permissions: [],
          },
          shop: {},
        },
      ],
    },
    activeEmployee: {},
  },
  getters: {
    isAdmin(state) {},
    loggedIn(state) {
      return !!(state.loggedIn * 1);
    },
    permissions(state) {
      return state.activeEmployee.role.permissions.map((el) => el.permission);
    },
    hasPermission(state, permission) {
      return state.activeEmployee.role.permissions.map((el) => el.permission).includes(permission);
    },
    currentShop(state) {
      return state.activeEmployee.shop;
    },
  },
  actions: {
    async register({ commit, dispatch }, authData) {
      try {
        const response = await Vue.prototype.$http.post('auth/signup', authData);
        localStorage.setItem('jwt', response.data.token);
        Vue.prototype.$toast('Registrado correctamente!', { color: 'success' });
        await dispatch('login');
        Vue.prototype.$router.push({ name: 'Index' });
      } catch (error) {
        console.log(error.response);
        Vue.prototype.$toast('Ocurrio un error!', { color: 'error' });
      }
    },
    async loginWithPassword({ commit, dispatch }, authData) {
      try {
        const response = await Vue.prototype.$http.post('auth/signin', authData);
        localStorage.setItem('jwt', response.data.token);
        await dispatch('login');
        Vue.prototype.$toast('Logueado correctamente!', { color: 'success' });
      } catch (error) {
        if (error.response.status === 500) {
          console.log(error.response);
          Vue.prototype.$toast('Ocurrio un error!', { color: 'error' });
        } else {
          Vue.prototype.$toast(error.response.data.message, { color: 'error' });
        }
      }
    },
    async login({ commit, dispatch, state }) {
      const token = Vue.$cookies.get('jwt');
      if (token) {
        localStorage.setItem('loggedIn', 1);
        // await dispatch('getUser');
        commit('LOGIN');
        Vue.prototype.$toast('Logueado correctamente!', { color: 'success' });
      } else {
        console.log(error.response);
        Vue.prototype.$toast('Ocurrio un error!', { color: 'error' });
      }
    },
    async logout({ commit }) {
      try {
        await Vue.prototype.$http.get('auth/logout');
        localStorage.setItem('loggedIn', 0);
        localStorage.setItem('activeEmployee', '');
        commit('LOGOUT');
        commit('SET_USER', {});
        commit('SET_EMPLOYEE', {});
        Vue.prototype.$toast('Saliste del sistema!', { color: 'success' });
      } catch (error) {
        console.log(error.response);
        Vue.prototype.$toast('Ocurrio un error!', { color: 'error' });
      }
    },
    async getUser({ commit, state }) {
      const activeEmployee = localStorage.getItem('activeEmployee') * 1;
      const loggedIn = localStorage.getItem('loggedIn') * 1;

      if (!loggedIn) return;

      try {
        const response = await Vue.prototype.$http.get(
          'users/me?graph=[employees.[shop,role.permissions],address.city.province]'
        );
        commit('SET_USER', response.data.data.data);

        if (activeEmployee) {
          commit(
            'SET_EMPLOYEE',
            state.currentUser.employees.find((el) => el.shopId === activeEmployee)
          );
        }
      } catch (error) {
        console.log(error.response);
        localStorage.setItem('loggedIn', 0);
        localStorage.setItem('activeEmployee', '');
        commit('LOGOUT');
        commit('SET_USER', {});
        commit('SET_EMPLOYEE', {});
        Vue.prototype.$toast('No estas logueado, logueate nuevamente!', { color: 'error' });
        router.push({ name: 'Login' });
      }
    },
    setActiveEmployee({ commit, state }, selectedEmployee) {
      localStorage.setItem('activeEmployee', selectedEmployee.shopId);
      commit('SET_EMPLOYEE', selectedEmployee);
    },
    updateCurrentShop({ commit }, updatedShop) {
      commit('SET_SHOP', updatedShop);
    },
  },
  mutations: {
    LOGIN(state) {
      state.loggedIn = 1;
    },
    LOGOUT(state) {
      state.loggedIn = 0;
    },
    SET_USER(state, userData) {
      state.currentUser = userData;
    },
    SET_EMPLOYEE(state, selectedEmployee) {
      state.activeEmployee = selectedEmployee;
    },
    SET_SHOP(state, shopData) {
      state.activeEmployee.shop = shopData;
    },
  },
};

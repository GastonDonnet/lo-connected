import Vue from 'vue';
import router from '@/router';

export default {
  namespaced: true,
  state: {
    loggedIn: localStorage.getItem('loggedIn') || '0',
    currentUser: {},
  },
  getters: {
    isAdmin(state) {},
    loggedIn(state) {
      return !!(state.loggedIn * 1);
    },
    currentUserId() {
      return this.currentUser.id;
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
        console.log(response);
        localStorage.setItem('loggedIn', 1);
        localStorage.setItem('jwt', response.data.token);
        await dispatch('login');
      } catch (error) {
        if (error.status === 500) {
          console.log(error.response);
          Vue.prototype.$toast('Ocurrio un error!', { color: 'error' });
        } else {
          Vue.prototype.$toast(error.response.data.message, { color: 'error' });
        }
      }
    },
    async login({ commit, dispatch }) {
      console.log('login');
      const token = Vue.$cookies.get('jwt') ?? localStorage.getItem('jwt');
      if (token) {
        localStorage.setItem('loggedIn', 1);
        await dispatch('getUser');
        commit('LOGIN');
        Vue.prototype.$toast('Logueado correctamente!', { color: 'success' });
      } else {
        Vue.prototype.$toast('Ocurrio un error!', { color: 'error' });
      }
    },
    async logout({ commit }) {
      try {
        await Vue.prototype.$http.get('auth/logout');
        localStorage.removeItem('jwt');
        localStorage.removeItem('loggedIn');
        commit('LOGOUT');
        commit('SET_USER', {});
        Vue.prototype.$toast('Saliste del sistema!', { color: 'success' });
      } catch (error) {
        console.log(error.response);
        Vue.prototype.$toast('Ocurrio un error!', { color: 'error' });
      }
    },
    async getUser({ commit, state }) {
      console.log('getUser');
      const loggedIn = localStorage.getItem('loggedIn') * 1;
      if (!loggedIn) return;

      try {
        const response = await Vue.prototype.$http.get('users/me');
        commit('SET_USER', response.data.data.data);
      } catch (error) {
        localStorage.removeItem('jwt');
        localStorage.removeItem('loggedIn');
        commit('LOGOUT');
        commit('SET_USER', {});
        Vue.prototype.$toast('No estas logueado, logueate nuevamente!', { color: 'error' });
        router.push({ name: 'Login' });
      }
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
      //console.log('MUTATION');
      state.currentUser = userData;
    },
  },
};

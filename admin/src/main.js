import Vue from 'vue';
import axios from 'axios';
import VueCookies from 'vue-cookies';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.use(VueCookies);

const apiUrl = process.env.VUE_APP_API_URL;

Vue.prototype.$staticUrl = apiUrl;
Vue.prototype.$apiUrl = `${apiUrl}api/v1/`;

const getJwt = () => {
  console.log('gettingJwt');
  console.log('cookies', Vue.$cookies.get('jwt')?.slice(0, 5));
  console.log('local', localStorage.getItem('jwt')?.slice(0, 5));
  return Vue.$cookies.get('jwt') ?? localStorage.getItem('jwt');
};

Vue.prototype.$http = axios.create({
  withCredentials: true,
  baseURL: Vue.prototype.$apiUrl,
});

Vue.prototype.$http.interceptors.request.use(function (config) {
  const token = getJwt();
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');

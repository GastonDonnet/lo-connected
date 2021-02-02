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
  return Vue.$cookies.get('jwt') ?? localStorage.getItem('jwt');
};

Vue.prototype.$http = axios.create({
  withCredentials: true,
  baseURL: Vue.prototype.$apiUrl,
});

Vue.prototype.$http.interceptors.request.use(function (req) {
  const token = getJwt();
  req.headers.Authorization = `Bearer ${token}`;

  console.log(`${req.method} ${req.url}`);

  return req;
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');

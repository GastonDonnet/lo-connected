import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

import Default from '../layouts/Default.vue';
import Blank from '../layouts/Blank.vue';

Vue.use(VueRouter);

function prefixRoutes(prefix, routes) {
  return routes.map((route) => {
    route.path = `${prefix}${route.path}`;
    return route;
  });
}

const routes = [
  {
    path: '',
    component: Default,
    children: [
      {
        path: '/',
        name: 'Index',
        component: () => import('../views/Index.vue'),
        meta: { name: 'LoConnected' },
      },
      {
        path: '/pedidos',
        name: 'Pedidos',
        component: () => import('../views/pedidos/Pedidos.vue'),
        meta: { name: 'Pedidos' },
      },
      {
        path: '/pedidos/:id',
        name: 'Pedido Detalle',
        component: () => import('../views/pedidos/Detalle.vue'),
        meta: { name: 'Detalle de Pedido' },
      },
      {
        path: '/user/perfil',
        name: 'Perfil',
        component: () => import('../views/user/Profile.vue'),
        meta: { name: 'Mi Perfil' },
      },

      ...prefixRoutes('/shop/:shopId', [
        {
          path: '/',
          name: 'Shop',
          component: () => import('../views/shop/Shop.vue'),
          meta: { name: 'Shop' },
        },
        {
          path: '/category/:categoryId',
          name: 'Shop Products',
          component: () => import('../views/shop/ShopProductList.vue'),
          meta: { name: 'Shop - Productos' },
        },
        {
          path: '/cart',
          name: 'Cart',
          component: () => import('../views/shop/Cart.vue'),
          meta: { name: 'Carro de compras' },
        },
      ]),

      {
        path: '/shops',
        name: 'Shops',
        component: () => import('../views/shops/AllShops.vue'),
        meta: { name: 'Shops' },
      },
      {
        path: '/category/:id',
        name: 'Shops Category',
        component: () => import('../views/shops/Category.vue'),
        meta: { name: 'Categoria' },
      },

      /*       {
        path: 'shop/:shopId',
        name: 'Shop',
        component: () => import('../views/shop/Shop.vue'),
        children: [{
          path: 'category/:categoryId',
          name: 'Shop Products',
          component: () => import('../views/shop/Shop.vue'),
        },],
      }, */
    ],
  },
  {
    path: '/auth',
    component: Blank,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('../views/auth/Login.vue'),
        beforeEnter(to, from, next) {
          if (store.getters['auth/loggedIn']) next({ name: 'Index' });
          next();
        },
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('../views/auth/Register.vue'),
        beforeEnter(to, from, next) {
          if (store.getters['auth/loggedIn']) next({ name: 'Index' });
          next();
        },
      },
      {
        path: 'logout',
        name: 'Logout',
        component: () => import('../views/auth/Logout.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

const unprotectedRoutes = ['Login', 'Register'];
router.beforeEach((to, from, next) => {
  if (unprotectedRoutes.includes(to.name) || store.getters['auth/loggedIn']) {
    next();
  } else {
    next({ name: 'Login' });
  }
});

export default router;

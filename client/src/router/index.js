import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

import Default from '../layouts/Default.vue';
import Blank from '../layouts/Blank.vue';
import Index from '../views/Index.vue';
import Login from '../views/auth/Login.vue';

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
        component: Index,
        meta: { name: 'LoConnected' },
      },
      {
        path: '/pedidos',
        name: 'Pedidos',
        component: () => import(/* webpackChunkName: "Pedidos" */ '../views/pedidos/Pedidos.vue'),
        meta: { name: 'Pedidos' },
      },
      {
        path: '/pedidos/:id',
        name: 'Pedido Detalle',
        component: () =>
          import(/* webpackChunkName: "PedidosDetalle" */ '../views/pedidos/Detalle.vue'),
        meta: { name: 'Detalle de Pedido' },
      },
      {
        path: '/user/perfil',
        name: 'Perfil',
        component: () => import(/* webpackChunkName: "Perfil" */ '../views/user/Profile.vue'),
        meta: { name: 'Mi Perfil' },
      },

      ...prefixRoutes('/shop/:shopId', [
        {
          path: '/',
          name: 'Shop',
          component: () => import(/* webpackChunkName: "Shop" */ '../views/shop/Shop.vue'),
          meta: { name: 'Shop' },
        },
        {
          path: '/category/:categoryId',
          name: 'Shop Products',
          component: () =>
            import(/* webpackChunkName: "ShopCategories" */ '../views/shop/ShopProductList.vue'),
          meta: { name: 'Shop - Productos' },
        },
        {
          path: '/cart',
          name: 'Cart',
          component: () => import(/* webpackChunkName: "Cart" */ '../views/shop/Cart.vue'),
          meta: { name: 'Carro de compras' },
        },
      ]),

      {
        path: '/shops',
        name: 'Shops',
        component: () => import(/* webpackChunkName: "Shops" */ '../views/shops/AllShops.vue'),
        meta: { name: 'Shops' },
      },
      {
        path: '/category/:id',
        name: 'Shops Category',
        component: () =>
          import(/* webpackChunkName: "ShopsCategory" */ '../views/shops/Category.vue'),
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
        component: Login,
        beforeEnter(to, from, next) {
          if (store.getters['auth/loggedIn']) next({ name: 'Index' });
          next();
        },
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "Register" */ '../views/auth/Register.vue'),
        beforeEnter(to, from, next) {
          if (store.getters['auth/loggedIn']) next({ name: 'Index' });
          next();
        },
      },
      {
        path: 'logout',
        name: 'Logout',
        component: () => import(/* webpackChunkName: "Logout" */ '../views/auth/Logout.vue'),
      },
    ],
  },
  { path: '*', component: Index },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

const unprotectedRoutes = [
  'Login',
  'Register',
  'Index',
  'Shop',
  'Shop Products',
  'Shops',
  'Shops Category',
];

router.beforeEach(async (to, from, next) => {
  // Si esta logueado, que pida el usuario
  if (store.getters['auth/loggedIn']) {
    const { currentUser } = store.state.auth;
    if (!currentUser.id) {
      await store.dispatch('auth/getUser');
    }
  }

  if (unprotectedRoutes.includes(to.name) | store.getters['auth/loggedIn']) {
    next();
  } else {
    store.dispatch('auth/setLoginRedirect', to);
    next({ name: 'Login' });
  }
});

export default router;

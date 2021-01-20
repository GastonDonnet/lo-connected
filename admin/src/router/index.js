import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

import Default from '../layouts/Default.vue';
import Blank from '../layouts/Blank.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    component: Default,
    children: [
      {
        path: '/',
        name: 'Index',
        component: () => import('../views/Index.vue'),
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue'),
        meta: { name: 'Dashboard', permission: 'getShopDashboard' },
      },
      {
        path: '/products',
        name: 'Products',
        component: () => import('../views/Products.vue'),
        meta: { name: 'Productos', permission: 'getProduct' },
      },
      {
        path: '/master-products',
        name: 'MasterProducts',
        component: () => import('../views/MasterProducts.vue'),
        meta: { name: 'Productos Maestros' },
      },
      {
        path: '/sales',
        name: 'Sales',
        component: () => import('../views/Sales.vue'),
        meta: { name: 'Ventas', permission: 'getOrder' },
      },
      {
        path: '/options',
        name: 'Options',
        component: () => import('../views/Options.vue'),
        meta: { name: 'Opciones', permission: 'updateShop' },
      },
      {
        path: '/employees',
        name: 'Employees',
        component: () => import('../views/Employees.vue'),
        meta: { name: 'Empleados', permission: 'getEmployee' },
      },
      {
        path: '/roles',
        name: 'Roles',
        component: () => import('../views/Roles.vue'),
        meta: { name: 'Roles', permission: 'updateRole' },
      },
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

// Proteccion Login
const unprotectedRoutes = ['Login', 'Register'];
router.beforeEach((to, from, next) => {
  if (unprotectedRoutes.includes(to.name) || store.getters['auth/loggedIn']) {
    next();
  } else {
    next({ name: 'Login' });
  }
});

//Proteccion Permisos
const hasPermission = async (permission) => {
  //TODO: FUE HECHO PORQUE AVESES NO ACTUALIZA EL GETTER
  await store.dispatch('auth/getUser');

  return (
    (store.getters['auth/permissions'].includes(permission) ||
      store.getters['auth/permissions'].includes('totalAccess')) &&
    store.state.auth.activeEmployee.active
  );
};

router.beforeEach(async (to, from, next) => {
  if (!to.meta.permission || (await hasPermission(to.meta.permission))) next();
  else Vue.prototype.$toast.error('No tienes permisos');
});

export default router;

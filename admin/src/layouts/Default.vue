<template>
  <v-app>
    <NavDrawer></NavDrawer>

    <Navbar></Navbar>

    <v-main>
      <router-view></router-view>
    </v-main>
    <!-- <BottomNav></BottomNav> -->
    <Footer></Footer>
  </v-app>
</template>

<script>
import store from '@/store';

export default {
  name: 'Default',
  components: {
    Navbar: () => import('../components/layout/Navbar'),
    //BottomNav: () => import('./components/layout/BottomNav'),
    Footer: () => import('../components/layout/Footer'),
    NavDrawer: () => import('../components/layout/NavDrawer'),
  },
  async beforeRouteEnter(to, from, next) {
    const { currentUser } = store.state.auth;
    console.log(!currentUser.id);
    if (!currentUser.id) {
      await store.dispatch('auth/getUser').then(next);
    }
    next();
  },
};
</script>

<style>
</style>

<template>
  <v-app>
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
  },

  async beforeRouteEnter(to, from, next) {
    //console.log(store);
    const { currentUser } = store.state.auth;
    if (!currentUser.id) {
      await store.dispatch('auth/getUser').then(next);
    }
    next();
  },
};
</script>

<style>
</style>

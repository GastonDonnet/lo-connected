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

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import NavDrawer from '../components/layout/NavDrawer';

export default {
  name: 'Default',
  components: {
    Navbar,
    Footer,
    NavDrawer,
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

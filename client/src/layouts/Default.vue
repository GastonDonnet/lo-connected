<template>
  <v-app>
    <Navbar></Navbar>
    <v-main>
      <router-view></router-view>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import store from '@/store';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default {
  name: 'Default',
  components: {
    Navbar,
    Footer,
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

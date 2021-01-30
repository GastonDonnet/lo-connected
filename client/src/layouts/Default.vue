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
};
</script>

<style>
</style>

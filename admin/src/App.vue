<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',
};
</script>

<style lang="scss">
@import url('./assets/scss/main.scss');
</style>

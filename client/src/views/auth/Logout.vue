<template>
  <div></div>
</template>

<script>
import { mapActions } from 'vuex';

  export default {
    name:"Logout",
    methods: {
        ...mapActions("auth", ["logout"])
    },

    async mounted() {
      await this.logout()
      this.$router.push({ name: 'Login' });
    },
  }

</script>

<style>
</style>

<template>
  <v-footer padless>
    <v-row justify="center" no-gutters>
      <v-col
        class="accent py-1 text-center white--text"
        cols="12"
        @click="$router.push({name: 'Index'})"
      >
        {{ new Date().getFullYear() }} —
        <strong>LoConnected</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {

}
</script>

<style>
</style>
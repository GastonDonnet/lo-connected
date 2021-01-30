<template>
  <v-app-bar app dense flat>
    <v-icon @click="$router.go(-1)" v-if="$route.meta.name != 'LoConnected'"
      >mdi-arrow-left</v-icon
    >
    <v-toolbar-title>{{ $route.meta.name || 'LoConnected' }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <div class="text-center">
      <!--User -->
      <v-menu
        open-on-hover
        close-on-click
        close-on-content-click
        offset-y
        transition="slide-y-transition"
        flat
      >
        <template v-slot:activator="{ on }">
          <v-btn v-if="$vuetify.breakpoint.xs" icon tile v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
          <v-btn v-else text tile v-on="on" style="color: rgba(0, 0, 0, 0.54)">
            <span class="hidden-xs-only">{{ currentUser.displayName }}</span>
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="$router.push({ name: 'Index' })">
            <v-list-item-title>Perfil</v-list-item-title>
          </v-list-item>
          <v-list-item @click="$router.push({ name: 'Logout' })">
            <v-list-item-title>Salir</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  data() {
    return {
      on: false,
    };
  },
  computed: {
    ...mapState('auth', ['currentUser']),
  },
  methods: {},
};
</script>

<style>
/* .user-menu {
  position: relative;
  top: 30px;

  border-radius: 500px;
  background-color: rgba(255, 255, 255, 0.747);
} */
</style>

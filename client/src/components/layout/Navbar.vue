<template>
  <v-app-bar app dense flat>
    <v-icon @click="$router.go(-1)" v-if="$route.meta.name != 'LoConnected'"
      >mdi-arrow-left</v-icon
    >
    <v-toolbar-title style="cursor: pointer">{{
      $route.meta.name || 'LoConnected'
    }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <div class="text-center" v-if="loggedIn">
      <!--Cart -->
      <v-badge
        overlap
        bottom
        :content="cart.products ? String(cart.products.length) : '0'"
        v-if="$route.meta.name.startsWith('Shop')"
      >
        <v-btn
          icon
          tile
          v-on="on"
          @click="
            $router.push({ name: 'Cart', params: { shopId: currentShop.id } })
          "
        >
          <v-icon>mdi-cart</v-icon>
        </v-btn>
      </v-badge>

      <div v-else-if="$route.meta.name.startsWith('Carro')"></div>

      <!--Pedidos -->
      <v-badge v-else overlap bottom :content="inProgressOrders.length || '0'">
        <v-btn icon tile v-on="on" @click="$router.push({ name: 'Pedidos' })">
          <v-icon>mdi-order-bool-ascending-variant</v-icon>
        </v-btn>
      </v-badge>

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
          <v-list-item @click="$router.push({ name: 'Perfil' })">
            <v-list-item-title>Perfil</v-list-item-title>
          </v-list-item>
          <v-list-item @click="$router.push({ name: 'Logout' })">
            <v-list-item-title>Salir</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <div v-else class="text-center">
      <v-btn text @click="$router.push({ name: 'Login' })">Loguearse</v-btn>
      <v-btn text @click="$router.push({ name: 'Register' })"
        >Registrarse</v-btn
      >
    </div>
  </v-app-bar>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      on: false,
    };
  },
  computed: {
    ...mapState('shop', ['currentShop']),
    ...mapState('cart', ['cart']),
    ...mapState('orders', ['orders']),
    ...mapState('auth', ['currentUser']),
    ...mapGetters('orders', ['inProgressOrders']),
    ...mapGetters('auth', ['loggedIn']),
  },
  methods: {
    ...mapActions('orders', ['getOrders']),
  },
  async created() {
    if (!this.orders.length && this.loggedIn) await this.getOrders();
  },
};
</script>

<style scoped>
.v-toolbar--flat {
  box-shadow: 0 -10px 17px 0px rgb(115, 72, 14);
}
/* .user-menu {
  position: relative;
  top: 30px;

  border-radius: 500px;
  background-color: rgba(255, 255, 255, 0.747);
} */
</style>

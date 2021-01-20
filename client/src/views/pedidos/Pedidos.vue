<template>
  <v-container fluid class="m-0 px-0 py-0">
    <v-tabs background-color="accent" dark centered grow>
      <v-tabs-slider></v-tabs-slider>

      <v-tab v-for="i in tabs" :key="i" :href="`#tab-${i}`">{{ i }}</v-tab>

      <v-tab-item :value="'tab-' + tabs[0]">
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              v-for="(order, i) in inProgressOrders"
              :key="i"
            >
              <Pedido :order="order"></Pedido>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
      <v-tab-item :value="'tab-' + tabs[1]">
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              v-for="(order, i) in finishedOrders"
              :key="i"
            >
              <Pedido :order="order"></Pedido>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  name: 'Pedidos',
  components: {
    Pedido: () => import('@/components/pedidos/Pedido.vue'),
  },
  data() {
    return {
      ...mapState('orders', ['orders']),
      tabs: ['Pendientes', 'Confirmados'],
    };
  },
  computed: {
    ...mapGetters('orders', ['inProgressOrders', 'finishedOrders']),
  },
  methods: {
    ...mapActions('orders', ['getOrders']),
  },
  async created() {
    this.getOrders();
  },
};
</script>

<style lang="scss" scope>
</style>

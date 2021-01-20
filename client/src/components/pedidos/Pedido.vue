<template>
  <v-card class="pa-2">
    <v-card-text>
      <v-row no-gutters align="center" justify="center">
        <v-col cols="3" class="text-center">
          <v-avatar>
            <v-img
              height="100px"
              :src="staticUrl + 'img/shop/' + order.shop.imgLogo"
            ></v-img>
          </v-avatar>
        </v-col>
        <v-col cols="9">
          <v-row no-gutters>
            <v-col>
              <v-chip
                small
                color="success"
                class="float-right font-weight-light"
                >Abierto</v-chip
              >
              <p class="font-weight-medium mb-0" style="font-size: medium">
                {{ order.shop.name }}
              </p>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col>
              <small class="secondary--text text--darken-4">{{
                order.createdAt.split('T').join(' ').slice(0, 19)
              }}</small>
              <div v-if="order.paymentMethod === 'efectivo'" class="d-inline">
                <v-icon class="pl-4">mdi-cash</v-icon>
                <small class="secondary--text text--darken-4">Efectivo</small>
              </div>
              <div
                v-else-if="order.paymentMethod === 'tarjeta'"
                class="d-inline"
              >
                <v-icon class="pl-4">mdi-credit-card</v-icon>
                <small class="secondary--text text--darken-4">Tarjeta</small>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <div class="my-3">
        <v-row
          no-gutters
          align="center"
          v-for="i in Math.min(order.products.length, 3)"
          :key="i"
        >
          <v-col class="mx-3">{{
            `${order.products[i - 1].quantity} x ${
              order.products[i - 1].name
            }...`
          }}</v-col>
        </v-row>
      </div>

      <v-divider class="my-3"></v-divider>

      <v-row no-gutters align="center" justify="center">
        <v-col class="text-center">
          <p :class="stateClass(order.orderStateId)">{{ order.state.name }}</p>
          <v-progress-circular
            v-if="order.statusId <= 2"
            :value="(100 * order.orderStateId) / 5"
            color="primary"
            height="8"
          ></v-progress-circular>
        </v-col>
      </v-row>

      <v-divider class="my-3"></v-divider>

      <v-row no-gutters align="center" justify="center">
        <!-- <v-col v-if="order.statusId > 2">
          <v-btn text block>Repetir Pedido</v-btn>
        </v-col>-->
        <v-col v-if="order.statusId == 1">
          <v-btn text block color="error" @click="cancelOrderDialog = true"
            >Cancelar Pedido</v-btn
          >
        </v-col>
        <v-col>
          <v-btn
            text
            block
            @click="
              $router.push({
                name: 'Pedido Detalle',
                params: { id: `${order.id}` },
              })
            "
            >Detalle</v-btn
          >
        </v-col>
      </v-row>
    </v-card-text>

    <!-- Cancelar Orden -->
    <v-dialog persistent v-model="cancelOrderDialog" max-width="400px">
      <v-card>
        <v-card-title>Desea cancelar la orden?</v-card-title>
        <v-btn depressed tile @click="cancelOrderDialog = false">No</v-btn>
        <v-btn
          depressed
          tile
          color="error"
          class="float-right"
          @click="cancelOrder()"
          >Si</v-btn
        >
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      cancelOrderDialog: false,
    };
  },
  methods: {
    stateClass(stateId) {
      //console.log(stateId)
      if (stateId == 1) return 'primary--text text--lighten-1';
      if (stateId == 2) return 'accent--text';
      if (stateId == 3) return 'secondary--text text--darken-2';
      if (stateId == 4) return 'success--text text--lighten-1';
      if (stateId == 5) return 'success--text';
      return 'error--text';
    },
    cancelOrder() {
      this.$http
        .patch(`order/state/${this.order.id}`, {
          orderStateId: 100,
        })
        .then((res) => {
          (this.order.orderStateId = 100),
            (this.order.statusId = 5),
            (this.cancelOrderDialog = false);
        })
        .catch((err) => console.log(err.response));
    },
  },
  computed: {
    staticUrl() {
      return this.$staticUrl;
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  margin-bottom: 0px !important;
}
</style>
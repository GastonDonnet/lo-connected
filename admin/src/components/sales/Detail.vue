<template>
  <div v-if="!loading">
    <v-row no-gutters v-for="(op, i) in order.products" :key="i">
      <v-col>
        <v-row justify="center">
          <v-col cols="2">
            <p>{{ op.quantity }}x</p>
          </v-col>
          <v-col>
            <p class="font-weight-black">{{ op.name }}</p>
            <div style="font-size: 15px">
              <p style="font-size: 13px">SKU: {{ op.variant.sku }}</p>
              <div v-if="op.variant.atributes[0].value">
                <div v-for="(atr, i) in op.variant.atributes" :key="i">
                  <div v-if="atr">
                    <v-row no-gutters>
                      <v-col cols="4">
                        <span>{{ `${atr.type.name}: ` }}</span>
                        <span class="font-weight-light">{{ atr.value }}</span>
                      </v-col>
                      <v-col>
                        <p></p>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
          <v-col cols="2">
            <p class="error--text float-right">${{ op.subtotal }}</p>
            <p
              class="error--text float-right font-weight-light"
              style="font-size: 13px"
            >
              ({{ op.quantity }}x${{ op.price }})
            </p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-divider style="border-top-width: medium"></v-divider>

    <v-row>
      <v-col>
        <!--  <v-row no-gutters>
          <v-col>
            <p>Subtotal</p>
          </v-col>
          <v-col cols="2">
            <p class="error--text float-right">${{order.total}}</p>
          </v-col>
        </v-row>

        <v-row no-gutters class="font-weight-light">
          <v-col>
            <p>Descuento por cupon</p>
          </v-col>
          <v-col cols="2">
            <p class="success--text float-right">-$20</p>
          </v-col>
        </v-row>-->

        <v-row no-gutters class="font-weight-bold title">
          <v-col>
            <p class>TOTAL</p>
          </v-col>
          <v-col cols="2">
            <p class="error--text float-right">${{ order.total }}</p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-divider style="border-top-width: medium"></v-divider>
    <v-divider style="border-top-width: medium"></v-divider>
    <v-divider style="border-top-width: medium" class="mb-5"></v-divider>

    <v-row no-gutters v-if="order.delivery">
      <v-col>
        <v-row no-gutters>
          <v-col>
            <p class="font-weight-bold">Entrega a:</p>
          </v-col>
        </v-row>
        <v-row class="font-weight-light body-2">
          <v-col>
            <p>{{ `${order.user.displayName}` }}</p>
            <p>{{ order.clientAddress }}</p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row no-gutters v-else>
      <v-col>
        <v-row no-gutters>
          <v-col>
            <p class="font-weight-bold">Retiro en local:</p>
          </v-col>
        </v-row>
        <v-row class="font-weight-light body-2">
          <v-col>
            <p>{{ `${order.user.displayName}` }}</p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-divider class="my-2"></v-divider>
    <v-row no-gutters>
      <v-col>
        <v-row no-gutters>
          <v-col>
            <p class="font-weight-bold">Entregado por:</p>
          </v-col>
        </v-row>
        <v-row class="font-weight-light body-2">
          <v-col>
            <p>{{ currentShop.name }}</p>
            <p>{{ currentShop.address.street }}</p>
            <p>{{ currentShop.address.city.name }}</p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-divider class="my-2"></v-divider>
    <v-row no-gutters>
      <v-col>
        <v-timeline dense class="body-2">
          <v-timeline-item
            v-for="(transaction, i) in order.transactions"
            :key="i"
          >
            <span
              >{{
                orderState.filter((el) => el.id == transaction.orderStateId)[0]
                  .name
              }}:</span
            >
            <p class="font-weight-light">
              {{ transaction.validFrom.split('T').join(' ').substring(0, 19) }}
            </p>
            <p class="font-weight-light">
              {{ `${transaction.user.displayName}` }}
            </p>
          </v-timeline-item>
          <v-timeline-item>
            <span
              >{{
                orderState.filter((el) => el.id == order.state.id)[0].name
              }}:</span
            >
            <p class="font-weight-light">
              {{ order.lastStateUpdate.split('T').join(' ').substring(0, 19) }}
            </p>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>

    <v-divider class="my-2"></v-divider>

    <v-row no-gutters class="font-weight-light caption">
      <v-col>
        <p>ID Pedido: {{ order.token }}</p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  name: 'DetalleDePedido',
  props: {
    orderId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      order: {},
      orderState: [
        {
          id: 1,
          name: 'Generada',
          description: 'Order realizada, aun no atendida',
        },
        {
          id: 2,
          name: 'En Preparacion',
          description: 'Order aceptada, en preparacion',
        },
        {
          id: 3,
          name: 'Esperando Envio',
          description: 'Order ya preparada, esperando asignación de envio',
        },
        {
          id: 4,
          name: 'En Envio',
          description: 'Orden asignada a envio, en camino al cliente',
        },
        {
          id: 5,
          name: 'Cerrada',
          description: 'Orden entregada a cliente y aceptada',
        },
        {
          id: 100,
          name: 'Cancelada',
          description: 'Orden cancelada',
        },
        {
          id: 101,
          name: 'Rechazada por vendedor',
          description: 'Order rechazada por el vendedor',
        },
        {
          id: 102,
          name: 'Rechazada por cliente',
          description: 'Orden enviada a cliente y rechazada',
        },
      ],
      orderStatus: [
        {
          id: 1,
          name: 'En espera',
        },
        {
          id: 2,
          name: 'Procesando',
        },
        {
          id: 3,
          name: 'Suspendida',
        },
        {
          id: 4,
          name: 'Terminada',
        },
        {
          id: 5,
          name: 'Error',
        },
      ],
      orderProductState: [
        {
          id: 1,
          name: 'No Preparado',
          description: 'Producto no preparado',
        },
        {
          id: 2,
          name: 'En Preparacion',
          description: 'Producto siendo preparado',
        },
        {
          id: 3,
          name: 'Preparado',
          description: 'Producto preparado',
        },
        {
          id: 101,
          name: 'Fuera de stock',
          description: 'Producto fuera de stock',
        },
        {
          id: 102,
          name: 'Producto rechazado',
          description: 'Producto rechazado por razones no especificadas.',
        },
      ],
    };
  },
  computed: {
    ...mapGetters('auth', ['currentShop']),
  },
  methods: {
    getOrder() {
      this.$http
        .get(
          `order/${this.orderId}?graph=[state, transactions.user, products.[transactions, variant.atributes.type], user]`
        )
        .then((res) => {
          console.log('Fetched', res.data.data.data);
          this.order = res.data.data.data;
        })
        .finally(() => (this.loading = false));
    },
  },
  created() {
    this.loading = true;
    this.getOrder();
  },
  watch: {
    orderId() {
      this.getOrder();
    },
  },
  filters: {
    digits: function (value, digits = 2) {
      if (!value) return '';
      return value.toFixed(digits);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

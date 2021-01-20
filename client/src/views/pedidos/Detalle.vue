<template>
  <v-container
    :style="this.$vuetify.breakpoint.lgAndUp ? 'max-width: 900px' : ''"
  >
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
              <div v-if="op.variant.atributes.length">
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
            <p>
              {{
                `${
                  order.userId == currentUser.id
                    ? currentUser.firstName + ' ' + currentUser.lastName
                    : 'ERROR'
                }`
              }}
            </p>
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
            <p>
              {{
                `${
                  order.userId == currentUser.id
                    ? currentUser.firstName + ' ' + currentUser.lastName
                    : 'ERROR'
                }`
              }}
            </p>
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
            <p>{{ order.shop.name }}</p>
            <p>{{ order.shop.address.street }}</p>
            <p>{{ order.shop.address.city.name }}</p>
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
            {{
              orderState.filter((el) => el.id == transaction.orderStateId)[0]
                .name
            }}:
            <p class="font-weight-light">
              {{ transaction.validFrom.split('T').join(' ').substring(0, 19) }}
            </p>
          </v-timeline-item>
          <v-timeline-item>
            {{ orderState.filter((el) => el.id == order.state.id)[0].name }}:
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
  </v-container>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import store from '@/store';

export default {
  name: 'DetalleDePedido',

  computed: {
    ...mapState('orders', ['order', 'orderState']),
    ...mapState('auth', ['currentUser']),
  },

  async beforeRouteEnter(to, from, next) {
    if (store.state.orders.order.atributes == undefined) {
      await store.dispatch('orders/getOrder', to.params.id);
    }
    return next();
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
p {
  margin-bottom: 0px !important;
}
</style>
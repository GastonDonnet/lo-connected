<template>
  <div>
    <div v-for="(cartProduct, i) in cart.products" :key="i">
      <v-row no-gutters>
        <v-col cols="2" class="pa-3">
          <p>{{ cartProduct.quantity }}x</p>
        </v-col>
        <v-col>
          <v-row justify="center">
            <v-col>
              <p class="font-weight-black">
                {{
                  `${cartProduct.product.product.name} ${
                    cartProduct.product.product.model
                      ? cartProduct.product.product.model
                      : ''
                  }`
                }}
              </p>
              <!--TODO: Ver por marca-->
              <div style="font-size: 15px">
                <p style="font-size: 13px">
                  SKU: {{ cartProduct.product.sku }}
                </p>

                <div v-if="cartProduct.product.product.hasAtributes">
                  <div
                    v-for="(atr, i) in cartProduct.product.atributes"
                    :key="i"
                  >
                    <div v-if="atr">
                      <span>{{ atr.type.name }}:</span>
                      <span class="font-weight-light mx-2">{{
                        atr.value
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </v-col>
            <v-col cols="4" class="d-flex align-end flex-column">
              <p class="error--text float-right">
                ${{
                  (cartProduct.quantity *
                    (cartProduct.product.price ||
                      cartProduct.product.product.price))
                    | digits
                }}
              </p>
              <p
                class="error--text float-right font-weight-light"
                style="font-size: 13px"
              >
                ({{ cartProduct.quantity | digits(0) }} x ${{
                  (cartProduct.product.price ||
                    cartProduct.product.product.price) | digits
                }})
              </p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-divider class="mt-2"></v-divider>
    </div>

    <v-divider></v-divider>
    <v-divider style="border-top-width: medium"></v-divider>

    <!--TOTAL-->
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
            <p class="error--text float-right">${{ total | digits }}</p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-divider class="mb-3"></v-divider>

    <!-- Entrega -->
    <v-row no-gutters>
      <v-col>
        <v-row no-gutters>
          <v-col>
            <p class="font-weight-bold">Entrega a:</p>
          </v-col>
        </v-row>
        <v-row class="font-weight-light body-2">
          <v-col v-if="newOrder.delivery">
            <p>{{ currentUser.displayName }}</p>
            <p>{{ newOrder.address.street }}</p>
            <p>{{ newOrder.address.city.name }}</p>
          </v-col>
          <v-col v-else>
            <p>{{ currentUser.displayName }}</p>
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
    <div class="my-2 text-center">
      <v-btn color="primary" depressed block @click="onSubmit()"
        >Confirmar compra</v-btn
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('cart', ['cart']),
    ...mapState('orders', ['newOrder']),
    ...mapState('auth', ['currentUser']),
    ...mapState('shop', ['currentShop']),
    total() {
      if (this.cart.products) {
        return this.cart.products.reduce((acummulator, cartProduct) => {
          return (
            acummulator +
            cartProduct.quantity *
              (cartProduct.product.price || cartProduct.product.product.price)
          );
        }, 0);
      }
    },
  },
  methods: {
    ...mapActions('orders', ['createOrder', 'getOrders']),
    ...mapActions('cart', ['deleteCart']),
    async onSubmit() {
      try {
        const newOrder = await this.createOrder();
        //console.log(newOrder)
        this.$toast.success('Orden creada!');
        this.deleteCart();
        this.getOrders();
        this.$router.replace({
          name: 'Pedido Detalle',
          params: { id: newOrder.id },
        });
      } catch (error) {}
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
<style>
</style>

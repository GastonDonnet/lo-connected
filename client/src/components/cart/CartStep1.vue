<template>
  <div>
    <div v-for="(cartProduct,i) in cart.products" :key="i">
      <v-row no-gutters>
        <v-col>
          <v-row justify="center">
            <v-col>
              <p
                class="font-weight-black"
              >{{`${cartProduct.product.product.name} ${cartProduct.product.product.model?cartProduct.product.product.model:''} ${cartProduct.product.product.brandId?cartProduct.product.product.brand.name:''}`}}</p>
              <!--TODO: Ver por marca-->
              <div style="font-size: 15px">
                <p style="font-size: 13px">SKU: {{cartProduct.product.sku}}</p>

                <div v-if="cartProduct.product.product.hasAtributes">
                  <div v-for="(atr,i) in cartProduct.product.atributes" :key="i">
                    <div v-if="atr">
                      <span>{{atr.type.name}}:</span>
                      <span class="font-weight-light mx-2">{{atr.value}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </v-col>
            <v-col cols="4" class="d-flex align-end flex-column">
              <p
                class="error--text float-right"
              >${{(cartProduct.quantity * (cartProduct.product.price || cartProduct.product.product.price)) | digits}}</p>
              <p
                class="error--text float-right font-weight-light"
                style="font-size: 13px"
              >({{cartProduct.quantity | digits(0)}} x ${{(cartProduct.product.price || cartProduct.product.product.price) | digits}})</p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <!--Botones-->
      <v-row
        no-gutters
        justify="center"
        align="center"
        class="text-center mx-auto"
        style="width:50%"
      >
        <v-col>
          <v-btn
            icon
            small
            color="error"
            @click="addOrUpdateProductToCartInCartPage({cartProductId: cartProduct.id, quantity: cartProduct.quantity - 1})"
          >
            <v-icon dark>mdi-minus</v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <p class="font-weight-bold">{{cartProduct.quantity}}</p>
        </v-col>
        <v-col>
          <v-btn
            icon
            small
            color="success"
            @click="addOrUpdateProductToCartInCartPage({cartProductId: cartProduct.id, quantity: cartProduct.quantity + 1})"
          >
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-divider class="mt-2"></v-divider>
    </div>

    <v-divider></v-divider>
    <v-divider style="border-top-width: medium;"></v-divider>

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
            <p class="error--text float-right">${{total | digits}}</p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <div class="my-2 text-center">
      <v-btn
        color="primary"
        :disabled="!cart.products.length"
        depressed
        block
        @click="$emit('changeStep', 2)"
      >Continuar</v-btn>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  computed: {
    ...mapState("cart", ["cart"]),
    total() {
      if (this.cart.products) {
        return this.cart.products.reduce((acummulator, cartProduct)=>{
          return acummulator + (cartProduct.quantity * (cartProduct.product.price || cartProduct.product.product.price))
        }, 0)
      }
    }
  },
  methods: {
    ...mapActions("cart", ["addOrUpdateProductToCart", "addOrUpdateProductToCartInCartPage"]),

  },
  filters: {
    digits: function (value, digits=2) {
      if (!value) return ''
      return (value).toFixed(digits)
    }
  },
}
</script>

<style scoped>
</style>
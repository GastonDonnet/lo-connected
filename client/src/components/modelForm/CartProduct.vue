<template>
  <v-form ref="form" v-model="cartProductValid" class="text-center">
    <v-text-field v-model.number="cartProduct.productVariantId" :rules="cartProductRules.productVariantId" :label="cartProductLabel.productVariantId" required>
    </v-text-field>

    <v-text-field v-model.number="cartProduct.cartId" :rules="cartProductRules.cartId" :label="cartProductLabel.cartId" required></v-text-field>

    <v-text-field v-model.number="cartProduct.quantity" :rules="cartProductRules.quantity" :label="cartProductLabel.quantity" required></v-text-field>

    <v-btn :disabled="!cartProductValid" color="success" class="mr-4" @click="onSubmitCartProduct">Submit</v-btn>
  </v-form>
</template>
<script>
  export default {

    data: () => ({
      cartProductValid: true,

      cartProduct: {
        productVariantId: undefined,
        cartId: undefined,
        quantity: undefined,
      },
      cartProductRules: {
        productVariantId: [
          v => !!v || `${this.cartProductLabel.productVariantId} es requerido!`,
          v => (v && v % 1 === 0 || 'productVariantId debe ser un numero entero!'),
        ],
        cartId: [
          v => !!v || `${this.cartProductLabel.cartId} es requerido!`,
          v => (v && v % 1 === 0 || 'cartId debe ser un numero entero!'),
        ],
        quantity: [
          v => !!v || `${this.cartProductLabel.quantity} es requerido!`,
          v => (v && v % 1 === 0 || 'quantity debe ser un numero entero!'),
        ],
      },
      cartProductLabel: {
        productVariantId: "ProductVariantId",
        cartId: "CartId",
        quantity: "Quantity",
      },
    }),

    methods: {
      async onSubmitCartProduct() {},
    },
  };
</script>

<style></style>
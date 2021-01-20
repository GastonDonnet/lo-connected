<template>
  <v-form ref="form" v-model="cartValid" class="text-center">
    <v-text-field v-model.number="cart.userId" :rules="cartRules.userId" :label="cartLabel.userId" required></v-text-field>

    <v-text-field v-model.number="cart.shopId" :rules="cartRules.shopId" :label="cartLabel.shopId" required></v-text-field>

    <v-text-field type="datetime" v-model="cart.validTo" :rules="cartRules.validTo" :label="cartLabel.validTo"></v-text-field>
    <v-btn :disabled="!cartValid" color="success" class="mr-4" @click="onSubmitCart">Submit</v-btn>
  </v-form>
</template>
<script>
  export default {

    data: () => ({
      cartValid: true,

      cart: {
        userId: undefined,
        shopId: undefined,
        validTo: "2021-01-15T21:03:55.937Z",
      },
      cartRules: {
        userId: [
          v => !!v || `${this.cartLabel.userId} es requerido!`,
          v => (v && v % 1 === 0 || 'userId debe ser un numero entero!'),
        ],
        shopId: [
          v => !!v || `${this.cartLabel.shopId} es requerido!`,
          v => (v && v % 1 === 0 || 'shopId debe ser un numero entero!'),
        ],
        validTo: [],
      },
      cartLabel: {
        userId: "UserId",
        shopId: "ShopId",
        validTo: "ValidTo",
      },
    }),

    methods: {
      async onSubmitCart() {},
    },
  };
</script>

<style></style>
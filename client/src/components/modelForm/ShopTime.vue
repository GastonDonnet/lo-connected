<template>
  <v-form ref="form" v-model="shopTimeValid" class="text-center">


    <v-text-field v-model.number="shopTime.shopId" :rules="shopTimeRules.shopId" :label="shopTimeLabel.shopId" required></v-text-field>


    <v-btn :disabled="!shopTimeValid" color="success" class="mr-4" @click="onSubmitShopTime">Submit</v-btn>
  </v-form>
</template>
<script>
  export default {

    data: () => ({
      shopTimeValid: true,

      shopTime: {
        from: undefined,
        to: undefined,
        shopId: undefined,
        delivery: undefined,
      },
      shopTimeRules: {
        shopId: [
          v => !!v || `${this.shopTimeLabel.shopId} es requerido!`,
          v => (v && v % 1 === 0 || 'shopId debe ser un numero entero!'),
        ],
      },
      shopTimeLabel: {
        from: "From",
        to: "To",
        shopId: "ShopId",
        delivery: "Delivery",
      },
    }),

    methods: {
      async onSubmitShopTime() {},
    },
  };
</script>

<style></style>
<template>
  <v-form ref="form" v-model="masterProductValid" class="text-center">
    <v-text-field v-model.number="masterProduct.shopId" :rules="masterProductRules.shopId" :label="masterProductLabel.shopId" required></v-text-field>

    <v-text-field v-model="masterProduct.name" :counter="100" :rules="masterProductRules.name" :label="masterProductLabel.name" required></v-text-field>

    <v-text-field v-model="masterProduct.description" :counter="1000" :rules="masterProductRules.description" :label="masterProductLabel.description">
    </v-text-field>

    <v-btn :disabled="!masterProductValid" color="success" class="mr-4" @click="onSubmitMasterProduct">Submit</v-btn>
  </v-form>
</template>
<script>
  export default {

    data: () => ({
      masterProductValid: true,

      masterProduct: {
        shopId: undefined,
        name: undefined,
        description: undefined,
      },
      masterProductRules: {
        shopId: [
          v => !!v || `${this.masterProductLabel.shopId} es requerido!`,
          v => (v && v % 1 === 0 || 'shopId debe ser un numero entero!'),
        ],
        name: [
          v => !!v || `${this.masterProductLabel.name} es requerido!`,
          v => (v && v.length < 100) || 'name debe tener menos de 100 caracteres!',
        ],
        description: [
          v => (v && v.length < 1000) || 'description debe tener menos de 1000 caracteres!',
        ],
      },
      masterProductLabel: {
        shopId: "ShopId",
        name: "Name",
        description: "Description",
      },
    }),

    methods: {
      async onSubmitMasterProduct() {},
    },
  };
</script>

<style></style>
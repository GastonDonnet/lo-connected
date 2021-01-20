<template>
  <v-form ref="form" v-model="productImageValid" class="text-center">
    <v-text-field v-model.number="productImage.productId" :rules="productImageRules.productId" :label="productImageLabel.productId" required></v-text-field>

    <v-text-field v-model="productImage.path" :counter="200" :rules="productImageRules.path" :label="productImageLabel.path" required></v-text-field>

    <v-btn :disabled="!productImageValid" color="success" class="mr-4" @click="onSubmitProductImage">Submit</v-btn>
  </v-form>
</template>
<script>
  export default {

    data: () => ({
      productImageValid: true,

      productImage: {
        productId: undefined,
        path: undefined,
      },
      productImageRules: {
        productId: [
          v => !!v || `${this.productImageLabel.productId} es requerido!`,
          v => (v && v % 1 === 0 || 'productId debe ser un numero entero!'),
        ],
        path: [
          v => !!v || `${this.productImageLabel.path} es requerido!`,
          v => (v && v.length < 200) || 'path debe tener menos de 200 caracteres!',
        ],
      },
      productImageLabel: {
        productId: "ProductId",
        path: "Path",
      },
    }),

    methods: {
      async onSubmitProductImage() {},
    },
  };
</script>

<style></style>
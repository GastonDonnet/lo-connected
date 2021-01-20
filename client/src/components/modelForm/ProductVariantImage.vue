<template>
  <v-form ref="form" v-model="productVariantImageValid" class="text-center">
    <v-text-field v-model.number="productVariantImage.productVariantId" :rules="productVariantImageRules.productVariantId"
      :label="productVariantImageLabel.productVariantId" required></v-text-field>

    <v-text-field v-model.number="productVariantImage.productImageId" :rules="productVariantImageRules.productImageId"
      :label="productVariantImageLabel.productImageId" required></v-text-field>

    <v-btn :disabled="!productVariantImageValid" color="success" class="mr-4" @click="onSubmitProductVariantImage">Submit</v-btn>
  </v-form>
</template>
<script>
  export default {

    data: () => ({
      productVariantImageValid: true,

      productVariantImage: {
        productVariantId: undefined,
        productImageId: undefined,
      },
      productVariantImageRules: {
        productVariantId: [
          v => !!v || `${this.productVariantImageLabel.productVariantId} es requerido!`,
          v => (v && v % 1 === 0 || 'productVariantId debe ser un numero entero!'),
        ],
        productImageId: [
          v => !!v || `${this.productVariantImageLabel.productImageId} es requerido!`,
          v => (v && v % 1 === 0 || 'productImageId debe ser un numero entero!'),
        ],
      },
      productVariantImageLabel: {
        productVariantId: "ProductVariantId",
        productImageId: "ProductImageId",
      },
    }),

    methods: {
      async onSubmitProductVariantImage() {},
    },
  };
</script>

<style></style>
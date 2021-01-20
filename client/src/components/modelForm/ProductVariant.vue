<template>
  <v-form ref="form" v-model="productVariantValid" class="text-center">
    <v-text-field v-model="productVariant.sku" :counter="0" :rules="productVariantRules.sku" :label="productVariantLabel.sku"></v-text-field>

    <v-text-field v-model.number="productVariant.productId" :rules="productVariantRules.productId" :label="productVariantLabel.productId" required>
    </v-text-field>

    <v-text-field v-model.number="productVariant.stock" :rules="productVariantRules.stock" :label="productVariantLabel.stock"></v-text-field>

    <v-text-field v-model.number="productVariant.price" :rules="productVariantRules.price" :label="productVariantLabel.price"></v-text-field>

    <v-btn :disabled="!productVariantValid" color="success" class="mr-4" @click="onSubmitProductVariant">Submit</v-btn>
  </v-form>
</template>
<script>
  export default {

    data: () => ({
      productVariantValid: true,

      productVariant: {
        sku: undefined,
        productId: undefined,
        stock: undefined,
        price: undefined,
      },
      productVariantRules: {
        sku: [],
        productId: [
          v => !!v || `${this.productVariantLabel.productId} es requerido!`,
          v => (v && v % 1 === 0 || 'productId debe ser un numero entero!'),
        ],
        stock: [
          v => (v && v % 1 === 0 || 'stock debe ser un numero entero!'),
        ],
        price: [],
      },
      productVariantLabel: {
        sku: "Sku",
        productId: "ProductId",
        stock: "Stock",
        price: "Price",
      },
    }),

    methods: {
      async onSubmitProductVariant() {},
    },
  };
</script>

<style></style>
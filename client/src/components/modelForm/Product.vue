<template>
  <v-form ref="form" v-model="productValid" class="text-center">
    <v-text-field v-model.number="product.masterProductId" :rules="productRules.masterProductId" :label="productLabel.masterProductId"></v-text-field>

    <v-text-field v-model.number="product.shopId" :rules="productRules.shopId" :label="productLabel.shopId" required></v-text-field>

    <v-text-field v-model.number="product.productCategoryId" :rules="productRules.productCategoryId" :label="productLabel.productCategoryId"></v-text-field>

    <v-text-field v-model.number="product.brandId" :rules="productRules.brandId" :label="productLabel.brandId"></v-text-field>

    <v-text-field v-model.number="product.saleCategoryId" :rules="productRules.saleCategoryId" :label="productLabel.saleCategoryId"></v-text-field>

    <v-text-field v-model="product.name" :counter="100" :rules="productRules.name" :label="productLabel.name" required></v-text-field>

    <v-text-field v-model="product.description" :counter="1000" :rules="productRules.description" :label="productLabel.description"></v-text-field>

    <v-text-field v-model="product.model" :counter="100" :rules="productRules.model" :label="productLabel.model"></v-text-field>

    <v-text-field v-model="product.barcode" :counter="500" :rules="productRules.barcode" :label="productLabel.barcode"></v-text-field>

    <v-text-field v-model.number="product.price" :rules="productRules.price" :label="productLabel.price" required></v-text-field>


    <v-text-field v-model.number="product.avgRating" :rules="productRules.avgRating" :label="productLabel.avgRating"></v-text-field>

    <v-btn :disabled="!productValid" color="success" class="mr-4" @click="onSubmitProduct">Submit</v-btn>
  </v-form>
</template>
<script>
  export default {

    data: () => ({
      productValid: true,

      product: {
        masterProductId: "1",
        shopId: undefined,
        productCategoryId: undefined,
        brandId: undefined,
        saleCategoryId: undefined,
        name: undefined,
        description: undefined,
        model: undefined,
        barcode: undefined,
        price: undefined,
        taxIncluded: undefined,
        hasAtributes: undefined,
        avgRating: undefined,
      },
      productRules: {
        masterProductId: [
          v => (v && v % 1 === 0 || 'masterProductId debe ser un numero entero!'),
        ],
        shopId: [
          v => !!v || `${this.productLabel.shopId} es requerido!`,
          v => (v && v % 1 === 0 || 'shopId debe ser un numero entero!'),
        ],
        productCategoryId: [
          v => (v && v % 1 === 0 || 'productCategoryId debe ser un numero entero!'),
        ],
        brandId: [
          v => (v && v % 1 === 0 || 'brandId debe ser un numero entero!'),
        ],
        saleCategoryId: [
          v => (v && v % 1 === 0 || 'saleCategoryId debe ser un numero entero!'),
        ],
        name: [
          v => !!v || `${this.productLabel.name} es requerido!`,
          v => (v && v.length < 100) || 'name debe tener menos de 100 caracteres!',
        ],
        description: [
          v => (v && v.length < 1000) || 'description debe tener menos de 1000 caracteres!',
        ],
        model: [
          v => (v && v.length < 100) || 'model debe tener menos de 100 caracteres!',
        ],
        barcode: [
          v => (v && v.length < 500) || 'barcode debe tener menos de 500 caracteres!',
        ],
        price: [
          v => !!v || `${this.productLabel.price} es requerido!`,
        ],
        avgRating: [
          v => (v && v >= 1) || 'avgRating debe ser menor o igual a 1 caracteres!',
          v => (v && v <= 5) || 'avgRating debe ser mayor o igual a 5 caracteres!',
        ],
      },
      productLabel: {
        masterProductId: "MasterProductId",
        shopId: "ShopId",
        productCategoryId: "ProductCategoryId",
        brandId: "BrandId",
        saleCategoryId: "SaleCategoryId",
        name: "Name",
        description: "Description",
        model: "Model",
        barcode: "Barcode",
        price: "Price",
        taxIncluded: "TaxIncluded",
        hasAtributes: "HasAtributes",
        avgRating: "AvgRating",
      },
    }),

    methods: {
      async onSubmitProduct() {},
    },
  };
</script>

<style></style>
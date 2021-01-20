<template>
  <v-form ref="form" v-model="productCategoryValid" class="text-center">
    <v-text-field v-model.number="productCategory.categoryId" :rules="productCategoryRules.categoryId" :label="productCategoryLabel.categoryId"></v-text-field>

    <v-text-field v-model="productCategory.name" :counter="50" :rules="productCategoryRules.name" :label="productCategoryLabel.name" required></v-text-field>


    <v-btn :disabled="!productCategoryValid" color="success" class="mr-4" @click="onSubmitProductCategory">Submit</v-btn>
  </v-form>
</template>
<script>
  export default {

    data: () => ({
      productCategoryValid: true,

      productCategory: {
        categoryId: undefined,
        name: undefined,
        visible: undefined,
      },
      productCategoryRules: {
        categoryId: [
          v => (v && v % 1 === 0 || 'categoryId debe ser un numero entero!'),
        ],
        name: [
          v => !!v || `${this.productCategoryLabel.name} es requerido!`,
          v => (v && v.length >= 5) || 'name debe tener al menos 5 caracteres!',
          v => (v && v.length < 50) || 'name debe tener menos de 50 caracteres!',
        ],
      },
      productCategoryLabel: {
        categoryId: "CategoryId",
        name: "Name",
        visible: "Visible",
      },
    }),

    methods: {
      async onSubmitProductCategory() {},
    },
  };
</script>

<style></style>
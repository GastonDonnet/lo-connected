<template>
  <v-form ref="form" v-model="shopCategoryValid" class="text-center">
    <v-text-field v-model.number="shopCategory.shopCategoryId" :rules="shopCategoryRules.shopCategoryId" :label="shopCategoryLabel.shopCategoryId">
    </v-text-field>

    <v-text-field v-model="shopCategory.name" :counter="30" :rules="shopCategoryRules.name" :label="shopCategoryLabel.name" required></v-text-field>

    <v-btn :disabled="!shopCategoryValid" color="success" class="mr-4" @click="onSubmitShopCategory">Submit</v-btn>
  </v-form>
</template>
<script>
  export default {

    data: () => ({
      shopCategoryValid: true,

      shopCategory: {
        shopCategoryId: undefined,
        name: undefined,
      },
      shopCategoryRules: {
        shopCategoryId: [
          v => (v && v % 1 === 0 || 'shopCategoryId debe ser un numero entero!'),
        ],
        name: [
          v => !!v || `${this.shopCategoryLabel.name} es requerido!`,
          v => (v && v.length >= 5) || 'name debe tener al menos 5 caracteres!',
          v => (v && v.length < 30) || 'name debe tener menos de 30 caracteres!',
        ],
      },
      shopCategoryLabel: {
        shopCategoryId: "ShopCategoryId",
        name: "Name",
      },
    }),

    methods: {
      async onSubmitShopCategory() {},
    },
  };
</script>

<style></style>
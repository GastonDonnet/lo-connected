<template>
  <v-form ref="form" v-model="productBrandValid" class="text-center">
    <v-text-field v-model="productBrand.name" :counter="100" :rules="productBrandRules.name" :label="productBrandLabel.name" required></v-text-field>

    <v-text-field v-model="productBrand.description" :counter="1000" :rules="productBrandRules.description" :label="productBrandLabel.description">
    </v-text-field>

    <v-btn :disabled="!productBrandValid" color="success" class="mr-4" @click="onSubmitProductBrand">Submit</v-btn>
  </v-form>
</template>
<script>
  export default {

    data: () => ({
      productBrandValid: true,

      productBrand: {
        name: undefined,
        description: undefined,
      },
      productBrandRules: {
        name: [
          v => !!v || `${this.productBrandLabel.name} es requerido!`,
          v => (v && v.length < 100) || 'name debe tener menos de 100 caracteres!',
        ],
        description: [
          v => (v && v.length < 1000) || 'description debe tener menos de 1000 caracteres!',
        ],
      },
      productBrandLabel: {
        name: "Name",
        description: "Description",
      },
    }),

    methods: {
      async onSubmitProductBrand() {},
    },
  };
</script>

<style></style>
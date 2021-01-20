<template>
  <v-form ref="form" v-model="cityValid" class="text-center">
    <v-text-field v-model="city.name" :counter="0" :rules="cityRules.name" :label="cityLabel.name" required></v-text-field>

    <v-text-field v-model.number="city.provinceId" :rules="cityRules.provinceId" :label="cityLabel.provinceId"></v-text-field>

    <v-btn :disabled="!cityValid" color="success" class="mr-4" @click="onSubmitCity">Submit</v-btn>
  </v-form>
</template>
<script>
  export default {

    data: () => ({
      cityValid: true,

      city: {
        name: undefined,
        provinceId: undefined,
      },
      cityRules: {
        name: [
          v => !!v || `${this.cityLabel.name} es requerido!`,
        ],
        provinceId: [
          v => (v && v % 1 === 0 || 'provinceId debe ser un numero entero!'),
        ],
      },
      cityLabel: {
        name: "Name",
        provinceId: "ProvinceId",
      },
    }),

    methods: {
      async onSubmitCity() {},
    },
  };
</script>

<style></style>
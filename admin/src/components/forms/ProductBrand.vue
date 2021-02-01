<template>
  <v-form ref="form" v-model="productBrandValid" class="text-center">
    <v-text-field
      v-model="productBrand.name"
      :counter="100"
      :rules="productBrandRules.name"
      :label="productBrandLabel.name"
      required
    ></v-text-field>

    <v-text-field
      v-model="productBrand.description"
      :counter="1000"
      :rules="productBrandRules.description"
      :label="productBrandLabel.description"
    ></v-text-field>

    <v-btn
      :disabled="!productBrandValid"
      color="success"
      class="mr-4"
      @click="onSubmitProductBrand"
      >Enviar</v-btn
    >
  </v-form>
</template>
<script>
export default {
  data: () => ({
    productBrandValid: true,

    productBrand: {
      name: '',
      description: '',
    },
    productBrandRules: {
      name: [
        (v) => !!v || `Nombre es requerido!`,
        (v) =>
          (v && v.length < 100) ||
          'El nombre debe tener menos de 100 caracteres!',
      ],
      description: [
        (v) =>
          v.length < 1000 ||
          'La descripción debe tener menos de 1000 caracteres!',
      ],
    },
    productBrandLabel: {
      name: 'Nombre',
      description: 'Descripcion',
    },
  }),

  methods: {
    async onSubmitProductBrand() {
      this.$http
        .post('product/brand', this.productBrand)
        .then((res) => {
          this.$emit('set-product-brand', res.data.data);
        })
        .catch((err) => console.log(err.response));
    },
  },
};
</script>

<style></style>

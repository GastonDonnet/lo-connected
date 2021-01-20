<template>
  <v-form ref="form" v-model="shopStateValid" class="text-center">
    <v-text-field v-model="shopState.name" :counter="30" :rules="shopStateRules.name" :label="shopStateLabel.name" required></v-text-field>

    <v-btn :disabled="!shopStateValid" color="success" class="mr-4" @click="onSubmitShopState">Submit</v-btn>
  </v-form>
</template>
<script>
  export default {

    data: () => ({
      shopStateValid: true,

      shopState: {
        name: undefined,
      },
      shopStateRules: {
        name: [
          v => !!v || `${this.shopStateLabel.name} es requerido!`,
          v => (v && v.length < 30) || 'name debe tener menos de 30 caracteres!',
        ],
      },
      shopStateLabel: {
        name: "Name",
      },
    }),

    methods: {
      async onSubmitShopState() {},
    },
  };
</script>

<style></style>
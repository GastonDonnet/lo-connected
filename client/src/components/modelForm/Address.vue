<template>
  <v-form ref="form" v-model="addressValid" class="text-center">


    <v-text-field v-model.number="address.cityId" :rules="addressRules.cityId" :label="addressLabel.cityId"></v-text-field>

    <v-text-field v-model="address.street" :counter="100" :rules="addressRules.street" :label="addressLabel.street" required></v-text-field>

    <v-text-field v-model="address.note" :counter="200" :rules="addressRules.note" :label="addressLabel.note"></v-text-field>

    <v-btn :disabled="!addressValid" color="success" class="mr-4" @click="onSubmitAddress">Submit</v-btn>
  </v-form>
</template>
<script>
  export default {

    data: () => ({
      addressValid: true,

      address: {
        userId: undefined,
        shopId: undefined,
        cityId: undefined,
        street: undefined,
        note: undefined,
      },
      addressRules: {
        cityId: [
          v => (v && v % 1 === 0 || 'cityId debe ser un numero entero!'),
        ],
        street: [
          v => !!v || `${this.addressLabel.street} es requerido!`,
          v => (v && v.length < 100) || 'street debe tener menos de 100 caracteres!',
        ],
        note: [
          v => (v && v.length < 200) || 'note debe tener menos de 200 caracteres!',
        ],
      },
      addressLabel: {
        userId: "UserId",
        shopId: "ShopId",
        cityId: "CityId",
        street: "Street",
        note: "Note",
      },
    }),

    methods: {
      async onSubmitAddress() {},
    },
  };
</script>

<style></style>
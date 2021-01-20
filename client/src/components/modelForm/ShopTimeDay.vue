<template>
  <v-form ref="form" v-model="shopTimeDayValid" class="text-center">
    <v-text-field v-model.number="shopTimeDay.dayId" :rules="shopTimeDayRules.dayId" :label="shopTimeDayLabel.dayId" required></v-text-field>

    <v-text-field v-model.number="shopTimeDay.shopTimeId" :rules="shopTimeDayRules.shopTimeId" :label="shopTimeDayLabel.shopTimeId" required></v-text-field>

    <v-btn :disabled="!shopTimeDayValid" color="success" class="mr-4" @click="onSubmitShopTimeDay">Submit</v-btn>
  </v-form>
</template>
<script>
  export default {

    data: () => ({
      shopTimeDayValid: true,

      shopTimeDay: {
        dayId: undefined,
        shopTimeId: undefined,
      },
      shopTimeDayRules: {
        dayId: [
          v => !!v || `${this.shopTimeDayLabel.dayId} es requerido!`,
          v => (v && v % 1 === 0 || 'dayId debe ser un numero entero!'),
        ],
        shopTimeId: [
          v => !!v || `${this.shopTimeDayLabel.shopTimeId} es requerido!`,
          v => (v && v % 1 === 0 || 'shopTimeId debe ser un numero entero!'),
        ],
      },
      shopTimeDayLabel: {
        dayId: "DayId",
        shopTimeId: "ShopTimeId",
      },
    }),

    methods: {
      async onSubmitShopTimeDay() {},
    },
  };
</script>

<style></style>
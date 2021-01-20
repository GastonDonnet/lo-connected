<template>
  <v-form ref="form" v-model="orderStateValid" class="text-center">
    <v-text-field v-model="orderState.name" :counter="100" :rules="orderStateRules.name" :label="orderStateLabel.name" required></v-text-field>

    <v-text-field v-model="orderState.description" :counter="500" :rules="orderStateRules.description" :label="orderStateLabel.description" required>
    </v-text-field>

    <v-btn :disabled="!orderStateValid" color="success" class="mr-4" @click="onSubmitOrderState">Submit</v-btn>
  </v-form>
</template>
<script>
  export default {

    data: () => ({
      orderStateValid: true,

      orderState: {
        name: undefined,
        description: undefined,
      },
      orderStateRules: {
        name: [
          v => !!v || `${this.orderStateLabel.name} es requerido!`,
          v => (v && v.length < 100) || 'name debe tener menos de 100 caracteres!',
        ],
        description: [
          v => !!v || `${this.orderStateLabel.description} es requerido!`,
          v => (v && v.length < 500) || 'description debe tener menos de 500 caracteres!',
        ],
      },
      orderStateLabel: {
        name: "Name",
        description: "Description",
      },
    }),

    methods: {
      async onSubmitOrderState() {},
    },
  };
</script>

<style></style>
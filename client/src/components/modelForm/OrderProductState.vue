<template>
  <v-form ref="form" v-model="orderProductStateValid" class="text-center">
    <v-text-field v-model="orderProductState.name" :counter="100" :rules="orderProductStateRules.name" :label="orderProductStateLabel.name" required>
    </v-text-field>

    <v-text-field v-model="orderProductState.description" :counter="500" :rules="orderProductStateRules.description" :label="orderProductStateLabel.description"
      required></v-text-field>

    <v-btn :disabled="!orderProductStateValid" color="success" class="mr-4" @click="onSubmitOrderProductState">Submit</v-btn>
  </v-form>
</template>
<script>
  export default {

    data: () => ({
      orderProductStateValid: true,

      orderProductState: {
        name: undefined,
        description: undefined,
      },
      orderProductStateRules: {
        name: [
          v => !!v || `${this.orderProductStateLabel.name} es requerido!`,
          v => (v && v.length < 100) || 'name debe tener menos de 100 caracteres!',
        ],
        description: [
          v => !!v || `${this.orderProductStateLabel.description} es requerido!`,
          v => (v && v.length < 500) || 'description debe tener menos de 500 caracteres!',
        ],
      },
      orderProductStateLabel: {
        name: "Name",
        description: "Description",
      },
    }),

    methods: {
      async onSubmitOrderProductState() {},
    },
  };
</script>

<style></style>
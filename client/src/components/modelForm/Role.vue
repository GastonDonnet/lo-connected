<template>
  <v-form ref="form" v-model="roleValid" class="text-center">
    <v-text-field v-model.number="role.shopId" :rules="roleRules.shopId" :label="roleLabel.shopId"></v-text-field>

    <v-text-field v-model="role.name" :counter="0" :rules="roleRules.name" :label="roleLabel.name" required></v-text-field>

    <v-btn :disabled="!roleValid" color="success" class="mr-4" @click="onSubmitRole">Submit</v-btn>
  </v-form>
</template>
<script>
  export default {

    data: () => ({
      roleValid: true,

      role: {
        shopId: undefined,
        name: undefined,
      },
      roleRules: {
        shopId: [
          v => (v && v % 1 === 0 || 'shopId debe ser un numero entero!'),
        ],
        name: [
          v => !!v || `${this.roleLabel.name} es requerido!`,
        ],
      },
      roleLabel: {
        shopId: "ShopId",
        name: "Name",
      },
    }),

    methods: {
      async onSubmitRole() {},
    },
  };
</script>

<style></style>
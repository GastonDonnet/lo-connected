<template>
  <v-form ref="form" v-model="shopEmployeeValid" class="text-center">
    <v-text-field v-model.number="shopEmployee.userId" :rules="shopEmployeeRules.userId" :label="shopEmployeeLabel.userId" required></v-text-field>

    <v-text-field v-model.number="shopEmployee.shopId" :rules="shopEmployeeRules.shopId" :label="shopEmployeeLabel.shopId" required></v-text-field>

    <v-text-field v-model.number="shopEmployee.roleId" :rules="shopEmployeeRules.roleId" :label="shopEmployeeLabel.roleId"></v-text-field>


    <v-btn :disabled="!shopEmployeeValid" color="success" class="mr-4" @click="onSubmitShopEmployee">Submit</v-btn>
  </v-form>
</template>
<script>
  export default {

    data: () => ({
      shopEmployeeValid: true,

      shopEmployee: {
        userId: undefined,
        shopId: undefined,
        roleId: undefined,
        active: undefined,
      },
      shopEmployeeRules: {
        userId: [
          v => !!v || `${this.shopEmployeeLabel.userId} es requerido!`,
          v => (v && v % 1 === 0 || 'userId debe ser un numero entero!'),
        ],
        shopId: [
          v => !!v || `${this.shopEmployeeLabel.shopId} es requerido!`,
          v => (v && v % 1 === 0 || 'shopId debe ser un numero entero!'),
        ],
        roleId: [
          v => (v && v % 1 === 0 || 'roleId debe ser un numero entero!'),
        ],
      },
      shopEmployeeLabel: {
        userId: "UserId",
        shopId: "ShopId",
        roleId: "RoleId",
        active: "Active",
      },
    }),

    methods: {
      async onSubmitShopEmployee() {},
    },
  };
</script>

<style></style>
<template>
  <v-form ref="form" v-model="orderProductTransactionValid" class="text-center">
    <v-text-field v-model.number="orderProductTransaction.userId" :rules="orderProductTransactionRules.userId" :label="orderProductTransactionLabel.userId"
      required></v-text-field>

    <v-text-field v-model.number="orderProductTransaction.orderProductId" :rules="orderProductTransactionRules.orderProductId"
      :label="orderProductTransactionLabel.orderProductId" required></v-text-field>

    <v-text-field v-model.number="orderProductTransaction.orderProductStateId" :rules="orderProductTransactionRules.orderProductStateId"
      :label="orderProductTransactionLabel.orderProductStateId" required></v-text-field>

    <v-text-field v-model.number="orderProductTransaction.newOrderProductStateId" :rules="orderProductTransactionRules.newOrderProductStateId"
      :label="orderProductTransactionLabel.newOrderProductStateId" required></v-text-field>

    <v-text-field type="datetime" v-model="orderProductTransaction.validFrom" :rules="orderProductTransactionRules.validFrom"
      :label="orderProductTransactionLabel.validFrom" required></v-text-field>
    <v-text-field type="datetime" v-model="orderProductTransaction.validTo" :rules="orderProductTransactionRules.validTo"
      :label="orderProductTransactionLabel.validTo"></v-text-field>
    <v-btn :disabled="!orderProductTransactionValid" color="success" class="mr-4" @click="onSubmitOrderProductTransaction">Submit</v-btn>
  </v-form>
</template>
<script>
  export default {

    data: () => ({
      orderProductTransactionValid: true,

      orderProductTransaction: {
        userId: undefined,
        orderProductId: undefined,
        orderProductStateId: undefined,
        newOrderProductStateId: undefined,
        validFrom: undefined,
        validTo: undefined,
      },
      orderProductTransactionRules: {
        userId: [
          v => !!v || `${this.orderProductTransactionLabel.userId} es requerido!`,
          v => (v && v % 1 === 0 || 'userId debe ser un numero entero!'),
        ],
        orderProductId: [
          v => !!v || `${this.orderProductTransactionLabel.orderProductId} es requerido!`,
          v => (v && v % 1 === 0 || 'orderProductId debe ser un numero entero!'),
        ],
        orderProductStateId: [
          v => !!v || `${this.orderProductTransactionLabel.orderProductStateId} es requerido!`,
          v => (v && v % 1 === 0 || 'orderProductStateId debe ser un numero entero!'),
        ],
        newOrderProductStateId: [
          v => !!v || `${this.orderProductTransactionLabel.newOrderProductStateId} es requerido!`,
          v => (v && v % 1 === 0 || 'newOrderProductStateId debe ser un numero entero!'),
        ],
        validFrom: [v => !!v || `${this.orderProductTransactionLabel.validFrom} es requerido!`, ],
        validTo: [],
      },
      orderProductTransactionLabel: {
        userId: "UserId",
        orderProductId: "OrderProductId",
        orderProductStateId: "OrderProductStateId",
        newOrderProductStateId: "NewOrderProductStateId",
        validFrom: "ValidFrom",
        validTo: "ValidTo",
      },
    }),

    methods: {
      async onSubmitOrderProductTransaction() {},
    },
  };
</script>

<style></style>
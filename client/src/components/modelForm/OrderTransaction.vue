<template>
  <v-form ref="form" v-model="orderTransactionValid" class="text-center">
    <v-text-field v-model.number="orderTransaction.userId" :rules="orderTransactionRules.userId" :label="orderTransactionLabel.userId" required></v-text-field>

    <v-text-field v-model.number="orderTransaction.orderId" :rules="orderTransactionRules.orderId" :label="orderTransactionLabel.orderId" required>
    </v-text-field>

    <v-text-field v-model.number="orderTransaction.orderStateId" :rules="orderTransactionRules.orderStateId" :label="orderTransactionLabel.orderStateId"
      required></v-text-field>

    <v-text-field v-model.number="orderTransaction.newOrderStateId" :rules="orderTransactionRules.newOrderStateId"
      :label="orderTransactionLabel.newOrderStateId" required></v-text-field>

    <v-text-field type="datetime" v-model="orderTransaction.validFrom" :rules="orderTransactionRules.validFrom" :label="orderTransactionLabel.validFrom"
      required></v-text-field>
    <v-text-field type="datetime" v-model="orderTransaction.validTo" :rules="orderTransactionRules.validTo" :label="orderTransactionLabel.validTo">
    </v-text-field>
    <v-btn :disabled="!orderTransactionValid" color="success" class="mr-4" @click="onSubmitOrderTransaction">Submit</v-btn>
  </v-form>
</template>
<script>
  export default {

    data: () => ({
      orderTransactionValid: true,

      orderTransaction: {
        userId: undefined,
        orderId: undefined,
        orderStateId: undefined,
        newOrderStateId: undefined,
        validFrom: undefined,
        validTo: undefined,
      },
      orderTransactionRules: {
        userId: [
          v => !!v || `${this.orderTransactionLabel.userId} es requerido!`,
          v => (v && v % 1 === 0 || 'userId debe ser un numero entero!'),
        ],
        orderId: [
          v => !!v || `${this.orderTransactionLabel.orderId} es requerido!`,
          v => (v && v % 1 === 0 || 'orderId debe ser un numero entero!'),
        ],
        orderStateId: [
          v => !!v || `${this.orderTransactionLabel.orderStateId} es requerido!`,
          v => (v && v % 1 === 0 || 'orderStateId debe ser un numero entero!'),
        ],
        newOrderStateId: [
          v => !!v || `${this.orderTransactionLabel.newOrderStateId} es requerido!`,
          v => (v && v % 1 === 0 || 'newOrderStateId debe ser un numero entero!'),
        ],
        validFrom: [v => !!v || `${this.orderTransactionLabel.validFrom} es requerido!`, ],
        validTo: [],
      },
      orderTransactionLabel: {
        userId: "UserId",
        orderId: "OrderId",
        orderStateId: "OrderStateId",
        newOrderStateId: "NewOrderStateId",
        validFrom: "ValidFrom",
        validTo: "ValidTo",
      },
    }),

    methods: {
      async onSubmitOrderTransaction() {},
    },
  };
</script>

<style></style>
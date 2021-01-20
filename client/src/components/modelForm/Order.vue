<template>
  <v-form ref="form" v-model="orderValid" class="text-center">
    <v-text-field v-model.number="order.userId" :rules="orderRules.userId" :label="orderLabel.userId" required></v-text-field>

    <v-text-field v-model.number="order.orderStateId" :rules="orderRules.orderStateId" :label="orderLabel.orderStateId" required></v-text-field>

    <v-text-field v-model="order.clientAddress" :counter="500" :rules="orderRules.clientAddress" :label="orderLabel.clientAddress" required></v-text-field>


    <v-radio-group v-model="order.paymentMethod">
      <v-radio v-for="option in paymentMethodItems" :key="option" :label="`${option}`" :value="option"></v-radio>
    </v-radio-group>


    <v-text-field type="datetime" v-model="order.lastStateUpdate" :rules="orderRules.lastStateUpdate" :label="orderLabel.lastStateUpdate"></v-text-field>
    <v-btn :disabled="!orderValid" color="success" class="mr-4" @click="onSubmitOrder">Submit</v-btn>
  </v-form>
</template>
<script>
  export default {

    data: () => ({
      orderValid: true,

      paymentMethodItems: ["tarjeta", "efectivo"],

      order: {
        userId: undefined,
        orderStateId: undefined,
        clientAddress: undefined,
        note: undefined,
        paymentMethod: "efectivo",
        deliveryDate: undefined,
        deliveryTime: undefined,
        lastStateUpdate: undefined,
      },
      orderRules: {
        userId: [
          v => !!v || `${this.orderLabel.userId} es requerido!`,
          v => (v && v % 1 === 0 || 'userId debe ser un numero entero!'),
        ],
        orderStateId: [
          v => !!v || `${this.orderLabel.orderStateId} es requerido!`,
          v => (v && v % 1 === 0 || 'orderStateId debe ser un numero entero!'),
        ],
        clientAddress: [
          v => !!v || `${this.orderLabel.clientAddress} es requerido!`,
          v => (v && v.length < 500) || 'clientAddress debe tener menos de 500 caracteres!',
        ],
        lastStateUpdate: [],
      },
      orderLabel: {
        userId: "UserId",
        orderStateId: "OrderStateId",
        clientAddress: "ClientAddress",
        note: "Note",
        paymentMethod: "PaymentMethod",
        deliveryDate: "DeliveryDate",
        deliveryTime: "DeliveryTime",
        lastStateUpdate: "LastStateUpdate",
      },
    }),

    methods: {
      async onSubmitOrder() {},
    },
  };
</script>

<style></style>
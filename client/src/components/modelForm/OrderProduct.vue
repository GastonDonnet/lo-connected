<template>
  <v-form ref="form" v-model="orderProductValid" class="text-center">
    <v-text-field v-model.number="orderProduct.productVariantId" :rules="orderProductRules.productVariantId" :label="orderProductLabel.productVariantId"
      required></v-text-field>

    <v-text-field v-model.number="orderProduct.orderId" :rules="orderProductRules.orderId" :label="orderProductLabel.orderId" required></v-text-field>

    <v-text-field v-model.number="orderProduct.orderProductStateId" :rules="orderProductRules.orderProductStateId"
      :label="orderProductLabel.orderProductStateId" required></v-text-field>

    <v-text-field v-model.number="orderProduct.price" :rules="orderProductRules.price" :label="orderProductLabel.price" required></v-text-field>

    <v-text-field v-model.number="orderProduct.quantity" :rules="orderProductRules.quantity" :label="orderProductLabel.quantity" required></v-text-field>


    <v-text-field v-model="orderProduct.note" :counter="1000" :rules="orderProductRules.note" :label="orderProductLabel.note"></v-text-field>

    <v-text-field type="datetime" v-model="orderProduct.lastStateUpdate" :rules="orderProductRules.lastStateUpdate" :label="orderProductLabel.lastStateUpdate">
    </v-text-field>
    <v-btn :disabled="!orderProductValid" color="success" class="mr-4" @click="onSubmitOrderProduct">Submit</v-btn>
  </v-form>
</template>
<script>
  export default {

    data: () => ({
      orderProductValid: true,

      orderProduct: {
        productVariantId: undefined,
        orderId: undefined,
        orderProductStateId: undefined,
        price: undefined,
        quantity: undefined,
        subtotal: undefined,
        note: undefined,
        lastStateUpdate: undefined,
      },
      orderProductRules: {
        productVariantId: [
          v => !!v || `${this.orderProductLabel.productVariantId} es requerido!`,
          v => (v && v % 1 === 0 || 'productVariantId debe ser un numero entero!'),
        ],
        orderId: [
          v => !!v || `${this.orderProductLabel.orderId} es requerido!`,
          v => (v && v % 1 === 0 || 'orderId debe ser un numero entero!'),
        ],
        orderProductStateId: [
          v => !!v || `${this.orderProductLabel.orderProductStateId} es requerido!`,
          v => (v && v % 1 === 0 || 'orderProductStateId debe ser un numero entero!'),
        ],
        price: [
          v => !!v || `${this.orderProductLabel.price} es requerido!`,
        ],
        quantity: [
          v => !!v || `${this.orderProductLabel.quantity} es requerido!`,
          v => (v && v % 1 === 0 || 'quantity debe ser un numero entero!'),
        ],
        note: [
          v => (v && v.length < 1000) || 'note debe tener menos de 1000 caracteres!',
        ],
        lastStateUpdate: [],
      },
      orderProductLabel: {
        productVariantId: "ProductVariantId",
        orderId: "OrderId",
        orderProductStateId: "OrderProductStateId",
        price: "Price",
        quantity: "Quantity",
        subtotal: "Subtotal",
        note: "Note",
        lastStateUpdate: "LastStateUpdate",
      },
    }),

    methods: {
      async onSubmitOrderProduct() {},
    },
  };
</script>

<style></style>
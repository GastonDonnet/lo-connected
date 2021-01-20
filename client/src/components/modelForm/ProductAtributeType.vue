<template>
  <v-form ref="form" v-model="productAtributeTypeValid" class="text-center">
    <v-text-field v-model.number="productAtributeType.productId" :rules="productAtributeTypeRules.productId" :label="productAtributeTypeLabel.productId"
      required></v-text-field>

    <v-text-field v-model.number="productAtributeType.atributeTypeId" :rules="productAtributeTypeRules.atributeTypeId"
      :label="productAtributeTypeLabel.atributeTypeId" required></v-text-field>

    <v-btn :disabled="!productAtributeTypeValid" color="success" class="mr-4" @click="onSubmitProductAtributeType">Submit</v-btn>
  </v-form>
</template>
<script>
  export default {

    data: () => ({
      productAtributeTypeValid: true,

      productAtributeType: {
        productId: undefined,
        atributeTypeId: "1",
      },
      productAtributeTypeRules: {
        productId: [
          v => !!v || `${this.productAtributeTypeLabel.productId} es requerido!`,
          v => (v && v % 1 === 0 || 'productId debe ser un numero entero!'),
        ],
        atributeTypeId: [
          v => !!v || `${this.productAtributeTypeLabel.atributeTypeId} es requerido!`,
          v => (v && v % 1 === 0 || 'atributeTypeId debe ser un numero entero!'),
        ],
      },
      productAtributeTypeLabel: {
        productId: "ProductId",
        atributeTypeId: "AtributeTypeId",
      },
    }),

    methods: {
      async onSubmitProductAtributeType() {},
    },
  };
</script>

<style></style>
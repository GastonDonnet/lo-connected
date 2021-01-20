<template>
  <v-form ref="form" v-model="productVariantAtributeValueValid" class="text-center">
    <v-text-field v-model.number="productVariantAtributeValue.productVariantId" :rules="productVariantAtributeValueRules.productVariantId"
      :label="productVariantAtributeValueLabel.productVariantId" required></v-text-field>

    <v-text-field v-model.number="productVariantAtributeValue.atributeValue" :rules="productVariantAtributeValueRules.atributeValue"
      :label="productVariantAtributeValueLabel.atributeValue" required></v-text-field>

    <v-btn :disabled="!productVariantAtributeValueValid" color="success" class="mr-4" @click="onSubmitProductVariantAtributeValue">Submit</v-btn>
  </v-form>
</template>
<script>
  export default {

    data: () => ({
      productVariantAtributeValueValid: true,

      productVariantAtributeValue: {
        productVariantId: undefined,
        atributeValue: undefined,
      },
      productVariantAtributeValueRules: {
        productVariantId: [
          v => !!v || `${this.productVariantAtributeValueLabel.productVariantId} es requerido!`,
          v => (v && v % 1 === 0 || 'productVariantId debe ser un numero entero!'),
        ],
        atributeValue: [
          v => !!v || `${this.productVariantAtributeValueLabel.atributeValue} es requerido!`,
          v => (v && v % 1 === 0 || 'atributeValue debe ser un numero entero!'),
        ],
      },
      productVariantAtributeValueLabel: {
        productVariantId: "ProductVariantId",
        atributeValue: "AtributeValue",
      },
    }),

    methods: {
      async onSubmitProductVariantAtributeValue() {},
    },
  };
</script>

<style></style>
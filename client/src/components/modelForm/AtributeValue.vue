<template>
  <v-form ref="form" v-model="atributeValueValid" class="text-center">
    <v-text-field v-model.number="atributeValue.atributeTypeId" :rules="atributeValueRules.atributeTypeId" :label="atributeValueLabel.atributeTypeId" required>
    </v-text-field>

    <v-text-field v-model="atributeValue.value" :counter="0" :rules="atributeValueRules.value" :label="atributeValueLabel.value"></v-text-field>

    <v-btn :disabled="!atributeValueValid" color="success" class="mr-4" @click="onSubmitAtributeValue">Submit</v-btn>
  </v-form>
</template>
<script>
  export default {

    data: () => ({
      atributeValueValid: true,

      atributeValue: {
        atributeTypeId: undefined,
        value: undefined,
      },
      atributeValueRules: {
        atributeTypeId: [
          v => !!v || `${this.atributeValueLabel.atributeTypeId} es requerido!`,
          v => (v && v % 1 === 0 || 'atributeTypeId debe ser un numero entero!'),
        ],
        value: [],
      },
      atributeValueLabel: {
        atributeTypeId: "AtributeTypeId",
        value: "Value",
      },
    }),

    methods: {
      async onSubmitAtributeValue() {},
    },
  };
</script>

<style></style>
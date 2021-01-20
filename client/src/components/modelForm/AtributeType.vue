<template>
  <v-form ref="form" v-model="atributeTypeValid" class="text-center">
    <v-text-field v-model.number="atributeType.masterProductId" :rules="atributeTypeRules.masterProductId" :label="atributeTypeLabel.masterProductId" required>
    </v-text-field>

    <v-radio-group v-model="atributeType.type">
      <v-radio v-for="option in typeItems" :key="option" :label="`${option}`" :value="option"></v-radio>
    </v-radio-group>
    <v-text-field v-model="atributeType.name" :counter="0" :rules="atributeTypeRules.name" :label="atributeTypeLabel.name" required></v-text-field>

    <v-text-field v-model="atributeType.description" :counter="0" :rules="atributeTypeRules.description" :label="atributeTypeLabel.description"></v-text-field>

    <v-btn :disabled="!atributeTypeValid" color="success" class="mr-4" @click="onSubmitAtributeType">Submit</v-btn>
  </v-form>
</template>
<script>
  export default {

    data: () => ({
      atributeTypeValid: true,

      typeItems: ["string", "float", "integer", "color", "null"],

      atributeType: {
        masterProductId: undefined,
        type: "string",
        name: undefined,
        description: undefined,
      },
      atributeTypeRules: {
        masterProductId: [
          v => !!v || `${this.atributeTypeLabel.masterProductId} es requerido!`,
          v => (v && v % 1 === 0 || 'masterProductId debe ser un numero entero!'),
        ],
        name: [
          v => !!v || `${this.atributeTypeLabel.name} es requerido!`,
        ],
        description: [],
      },
      atributeTypeLabel: {
        masterProductId: "MasterProductId",
        type: "Type",
        name: "Name",
        description: "Description",
      },
    }),

    methods: {
      async onSubmitAtributeType() {},
    },
  };
</script>

<style></style>
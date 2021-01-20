<template>
  <v-form ref="form" v-model="atributeValueValid" class="text-center">
    <h3>Tipo seleccionado: "{{typeItemsLabel[type]}}"</h3>

    <v-text-field
      v-if="type=='string'"
      v-model="atributeValue.value"
      :rules="atributeValueRules.value"
      :label="atributeValueLabel.value"
    ></v-text-field>
    <v-text-field
      v-if="type=='integer' || type=='float'"
      v-model.number="atributeValue.value"
      :rules="atributeValueRules.value"
      :label="atributeValueLabel.value"
    ></v-text-field>

    <v-color-picker v-if="type=='color'" hide-canvas hide-inputs flat v-model="atributeValue.value"></v-color-picker>
    <!-- //TODO: Agregar un texto para colores, ej si elijo rojo, poder agregar "Rojo" (campo nuevo en BD)-->

    <v-btn
      :disabled="!atributeValueValid"
      color="success"
      class="mr-4"
      @click="onSubmitAtributeValue"
    >Crear Valor</v-btn>
  </v-form>
</template>
<script>
  export default {
    props: {
      type: {
        type: String,
        required: true
      }
    },
    data: () => ({
      atributeValueValid: true,

      atributeValue: {
        atributeTypeId: undefined,
        value: undefined,
      },
      atributeValueLabel: {
        value: "Valor del atributo",
      },
      typeItemsLabel: {
        string: "Texto",
        float: "Decimal",
        integer: "Entero",
        color: "Color"
      },

    }),
    computed: {
      atributeValueRules: function() {
        const rules = {
          value: [
            v => !!v || `Se requiere el valor`,
            v => {
              if (this.type==='integer' || this.type==='float') return (typeof v === "number") || 'Debe ser un numero'
            },
            v => {
              if (this.type==='integer') return !(v%1 !== 0) || 'Debe ser un numero entero'
            },
           
          ],
        }

        return rules
      }
    },

    methods: {
      onSubmitAtributeValue() {
        if (this.type === 'color') this.atributeValue.value = this.atributeValue.value.hex 

        this.$emit("send-value", this.atributeValue.value)

        this.atributeValue.value = undefined
      },
    },
  };

</script>

<style></style>

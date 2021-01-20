<template>
  <div>
    <v-form ref="form" v-model="atributeTypeValid" class="text-center">
      <v-radio-group v-model="atributeType.type" :label="atributeTypeLabel.type">
        <v-radio
          v-for="option in typeItems"
          :key="option"
          :label="`${typeItemsLabel[option]}`"
          :value="option"
        ></v-radio>
      </v-radio-group>

      <v-text-field
        v-model="atributeType.name"
        :counter="0"
        :rules="atributeTypeRules.name"
        :label="atributeTypeLabel.name"
        required
      ></v-text-field>

      <!--     <v-text-field
      v-model="atributeType.description"
      :counter="0"
      :rules="atributeTypeRules.description"
      :label="atributeTypeLabel.description"
      ></v-text-field>-->

      <div v-if="atributeType.values.length">
        <p style="font-size: 17px">Atributos</p>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(value, index) in atributeType.values" :key="index">
                <td class="d-flex">
                  <span class="my-auto mx-auto">{{ value }}</span>
                  <v-btn
                    class="float-right my-auto"
                    color="error"
                    @click="removeAtributeValue(index)"
                  >x</v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>

      <v-btn color="success" class="my-4" @click="addAtributeValueDialog=true">Agregar Valor</v-btn>

      <br />

      <v-btn
        :disabled="!atributeTypeValid || !atributeType.values.length"
        color="success"
        class="mr-4"
        @click="onSubmitAtributeType"
      >Agregar</v-btn>
    </v-form>

    <!-- Dialog: Agregar Tipo de Atributo -->
    <v-dialog v-model="addAtributeValueDialog" max-width="690">
      <v-card>
        <v-card-title>Agregar Valor</v-card-title>
        <v-card-text>
          <AtributeValueForm @send-value="addAtributeValue" :type="atributeType.type"></AtributeValueForm>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  import AtributeValueForm from '@/components/forms/AtributeValue'

  export default {
    components: {
      AtributeValueForm,
    },
    data: () => ({
      atributeTypeValid: true,

      typeItems: ["string", "float", "integer", "color"],
      typeItemsLabel: {
        string: "Texto",
        float: "Decimal",
        integer: "Entero",
        color: "Color"
      },

      atributeType: {
        masterProductId: undefined,
        type: "string",
        name: undefined,
        description: undefined,
        values: []
      },
      atributeTypeRules: {
        name: [
          v => !!v || `Un nombre es requerido!`,
        ],
        description: [],
      },
      atributeTypeLabel: {
        type: "Tipo de atributo",
        name: "Nombre",
        description: "Descripcion",
      },

      addAtributeValueDialog: false
    }),
    methods: {
      onSubmitAtributeType() {
        this.$emit('send-atributes', this.atributeType)
        this.atributeType = {
          masterProductId: undefined,
          type: "string",
          name: undefined,
          description: undefined,
          values: []
        }
      },
      addAtributeValue(value) {
        this.atributeType.values.push(value)
        this.addAtributeValueDialog = false
        
      },
      removeAtributeValue(index) {
        this.atributeType.values.splice(index,1)
      }
    },
  };
</script>

<style></style>
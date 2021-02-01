<template>
  <div>
    <v-form ref="form" v-model="masterProductValid" class="text-center">
      <v-text-field
        v-model="masterProduct.name"
        :counter="100"
        :rules="masterProductRules.name"
        :label="masterProductLabel.name"
        required
      ></v-text-field>

      <v-text-field
        v-model="masterProduct.description"
        :counter="1000"
        :rules="masterProductRules.description"
        :label="masterProductLabel.description"
      ></v-text-field>

      <div v-if="atributes.length">
        <p style="font-size: 17px">Atributos</p>
        <v-data-table
          hide-default-footer
          :headers="[
            {
              text: 'Nombre',
              value: 'name',
            },
            {
              text: 'Valores',
              value: 'values',
            },
            {
              text: 'Acciones',
              value: 'actions',
              sortable: false,
            },
          ]"
          :items="atributes"
          class="elevation-1"
        >
          <template v-slot:item.values="{ item }">
            <div v-for="(value, i) in item.values" :key="i">
              <p class="my-1">{{ value }}</p>
            </div>
          </template>
        </v-data-table>
      </div>

      <v-btn color="success" @click="addAtributeTypeDialog = true" class="my-2"
        >Agregar Atributo</v-btn
      >

      <br />

      <v-btn
        :disabled="!masterProductValid || !atributes.length"
        color="success"
        class="mt-4"
        @click="onSubmitMasterProduct"
        >Crear</v-btn
      >
    </v-form>

    <!-- Dialog: Agregar Atributo -->
    <v-dialog v-model="addAtributeTypeDialog" max-width="690">
      <v-card>
        <v-card-title>Agregar Atributo</v-card-title>
        <v-card-text>
          <AtributeTypeForm
            @send-atributes="addAtributeType"
          ></AtributeTypeForm>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
import AtributeTypeForm from '@/components/forms/AtributeType';

export default {
  components: {
    AtributeTypeForm,
  },
  data: () => ({
    masterProductValid: true,

    masterProduct: {
      shopId: undefined,
      name: undefined,
      description: undefined,
    },
    masterProductRules: {
      name: [
        (v) => !!v || `El nombre es requerido!`,
        (v) =>
          (v && v.length < 100) ||
          'El nombre debe tener menos de 100 caracteres!',
      ],
      description: [
        (v) =>
          v.length < 1000 ||
          'La descripción debe tener menos de 1000 caracteres!',
      ],
    },
    masterProductLabel: {
      name: 'Nombre',
      description: 'Descripcion',
    },

    addAtributeTypeDialog: false,
    atributes: [],
  }),
  computed: {
    ...mapGetters('auth', ['currentShop']),
  },
  methods: {
    async onSubmitMasterProduct() {
      this.masterProduct.shopId = this.currentShop.id;

      this.$http
        .post(`shop/${this.currentShop.id}/master-product`, {
          masterProduct: this.masterProduct,
          atributes: this.atributes,
        })
        .then((res) => {
          this.$emit('send-master-product', res.data.data);
          this.$toast.success('Producto maestro creado!');
        })
        .catch((err) => console.log(err.response));
    },

    addAtributeType(atributeType) {
      this.atributes.push(atributeType);
      this.addAtributeTypeDialog = false;
    },
    removeAtributeType(index) {
      this.atributes.push(atributeType);
    },
  },
};
</script>

<style></style>

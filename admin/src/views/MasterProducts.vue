<template>
  <v-container fluid class="mx-0 my-2">
    <!--Agregar Producto-->
    <div class="text-center mb-4">
      <v-btn outlined color="primary" @click="addProductDialog = true">
        <v-icon left>mdi-plus</v-icon>Agregar Producto Maestro
      </v-btn>
    </div>

    <!--Tabla-->
    <div>
      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="masterProducts"
        :loading="loading"
        show-expand
        multi-sort
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <MasterProduct :masterProduct="item" class="ma-2"></MasterProduct>
          </td>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2">mdi-pencil</v-icon>
          <v-icon small>mdi-delete</v-icon>
        </template>
        <template v-slot:item.hasAtributes="{ item }">
          <v-simple-checkbox
            v-model="item.hasAtributes"
            disabled
          ></v-simple-checkbox>
        </template>
        <template v-slot:item.visible="{ item }">
          <v-simple-checkbox v-model="item.visble" disabled></v-simple-checkbox>
        </template>
      </v-data-table>
    </div>

    <!-- Dialog: Agregar Producto -->
    <v-dialog v-model="addProductDialog" max-width="690">
      <v-card>
        <v-card-title>Agregar Producto Maestro</v-card-title>
        <v-card-text>
          <MasterProductForm
            @send-master-product="addMasterProduct"
          ></MasterProductForm>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>


<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import Query from '../utils/query';

export default {
  name: '',
  components: {
    MasterProduct: () => import('@/components/masterProducts/MasterProduct'),
    MasterProductForm: () => import('@/components/forms/MasterProduct'),
  },
  data() {
    return {
      totalMasterProducts: null,
      loading: true,
      masterProducts: [],
      options: {},
      headers: [
        { text: 'Nombre', value: 'name' },
        { text: 'Descripcion', value: 'description' },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],

      addProductDialog: false,
    };
  },
  computed: {
    ...mapGetters('auth', ['currentShop']),
  },
  methods: {
    ...mapActions('auth', ['getUser']),
    getMasterProducts() {
      // const { sortBy, sortDesc, page, itemsPerPage } = this.options
      // const url = new Query(`shop/${this.currentShop.id}/product`).sortBy(sortBy[0], sortDesc[0]).paginate(page, itemsPerPage).graph("[brand, category]").query

      const url = new Query(`shop/${this.currentShop.id}/master-product`).query;
      console.log('url ', url);

      this.loading = true;
      this.$http
        .get(url)
        .then((response) => {
          this.masterProducts = response.data.data.data;
          this.totalMasterProducts = response.data.data.results;
        })
        .finally((this.loading = false));
    },
    addMasterProduct(payload) {
      this.getMasterProducts();
      this.addProductDialog = false;
    },
  },
  async created() {
    // await this.getUser();
    await this.getMasterProducts();
  },
};
</script>

<style lang="scss" scoped>
</style>

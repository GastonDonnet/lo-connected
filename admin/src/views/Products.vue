<template>
  <v-container fluid class="mx-0 my-2">
    <!--Agregar Producto-->
    <div class="text-center mb-4">
      <v-btn outlined color="primary" @click="addProductDialog = true">
        <v-icon left>mdi-plus</v-icon>Agregar Producto
      </v-btn>
    </div>

    <!--Tabla-->
    <div>
      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="products"
        :loading="loading"
        multi-sort
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <Product :product="item" class="ma-2"></Product>
          </td>
        </template>

        <template v-slot:item.stock="{ item }">
          <span>{{ item.variants[0].stock }}</span>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" color="warning" @click="editProduct(item)"
            >mdi-pencil</v-icon
          >
          <v-icon small>mdi-delete</v-icon>
        </template>
        <template v-slot:item.hasAtributes="{ item }">
          <v-simple-checkbox
            :value="!!item.hasAtributes"
            disabled
          ></v-simple-checkbox>
        </template>
        <template v-slot:item.active="{ item }">
          <!-- <v-btn @click="toggleActive(item)">{{!!item.active}}</v-btn> -->
          <v-simple-checkbox
            :value="!!item.active"
            @input="toggleActive(item)"
            :ripple="false"
          ></v-simple-checkbox>
        </template>
      </v-data-table>
    </div>

    <!-- Dialog: Agregar Producto -->
    <v-dialog v-model="addProductDialog" max-width="690">
      <v-card>
        <v-card-title>Agregar Producto</v-card-title>
        <v-card-text>
          <ProductForm @product-created="getProducts()"></ProductForm>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Dialog: Editar Producto -->
    <v-dialog v-model="editDialog.state" max-width="690">
      <v-card>
        <v-card-title>Editar Producto</v-card-title>
        <v-card-text>
          <ProductForm
            @product-created="getProducts()"
            :propProduct="editDialog.product"
            :edit="true"
          ></ProductForm>
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
    Product: () => import('@/components/products/Product'),
    ProductForm: () => import('@/components/forms/Product'),
  },
  data() {
    return {
      loading: true,
      // totalProducts: 0,
      products: [],
      options: {},
      headers: [
        {
          text: 'Nombre',
          value: 'name',
        },
        {
          text: 'Marca',
          value: 'brand.name',
        },
        {
          text: 'Modelo',
          value: 'model',
        },
        {
          text: 'Categoria',
          value: 'category.name',
        },
        {
          text: 'Codigo de barras',
          value: 'barcode',
        },
        {
          text: 'Stock (u)',
          value: 'stock',
        },
        {
          text: 'Precio ($)',
          value: 'price',
        },
        {
          text: 'Atributos',
          value: 'hasAtributes',
        },
        {
          text: 'Acciones',
          value: 'actions',
          sortable: false,
        },
        {
          text: 'Activo',
          value: 'active',
        },
      ],

      addProductDialog: false,
      editDialog: {
        state: false,
        product: {},
      },
    };
  },
  // watch: {
  //   options: {
  //     async handler () {

  //       if (this.currentShop.id!=undefined){
  //         await this.getProducts()
  //       }
  //     },
  //     deep: true,
  //   },
  // },
  computed: {
    ...mapGetters('auth', ['currentShop']),
  },
  methods: {
    ...mapActions('auth', ['getUser']),
    getProducts() {
      const url = new Query(`shop/${this.currentShop.id}/product`).graph(
        '[brand, category, variants]'
      ).query;
      this.loading = true;
      this.$http
        .get(url)
        .then((response) => {
          this.products = response.data.data.data;
          this.totalProducts = response.data.data.results;
        })
        .finally(() => {
          this.loading = false;
          this.addProductDialog = false;
        });
    },
    editProduct(product) {
      (this.editDialog.product = product), (this.editDialog.state = true);
    },
    toggleActive(item) {
      this.$http
        .patch(`/shop/${this.currentShop.id}/product/${item.id}`, {
          active: !item.active,
        })
        .catch((err) => console.log(err.response))
        .then((res) => (item.active = !item.active));
    },
  },
  async created() {
    // await this.getUser();
    await this.getProducts();
  },
};
</script>

<style lang="scss" scoped>
</style>

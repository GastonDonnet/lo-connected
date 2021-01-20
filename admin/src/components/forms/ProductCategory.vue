<template>
  <div>
    <v-form ref="form" v-model="productCategoryValid" class="text-center">
      <v-autocomplete
        v-model.number="productCategory.categoryId"
        :rules="productCategoryRules.categoryId"
        :label="productCategoryLabel.categoryId"
        :items="productCategoryParent.items"
        item-text="name"
        item-value="id"
      >
        <template v-if="productCategory.categoryId" v-slot:append-outer>
          <v-icon color="danger" @click="productCategory.categoryId = undefined"
            >mdi-close-circle</v-icon
          >
        </template>
        <template v-else v-slot:append-outer>
          <v-icon
            color="success"
            @click="productCategoryParent.state = !productCategoryParent.state"
            >mdi-plus</v-icon
          >
        </template>
      </v-autocomplete>

      <v-text-field
        v-model="productCategory.name"
        :counter="50"
        :rules="productCategoryRules.name"
        :label="productCategoryLabel.name"
        required
      ></v-text-field>

      <v-btn
        :disabled="!productCategoryValid"
        color="success"
        class="mr-4"
        @click="onSubmitProductCategory"
        >Enviar</v-btn
      >
    </v-form>

    <v-dialog v-model="productCategoryParent.state" max-width="690">
      <v-card>
        <v-card-title>Agregar Categoria</v-card-title>
        <v-card-text>
          <product-category-form
            @set-product-category="setProductCategory"
          ></product-category-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'product-category-form',

  data: () => ({
    productCategoryValid: true,

    productCategory: {
      categoryId: undefined,
      name: '',
      visible: true,
    },
    productCategoryRules: {
      name: [
        (v) => !!v || `Nombre es requerido!`,
        (v) =>
          (v && v.length >= 5) || 'Nombre debe tener al menos 5 caracteres!',
        (v) =>
          (v && v.length < 50) || 'Nombre debe tener menos de 50 caracteres!',
      ],
    },
    productCategoryLabel: {
      categoryId: 'Categoria de Producto (Padre)',
      name: 'Nombre',
      visible: 'Visible',
    },

    productCategoryParent: {
      state: false,
      items: [],
    },
  }),

  computed: {
    ...mapGetters('auth', ['currentShop']),
  },

  methods: {
    onSubmitProductCategory() {
      this.productCategory.shopId = this.currentShop.id;
      this.$http
        .post(`shop/${this.currentShop.id}/category`, this.productCategory)
        .then((res) => {
          this.$emit('set-product-category', res.data.data);
        })
        .catch((err) => console.log(err.response));
    },
    getProductCategories() {
      this.$http.get(`shop/${this.currentShop.id}/category`).then((res) => {
        this.productCategoryParent.items = res.data.data.data;
      });
    },
    setProductCategory(productCategory) {
      this.productCategoryParent.items.push(productCategory);
      this.productCategory.categoryId = productCategory.id;
      this.productCategoryParent.state = false;
    },
  },
  async mounted() {
    await this.getProductCategories();
  },
};
</script>

<style></style>

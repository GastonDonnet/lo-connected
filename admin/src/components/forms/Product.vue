<template>
  <div>
    <v-form ref="form" v-model="productValid" class="text-center">
      <v-file-input
        label="Imagenes del producto"
        multiple
        show-size
        chips
        prepend-icon="mdi-camera"
        v-model="productImages"
        accept="image/png, image/jpeg, image/bmp"
      ></v-file-input>

      <swiper class="swiper" :options="swiperOption">
        <swiper-slide
          v-for="(image, i) in productImagesUrls"
          :key="i"
          class="my-auto"
        >
          <v-img :src="image"></v-img>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>

      <v-autocomplete
        v-model.number="product.categoryId"
        :rules="productRules.categoryId"
        :label="productLabel.categoryId"
        :items="productCategory.items"
        item-text="name"
        item-value="id"
      >
        <template v-if="product.categoryId" v-slot:append-outer>
          <v-icon color="danger" @click="product.categoryId = undefined"
            >mdi-close-circle</v-icon
          >
        </template>
        <template v-else v-slot:append-outer>
          <v-icon
            color="success"
            @click="productCategory.state = !productCategory.state"
            >mdi-plus</v-icon
          >
        </template>
      </v-autocomplete>

      <!--
      <v-text-field
        v-model.number="product.saleCategoryId"
        :rules="productRules.saleCategoryId"
        :label="productLabel.saleCategoryId"
      ></v-text-field>-->

      <v-text-field
        v-model="product.name"
        :rules="productRules.name"
        :label="productLabel.name"
        required
      ></v-text-field>

      <v-text-field
        v-model="product.description"
        :rules="productRules.description"
        :label="productLabel.description"
      ></v-text-field>

      <v-autocomplete
        v-model.number="product.brandId"
        :rules="productRules.brandId"
        :label="productLabel.brandId"
        :items="productBrand.items"
        item-text="name"
        item-value="id"
      >
        <template v-if="product.brandId" v-slot:append-outer>
          <v-icon color="danger" @click="product.brandId = undefined"
            >mdi-close-circle</v-icon
          >
        </template>
        <template v-else v-slot:append-outer>
          <v-icon
            color="success"
            @click="productBrand.state = !productBrand.state"
            >mdi-plus</v-icon
          >
        </template>
      </v-autocomplete>

      <v-text-field
        v-model="product.model"
        :rules="productRules.model"
        :label="productLabel.model"
      ></v-text-field>

      <v-text-field
        v-model="product.barcode"
        :rules="productRules.barcode"
        :label="productLabel.barcode"
      ></v-text-field>

      <v-text-field
        v-model.number="product.price"
        :rules="productRules.price"
        :label="productLabel.price"
        required
        prefix="$"
      ></v-text-field>

      <v-checkbox
        v-model="product.hasAtributes"
        label="Tiene atributos? (No implementado aun)"
        disabled
      ></v-checkbox>
      <!-- Atributos no modelados en el BACKEND (disabled) -->

      <!--Master Product-->
      <v-autocomplete
        v-if="product.hasAtributes"
        v-model.number="product.masterProductId"
        :label="productLabel.masterProductId"
        :items="masterProduct.items"
        item-text="name"
        item-value="id"
        @change="atributes.selected = []"
      >
        <template v-if="product.masterProductId" v-slot:append-outer>
          <v-icon color="danger" @click="product.masterProductId = undefined"
            >mdi-close-circle</v-icon
          >
        </template>
      </v-autocomplete>

      <!--Atributos-->
      <v-select
        v-if="product.hasAtributes & !!product.masterProductId"
        v-model="atributes.selected"
        :items="atributesItems"
        label="Atributos"
        item-text="name"
        multiple
      >
        <template v-slot:prepend-item>
          <v-list-item ripple @click="toggleAllAtributes">
            <v-list-item-action>
              <v-icon
                :color="atributes.selected.length > 0 ? 'indigo darken-4' : ''"
                >{{ atributesIcon }}</v-icon
              >
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Seleccionar todos</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider class="mt-2"></v-divider>
        </template>
      </v-select>

      <v-btn
        :disabled="!productValid"
        color="success"
        class="mr-4"
        @click="onSubmitProduct"
        >Submit</v-btn
      >
    </v-form>

    <!--Dialog: ProductCategory-->
    <v-dialog v-model="productCategory.state" max-width="690">
      <v-card>
        <v-card-title>Agregar Categoria</v-card-title>
        <v-card-text>
          <ProductCategoryForm
            @set-product-category="setProductCategory"
          ></ProductCategoryForm>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!--Dialog: Brand-->
    <v-dialog v-model="productBrand.state" max-width="690">
      <v-card>
        <v-card-title>Agregar Marca</v-card-title>
        <v-card-text>
          <ProductBrandForm
            @set-product-brand="setProductBrand"
          ></ProductBrandForm>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import axios from 'axios';
import { mapGetters, mapState } from 'vuex';
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

export default {
  components: {
    ProductCategoryForm: () => import('../forms/ProductCategory'),
    ProductBrandForm: () => import('../forms/ProductBrand'),
    Swiper,
    SwiperSlide,
  },
  directives: {
    swiper: directive,
  },
  props: {
    propProduct: {
      type: Object,
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    productValid: true,

    product: {
      shopId: undefined,
      categoryId: undefined,
      masterProductId: undefined,
      saleCategoryId: undefined,
      name: '',
      description: '',
      model: '',
      barcode: '',
      price: undefined,
      taxIncluded: undefined,
      hasAtributes: false,
      avgRating: undefined,
      masterProductId: undefined,
    },
    productRules: {
      name: [
        (v) => !!v || `Nombre es requerido!`,
        (v) =>
          (v && v.length < 100) || 'Nombre debe tener menos de 100 caracteres!',
      ],
      description: [
        (v) =>
          v.length < 1000 || 'Description debe tener menos de 1000 caracteres!',
      ],
      model: [
        (v) => v.length < 100 || 'Model debe tener menos de 100 caracteres!',
      ],
      barcode: [
        (v) => v.length < 500 || 'Barcode debe tener menos de 500 caracteres!',
      ],
      price: [(v) => !!v || `Precio es requerido!`],
    },
    productLabel: {
      categoryId: 'Categoria del producto',
      brandId: 'Marca (opcional)',
      saleCategoryId: 'Descuento de categoria (opcional)',
      name: 'Nombre',
      description: 'Descripcion (opcional)',
      model: 'Modelo (opcional)',
      barcode: 'Codigo de barras (opcional)',
      price: 'Precio',
      taxIncluded: 'Impuestos incluidos',
      masterProductId: 'Producto Maestro',
    },

    productCategory: {
      state: false,
      items: [],
    },
    productBrand: {
      state: false,
      items: [],
    },
    masterProduct: {
      items: [],
    },
    atributes: {
      selected: [],
    },
    productImages: [],
  }),

  computed: {
    ...mapGetters('auth', ['currentShop']),

    selectedAllAtributes() {
      return this.atributes.selected.length === this.atributesItems.length;
    },
    selectedSomeAtributes() {
      return this.atributes.selected.length > 0 && !this.selectedAllAtributes;
    },
    atributesIcon() {
      if (this.selectedAllAtributes) return 'mdi-close-box';
      if (this.selectedSomeAtributes) return 'mdi-minus-box';
      return 'mdi-checkbox-blank-outline';
    },
    atributesItems() {
      console.log(this.product.masterProductId);
      console.log(
        this.masterProduct.items.find(
          (el) => el.id === this.product.masterProductId
        )
      );
      return this.masterProduct.items.find(
        (el) => el.id === this.product.masterProductId
      ).atributes;
    },
    productImagesUrls() {
      return this.productImages.map((el) => URL.createObjectURL(el));
    },
    swiperOption() {
      // const slidesPerView = parseInt(this.$vuetify.breakpoint.width/120)
      let slidesPerView = 3;
      if (this.$vuetify.breakpoint.smAndDown) slidesPerView = 3;
      else if (this.$vuetify.breakpoint.mdAndDown) slidesPerView = 6;
      else if (this.$vuetify.breakpoint.lgAndDown) slidesPerView = 8;
      else if (this.$vuetify.breakpoint.xlOnly) slidesPerView = 10;
      return {
        slidesPerView: slidesPerView,
        spaceBetween: 30,
        freeMode: true,
      };
    },
  },

  methods: {
    onSubmitProduct() {
      this.product.shopId = this.currentShop.id;

      const formData = new FormData();
      console.log(this.productImages);
      formData.append('product', JSON.stringify(this.product));
      formData.append('atributes', JSON.stringify(this.atributes));
      formData.append('photos', this.productImages[0]);

      if (this.edit == false) {
        axios
          .post(
            `${this.$apiUrl}shop/${this.currentShop.id}/product`,
            formData,
            {
              headers: {
                'content-type': 'multipart/form-data',
              },
              withCredentials: true,
            }
          )
          .catch((err) => console.log(err.response))
          .then((res) => this.$emit('product-created'));
      } else if (this.edit == true) {
        axios
          .put(
            `${this.$apiUrl}shop/${this.currentShop.id}/product/${this.product.id}`,
            formData,
            {
              headers: {
                'content-type': 'multipart/form-data',
              },
              withCredentials: true,
            }
          )
          .catch((err) => console.log(err.response))
          .then((res) => this.$emit('product-created'));
      }
    },
    getProductCategories() {
      this.$http.get(`shop/${this.currentShop.id}/category`).then((res) => {
        console.log(this.currentShop.id);
        this.productCategory.items = res.data.data.data;
      }); //TODO: VER QUE ESTA INFO YA ESTA EN CURRENTSHOP
    },
    setProductCategory(productCategory) {
      this.productCategory.items.push(productCategory);
      this.product.categoryId = productCategory.id;
      this.productCategory.state = false;
    },
    getProductBrands() {
      this.$http.get(`product/brand`).then((res) => {
        this.productBrand.items = res.data.data.data;
      });
    },
    setProductBrand(productBrand) {
      console.log(productBrand);
      this.productBrand.items.push(productBrand);
      this.product.brandId = productBrand.id;
      this.productBrand.state = false;
    },
    getMasterProducts() {
      this.$http
        .get(`shop/${this.currentShop.id}/master-product`)
        .then((res) => {
          this.masterProduct.items = res.data.data.data;
        });
    },
    toggleAllAtributes() {
      this.$nextTick(() => {
        if (this.selectedAllAtributes) {
          this.atributes.selected = [];
        } else {
          this.atributes.selected = this.atributesItems;
        }
      });
    },
  },
  async created() {
    await this.getProductCategories();
    await this.getProductBrands();
    await this.getMasterProducts();
    if (this.propProduct) Object.assign(this.product, this.propProduct);
  },
};
</script>

<style></style>

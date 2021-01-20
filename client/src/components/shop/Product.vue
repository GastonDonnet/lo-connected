<template>
  <v-card
    :flat="true"
    class="flex flex-column fill-height"
    :class="productQuantity ? 'active-product' : ''"
  >
    <v-row no-gutters class="py-1">
      <v-col class="text-center">
        <v-chip v-if="product.hasAtributes" small color="primary">
          Con opciones
        </v-chip>
        <v-chip v-else small color="transparent" disabled> </v-chip>
      </v-col>
    </v-row>
    <v-img
      v-if="product.images.length"
      :src="`${staticUrl}img/product/${product.images[0].path}`"
    ></v-img>
    <v-img v-else :src="`${staticUrl}img/product/no-product-img.jpeg`"></v-img>

    <!--Productos sin atributos-->
    <v-row>
      <v-col class="text-center" v-if="!product.hasAtributes">
        <p class="body-2">
          {{
            `${product.name} ${product.brand ? product.brand.name : ''} ${
              product.model || ''
            }`
          }}
        </p>
        <p class="title accent--text">${{ product.price }}</p>
        <v-btn
          icon
          small
          color="success"
          v-if="quantity == 0"
          @click="modifyQuantity(1)"
        >
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
        <div v-else class="text-center">
          <v-row no-gutters justify="center" align="center">
            <v-col>
              <v-btn icon small color="error" @click="modifyQuantity(-1)">
                <v-icon dark>mdi-minus</v-icon>
              </v-btn>
            </v-col>
            <v-col>
              <p class="font-weight-bold">{{ quantity }}</p>
            </v-col>
            <v-col>
              <v-btn icon small color="success" @click="modifyQuantity(1)">
                <v-icon dark>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-col>

      <!--Productos con atributos-->
      <v-col class="text-center" v-else>
        <p class="body-2">
          {{
            `${product.name} ${product.brand ? product.brand.name : ''} ${
              product.model || ''
            }`
          }}
        </p>
        <p class="font-weight-light body-2">A partir de:</p>
        <p class="title accent--text">${{ product.price }}</p>
        <v-btn
          icon
          small
          color="success"
          v-if="productQuantity == 0"
          @click="editProductWithAtributes()"
        >
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
        <v-row v-else no-gutters>
          <v-col>
            <v-btn
              icon
              small
              color="warning"
              @click="
                $router.push({ name: 'Cart', params: { id: currentShop.id } })
              "
            >
              <v-icon dark>mdi-pen</v-icon>
            </v-btn>
          </v-col>
          <v-col>
            <p class="font-weight-bold">{{ productQuantity }}</p>
          </v-col>
          <v-col>
            <v-btn
              icon
              small
              color="success"
              @click="editProductWithAtributes()"
            >
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!--Dialog de productos con atributos-->
    <v-dialog v-model="editing" class="z2">
      <v-card class="pa-2">
        <v-btn class="float-right" color="error" icon @click="editing = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-card-title>{{
          `${product.name} ${product.brand ? product.brand.name : ''} ${
            product.model || ''
          }`
        }}</v-card-title>

        <v-card-text>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et laborum
          cum maxime omnis iste accusantium nobis, dignissimos aut illo eos
          dolore delectus consequatur ipsa deserunt aliquam quas illum rerum
          esse?
        </v-card-text>
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide v-for="i in 10" :key="i">
            <v-img
              src="https://walmartar.vteximg.com.br/arquivos/ids/859471-292-292/Cereal-Almohaditas-Avena-3-Arroyos-250-Gr-2101.jpg?v=637201730299670000"
              contain
              max-height="160px"
            ></v-img>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <v-form>
          <v-row no-gutters>
            <v-col>
              <v-row
                v-for="(atribute, i) in productDetail.atributes"
                :key="i"
                no-gutters
                class="my-3"
              >
                <v-col>
                  {{ atribute.name }}
                  <v-divider></v-divider>

                  <v-btn-toggle
                    v-model="selectedAtributes[atribute.id]"
                    mandatory
                    color="accent"
                  >
                    <v-btn
                      v-for="(value, ii) in atribute.values"
                      :key="i + '-' + ii"
                      >{{ value.value }}</v-btn
                    >
                  </v-btn-toggle>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <div class="text-center" v-if="quantity == 0">
            <v-btn icon small color="success" @click="modifyQuantity(1)">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </div>
          <div v-else class="text-center">
            <v-row no-gutters justify="center" align="center">
              <v-col>
                <v-btn icon small color="error" @click="modifyQuantity(-1)">
                  <v-icon dark>mdi-minus</v-icon>
                </v-btn>
              </v-col>
              <v-col>
                <p class="font-weight-bold">{{ quantity }}</p>
              </v-col>
              <v-col>
                <v-btn icon small color="success" @click="modifyQuantity(1)">
                  <v-icon dark>mdi-plus</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </div>

          <v-btn
            class="mt-3"
            block
            color="success"
            depressed
            :disabled="!quantity"
            @click="finishEditing()"
            >Agregar
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  directives: {
    swiper: directive,
  },
  props: {
    flat: {
      type: Boolean,
      default: false,
    },
    product: Object,
  },
  data() {
    return {
      quantity: 0,

      selectedAtributes: {},
      variant: {},
      editing: false,
      productDetail: {
        atributes: [],
      },
      loading: false,
    };
  },
  methods: {
    ...mapActions('cart', ['addOrUpdateProductToCart']),
    async modifyQuantity(num) {
      if (!this.productDetail.variants) {
        this.loading = true;
        const res = await this.$http.get(`product/${this.product.id}`);
        this.productDetail = res.data.data.data;
        this.loading = false;
      }

      if (this.quantity + num < 1) this.quantity = 0;
      if ((this.quantity + num) % 1 !== 0)
        this.quantity = parseInt(this.quantity, 10);
      this.variant = this.productDetail.variants[0];

      if (!this.product.hasAtributes) {
        // Si producto no tiene atributos actualizo base de datos directo
        this.loading = true;

        const variant = await this.addOrUpdateProductToCart({
          variant: this.variant,
          quantity: this.quantity + num,
        });

        this.loading = false;
        this.quantity = variant.quantity || 0;
      } else {
        this.quantity += num;
      }
    },
    async editProductWithAtributes() {
      this.editing = true;

      if (!this.product.variants) {
        this.loading = true;
        const response = await this.$http.get(`product/${this.product.id}`);
        this.productDetail = response.data.data.data;
        this.loading = false;
      }

      if (this.product.hasAtributes && this.productQuantity > 0) {
        this.quantity = 0;
        this.selectedAtributes = {};
      }
    },

    async finishEditing(status) {
      this.editing = false;

      // Inicio Parte 1
      // Te devuelve un array de arrays del tipo: [[1, 2], [2, 5]] => [atributeType.id, atributeValue.id]
      const atributes = [];
      let atributeValueId = null;
      let atributeValueIndex = null;

      Object.keys(this.selectedAtributes).forEach((atributeTypeId) => {
        atributeValueIndex = this.selectedAtributes[atributeTypeId];

        atributeValueId = this.productDetail.atributes.filter((atr) => {
          return atr.id == atributeTypeId;
        })[0].values[atributeValueIndex].id;

        atributes.push([atributeTypeId * 1, atributeValueId]);
      });
      // Fin parte 1

      // Inicio Parte 2
      // Busca el ProductVariant relacionado a los atributos

      this.productDetail.variants.some((variant) => {
        const variantAtributes = variant.atributes.map((atr) => {
          return [atr.atributeTypeId, atr.id];
        });

        if (JSON.stringify(atributes) === JSON.stringify(variantAtributes)) {
          // TODO: COMO COMPARA DOS STRING, VER SI PUEDE CAMBIAR EL ORDEN
          this.variant = variant;
          return true;
        }
      });
      // Fin Parte 2
      this.loading = true;

      await this.addOrUpdateProductToCart({
        variant: this.variant,
        quantity: this.quantity,
      });

      this.loading = false;
    },
  },
  computed: {
    swiperOption() {
      // const slidesPerView = parseInt(this.$vuetify.breakpoint.width/120)
      let slidesPerView = 3;
      if (this.$vuetify.breakpoint.smAndDown) slidesPerView = 3;
      else if (this.$vuetify.breakpoint.mdAndDown) slidesPerView = 6;
      else if (this.$vuetify.breakpoint.lgAndDown) slidesPerView = 8;
      else if (this.$vuetify.breakpoint.xlOnly) slidesPerView = 10;
      return {
        autoHeight: false,
        slidesPerView: slidesPerView,
        spaceBetween: 30,
        freeMode: true,
      };
    },
    ...mapState('shop', ['currentShop']),
    ...mapGetters('cart', ['products']),
    productQuantity() {
      return this.products[this.product.id] || 0;
    },

    staticUrl() {
      return this.$staticUrl;
    },
  },
  mounted() {
    if (!this.product.hasAtributes) this.quantity = this.productQuantity;
  },
};
</script>

<style lang="scss" scoped>
p {
  margin-bottom: 0 !important;
}

.active-product {
  box-shadow: -10px -10px 30px -30px #e05a00, 10px 10px 30px -30px #2ec4b6 !important;
}
</style>

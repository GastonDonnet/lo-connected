<template>
  <v-row no-gutters v-if="category.products.length">
    <v-col>
      <v-card tile flat class="my-1">
        <v-row no-gutters class="grey lighten-4 py-2 px-2 mb-1">
          <v-col>
            <p class="subtitle font-weight-bold py-0">
              {{ category.name }}
              <v-btn
                icon
                class="float-right"
                small
                @click="
                  $router.push({
                    name: 'Shop Products',
                    params: { categoryId: category.id },
                  })
                "
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </p>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col>
            <swiper class="swiper" :options="swiperOption">
              <swiper-slide
                v-for="(product, i) in category.products"
                :key="i"
                class="my-auto"
              >
                <Product flat :product="product"></Product>
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

export default {
  props: {
    category: Object,
  },
  components: {
    Swiper,
    SwiperSlide,
    Product: () => import('./Product'),
  },
  directives: {
    swiper: directive,
  },
  data() {
    return {
      products: [],
    };
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
        slidesPerView: slidesPerView,
        spaceBetween: 30,
        freeMode: true,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  margin-bottom: 0px !important;
}
</style>

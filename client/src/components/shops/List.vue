<template>
  <v-card tile flat class="pt-3 my-1 c-shadow-1" v-if="activeShops.length">
    <v-subheader
      class="font-weight-bold"
      style="height: 14px; font-size: 17px"
      >{{ shopList.name }}</v-subheader
    >
    <v-subheader class="font-weight-light my-1" style="height: 14px">{{
      shopList.description
    }}</v-subheader>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide
        v-for="(shop, i) in shopList.shops"
        :key="i"
        class="mb-auto"
      >
        <SummaryShop :flat="false" :shop="shop"></SummaryShop>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </v-card>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

export default {
  props: {
    shopList: {
      type: Object,
      required: true,
    },
  },
  components: {
    Swiper,
    SwiperSlide,
    SummaryShop: () => import('@/components/shops/Summary'),
  },
  directives: {
    swiper: directive,
  },
  computed: {
    activeShops() {
      return this.shopList.shops.filter((el) => el.active);
    },
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        freeMode: true,
        breakpoints: {
          1920: {
            slidesPerView: 3.4,
          },
          1024: {
            slidesPerView: 2.4,
          },
          768: {
            slidesPerView: 1.8,
          },
          640: {
            slidesPerView: 1.2,
          },
          320: {
            slidesPerView: 1.1,
          },
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
p {
  margin-bottom: 0px !important;
}
</style>

<template>
  <v-card flat tile class="pb-1 px-0 mx-0">
    <v-img
      class="white--text align-end"
      height="100px"
      :src="staticUrl + 'img/shop/' + shop.imgBanner"
      gradient="to top right, rgba(0, 0, 0, 0.13), rgba(255, 255, 255, 0.7)"
    >
      <v-card-title
        @click="$router.push({ name: 'Shop', params: { shopId: shop.id } })"
        >{{ shop.name }}</v-card-title
      >
    </v-img>

    <v-card-subtitle class="pb-0">{{ shop.address.street }}</v-card-subtitle>

    <v-card-text v-if="!hideDetails" class="text--primary">
      <span>{{ shop.description }}</span>
    </v-card-text>
    <!--TODO: REVIEWS-->
    <!-- 
    <div class="text-center">
      <v-rating
        v-model="rating"
        color="warning"
        background-color="grey"
        size="15"
        half-increments
        disabled
      ></v-rating>
    </div>
    <div class="px-3 pb-2 d-flex" :class="hideDetails?'justify-center':''"> 
      <v-chip
        small
        :color="shop.stateId == 1?'success':shop.stateId==2?'error':'warning'"
      >{{shop.state.name}}</v-chip>
      
      <p
        v-if="!hideDetails"
        class="tex--secondary font-weight-light caption ml-auto my-auto"
      >+500 ventas el ultimo mes</p>
    </div>-->
  </v-card>
</template>

<script>
export default {
  props: {
    shop: {
      type: Object,
      required: true,
    },
    hideDetails: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      rating: 4.2,
    };
  },
  computed: {
    staticUrl() {
      return this.$staticUrl;
    },
  },
};
</script>

<style scoped>
.v-card {
  overflow: hidden;
}
.v-card__text {
  width: inherit;
  max-height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  /* white-space: nowrap; */
}
</style>
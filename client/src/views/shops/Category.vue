<template>
  <v-container>
    <h3 class="font-weight-medium">{{ totalShops }} encontrados</h3>
    <v-row>
      <v-col v-for="shop in shops" :key="shop.id" cols="6" md="3">
        <SummaryShop :shop="shop" :hideDetails="true"></SummaryShop>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SummaryShop from '@/components/shops/Summary.vue';
import { mapState } from 'vuex';

export default {
  components: {
    SummaryShop,
  },
  data() {
    return {
      shops: [],
      totalShops: 0,
    };
  },
  computed: {
    ...mapState('shop', ['currentShop']),
  },
  methods: {
    getShops() {
      this.$http
        .get(
          `shop/?active=1&shopCategoryId=${this.$route.params.id}&graph=[address,state]`
        )
        .then((res) => {
          this.shops = res.data.data.data;
          this.totalShops = res.data.results;
          console.log(res);
        });
    },
  },
  created() {
    this.getShops();
  },
};
</script>

<style scoped>
.v-card.v-sheet {
  box-shadow: 20px 20px 20px -30px rgba(224, 90, 0, 1),
    -18px 20px 20px -30px rgb(46, 196, 182);
}
</style>

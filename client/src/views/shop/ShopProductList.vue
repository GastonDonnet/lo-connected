<template>
  <v-container>
    <v-row>
      <v-col
        cols="6"
        sm="4"
        md="3"
        lg="2"
        v-for="product in products"
        :key="product.id"
      >
        <Product :product="product"></Product>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Product from '@/components/shop/Product.vue';
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    Product,
  },
  data() {
    return {
      products: [],
      totalProducts: 0,
    };
  },
  computed: {
    ...mapState('shop', ['currentShop']),
  },
  methods: {
    ...mapActions('shop', ['getShop']),
    ...mapActions('cart', ['getOrCreateCart']),
    getProducts() {
      this.$http
        .get(
          `shop/${this.currentShop.id}/product?active=1&categoryId=${this.$route.params.categoryId}&graph=[atributes.values, brand, category, variants.atributes, images]`
        )
        .then((res) => {
          console.log(res);
          this.products = res.data.data.data;
          this.totalProducts = res.data.data.results;
        });
    },
  },
  async created() {
    await this.getShop(this.$route.params.shopId);
    await this.getOrCreateCart();
    if (this.$route.params.propProducts)
      this.products = this.$route.params.propProducts.entries;
    else this.getProducts();
  },
};
</script>

<style>
</style>
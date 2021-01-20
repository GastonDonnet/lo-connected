<template>
  <v-container>
    <!-- <v-btn color="accent" top right fixed small depressed style="top: 62px; z-index:1">Filtrar</v-btn> -->

    <v-list three-line>
      <template v-for="(shop, i) in shops">
        <v-list-item
          :key="i"
          @click="$router.push({ name: 'Shop', params: { shopId: shop.id } })"
        >
          <v-list-item-avatar tile height="50" width="50" horizontal>
            <v-img :src="staticUrl + 'img/shop/' + shop.imgLogo"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ shop.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ shop.description }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-container>
</template>

<script>
export default {
  name: 'Tiendas',
  data: () => ({
    shops: [],
  }),
  props: {
    propShops: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    getShops() {
      this.$http
        .get('shop?active=1')
        .then((res) => (this.shops = res.data.data.data));
    },
  },
  computed: {
    staticUrl() {
      return this.$staticUrl;
    },
  },
  created() {
    //console.log(this.$route.params.propShops)
    if (this.$route.params.propShops) {
      this.shops = this.$route.params.propShops.entries;
    } else {
      this.getShops();
    }
  },
};
</script>

<style>
</style>
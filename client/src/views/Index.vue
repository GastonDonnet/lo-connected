<template>
  <v-container class="my-2">
    <SearchShop
      route="shop/search/?search="
      @success="searchShops"
      placeholder="Tienda o producto..."
      label="Busca tiendas!"
    ></SearchShop>
    <CategoriesShop></CategoriesShop>

    <v-row style="margin: 0 -12px" v-if="newShops.shops.length">
      <v-col md="12" style="padding: 3px 0">
        <ShopList :shopList="newShops"></ShopList>
      </v-col>
    </v-row>

    <div v-for="(shopList, i) in shopLists" :key="i">
      <v-row style="margin: 0 -12px" v-if="shopList.shops.length">
        <v-col md="12" style="padding: 3px 0">
          <ShopList :shopList="shopList"></ShopList>
        </v-col>
      </v-row>
    </div>

    <v-btn
      class="mt-2"
      text
      block
      color="primary"
      @click="$router.push({ name: 'Shops' })"
      >Ver todas las tiendas!</v-btn
    >
  </v-container>
</template>

<script>
import CategoriesShop from '@/components/shops/Categories';
import SearchShop from '@/components/Search';
import ShopList from '@/components/shops/List';

export default {
  name: '',
  components: {
    CategoriesShop,
    SearchShop,
    ShopList,
    // CarrouselShop: () => import('@/components/shops/Carrousel'),
    // SummaryShop: () => import('@/components/shops/Summary'),
  },
  data() {
    return {
      shopLists: [],
      newShops: {
        description: 'Nuevas opciones en la ciudad!',
        name: 'Nuevos',
        shops: [],
      },
    };
  },
  methods: {
    async getShopLists() {
      const res = await this.$http.get(
        'list?graph=[shops.[address,state]]&limit=5&sort=createdAt'
      );

      this.shopLists = res.data.data.data;
    },
    async getNewShops() {
      const res = await this.$http.get('shop?active=1&graph=[address,state]');
      this.newShops.shops = res.data.data.data;
    },
    searchShops(shops) {
      this.$router.push({ name: 'Shops', params: { propShops: shops } });
    },
  },
  async created() {
    await this.getShopLists();
    await this.getNewShops();
  },
};
</script>

<style lang="scss" scope>
</style>

    <!-- LEGADO -->
    <!-- <div v-if="this.$vuetify.breakpoint.smAndDown">
      <v-row style="margin: 0 -12px" v-for="(shopList,i) in shopLists" :key="i">
        <v-col md="6" style="padding: 3px 0">
          <CarrouselShop :shopList="shopList"></CarrouselShop>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-row>
        <v-col md="6" lg="4" v-for="(shop,i) in shops" :key="i">
          <SummaryShop :flat="false" :shop="shop"></SummaryShop>
        </v-col>
      </v-row>
    </div>-->

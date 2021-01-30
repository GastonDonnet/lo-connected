<template>
  <v-container class="m-0 px-0 py-0" v-if="currentShop.active">
    <v-card class="pa-2" flat>
      <v-img :src="staticUrl + 'img/shop/' + currentShop.imgBanner">
        <v-row align="center" justify="center" style="height: 100%">
          <v-col>
            <h1 class="text-center accent shop-title-background">
              {{ currentShop.name }}
            </h1>
            <h1 class="text-center white--text" style="position: relative">
              {{ currentShop.name }}
            </h1>
          </v-col>
        </v-row>
      </v-img>

      <v-divider class="my-2"></v-divider>

      <v-row no-gutters class="my-2">
        <v-col class="text-center">
          <v-chip small class="mx-2 my-1">{{ currentShop.state.name }}</v-chip>
          <v-chip small class="mx-2 my-1">{{
            currentShop.deliveryCost != 0
              ? `Costo de Envio: $${currentShop.deliveryCost}`
              : 'Envio Gratis'
          }}</v-chip>
          <v-chip small class="mx-2 my-1" v-if="currentShop.deliveryMin"
            >Minimo para delivery ${{ currentShop.deliveryMin }}</v-chip
          >
        </v-col>
      </v-row>
      <v-row no-gutters class="my-2">
        <v-col class="text-center">
          <!--TODO: Ver tema de Reviews -->
          <!--  <v-rating
            v-model="currentShop.avgRating"
            color="warning"
            background-color="grey"
            size="15"
            half-increments
            readonly
          ></v-rating>
          <small>500 Opiniones</small>-->
        </v-col>
      </v-row>
      <div v-if="info">
        <p>{{ currentShop.description }}</p>
      </div>
      <v-btn
        depressed
        block
        color="accent"
        class="text-center my-2"
        @click="info = !info"
        >{{ !info ? 'Mas Informacion' : 'Ocultar Informacion' }}</v-btn
      >
      <v-divider class="my-2"></v-divider>
    </v-card>

    <Search
      class="my-2"
      :route="`shop/${this.currentShop.id}/product?active=1&graph=[images]&name[like]=`"
      @success="searchProducts"
      placeholder="Busca productos..."
      label="Producto"
    ></Search>

    <v-tabs v-model="tab" background-color="primary" dark centered grow>
      <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" touchless>
      <v-tab-item key="Catalogo">
        <v-row no-gutters>
          <v-col
            cols="12"
            v-for="(category, i) in currentShop.categories"
            :key="i"
          >
            <CatalogCategory :category="category"></CatalogCategory>
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item key="Categorias">
        <v-row no-gutters>
          <v-col
            cols="12"
            sm="6"
            md="3"
            v-for="(category, i) in currentShop.categories"
            :key="i"
          >
            <v-list>
              <v-list-item-group color="primary">
                <Category :category="category"></Category>
              </v-list-item-group>
            </v-list>
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  components: {
    CatalogCategory: () => import('@/components/shop/CatalogCategory.vue'),
    Search: () => import('@/components/Search'),
    Category: () => import('@/components/shop/Category'),
  },
  data() {
    return {
      tabs: ['Catalogo', 'Categorias'],
      tab: null,
      items: [{ tab: 'Catalogo' }, { tab: 'Categorias' }],
      info: false,
    };
  },
  computed: {
    ...mapState('shop', ['currentShop']),
    ...mapGetters('auth', ['loggedIn']),

    staticUrl() {
      return this.$staticUrl;
    },
  },
  methods: {
    ...mapActions('shop', ['getShop']),
    ...mapActions('cart', ['getOrCreateCart']),
    searchProducts(products) {
      this.$router.push({
        name: 'Shop Products',
        params: { propProducts: products },
      });
    },
  },
  async created() {
    await this.getShop(this.$route.params.shopId);
    if (this.loggedIn) {
      await this.getOrCreateCart();
    }
  },
};
</script>

<style lang="scss" scope>
.shop-title-background {
  filter: drop-shadow(white 0px 0px 50px) blur(50px) opacity(0.9);
  width: 100%;
  position: absolute;
}
</style>

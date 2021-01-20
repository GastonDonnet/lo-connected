<template>
  <div>
    <v-form ref="form" v-model="shopValid" class="text-center">
      <v-autocomplete
        v-model.number="shop.shopCategoryId"
        :rules="shopRules.shopCategoryId"
        :label="shopLabel.shopCategoryId"
        :items="shopCategory.items"
        item-text="name"
        item-value="id"
      >
        <template v-if="shop.shopCategoryId" v-slot:append-outer>
          <v-icon color="danger" @click="shop.shopCategoryId = undefined"
            >mdi-close-circle</v-icon
          >
        </template>
        <!-- <template v-else v-slot:append-outer>
          <v-icon
            color="success"
            @click="shopCategory.state = !shopCategory.state"
            >mdi-plus</v-icon
          >
        </template> -->
      </v-autocomplete>

      <v-text-field
        v-model="shop.name"
        :counter="30"
        :rules="shopRules.name"
        :label="shopLabel.name"
        required
      ></v-text-field>

      <v-text-field
        v-model="shop.telephone"
        :counter="30"
        :rules="shopRules.telephone"
        :label="shopLabel.telephone"
        required
      ></v-text-field>

      <v-text-field
        v-model="shop.telephone1"
        :counter="30"
        :rules="shopRules.telephone1"
        :label="shopLabel.telephone1"
      ></v-text-field>

      <v-text-field
        v-model="shop.telephone2"
        :counter="30"
        :rules="shopRules.telephone2"
        :label="shopLabel.telephone2"
      ></v-text-field>

      <v-text-field
        v-model.number="shop.deliveryMin"
        :rules="shopRules.deliveryMin"
        :label="shopLabel.deliveryMin"
      ></v-text-field>

      <v-text-field
        v-model.number="shop.deliveryCost"
        :rules="shopRules.deliveryCost"
        :label="shopLabel.deliveryCost"
      ></v-text-field>

      <v-autocomplete
        v-model.number="address.cityId"
        :items="cities"
        :item-text="(item) => `${item.name} - ${item.province.name}`"
        :label="addressLabel.cityId"
        outlined
        :rules="addressRules.cityId"
        return-object
      ></v-autocomplete>

      <v-text-field
        v-model="address.street"
        :counter="100"
        :rules="addressRules.street"
        :label="addressLabel.street"
        required
      ></v-text-field>

      <v-text-field
        v-model="address.note"
        :counter="200"
        :rules="addressRules.note"
        :label="addressLabel.note"
      ></v-text-field>

      <v-btn
        :disabled="!shopValid"
        color="success"
        class="mr-4"
        @click="onSubmitShop"
        >Submit</v-btn
      >
    </v-form>

    <!--Dialog: ShopCategory-->
    <!-- <v-dialog v-model="shopCategory.state" max-width="690">
      <v-card>
        <v-card-title>Agregar Categoria</v-card-title>
        <v-card-text>
          <ShopCategoryForm
            @set-shop-category="setShopCategory"
          ></ShopCategoryForm>
        </v-card-text>
      </v-card>
    </v-dialog> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  components: {
    // ShopCategoryForm: () => import('@/components/forms/ShopCategory.vue'),
  },

  data: () => ({
    shopValid: true,

    shop: {
      shopCategoryId: undefined,
      name: undefined,
      telephone: undefined,
      telephone1: undefined,
      telephone2: undefined,
      deliveryMin: undefined,
      deliveryCost: undefined,
    },
    shopLabel: {
      shopCategoryId: '*Categoria',
      name: '*Nombre',
      telephone: '*Telefono',
      telephone1: 'Telefono 2',
      telephone2: 'Telefono 3',
      deliveryMin: '*Costo minimo para delivery',
      deliveryCost: '*Costo de delivery',
    },

    shopCategory: {
      state: false,
      items: [],
    },

    address: {
      cityId: null,
      street: '',
      note: '',
    },

    addressLabel: {
      cityId: '*Ciudad',
      street: '*Calle',
      note: 'Nota',
    },

    cities: [],
  }),

  computed: {
    shopRules() {
      return {
        shopCategoryId: [
          (v) => !!v || `${this.shopLabel.shopCategoryId} es requerido!`,
          (v) =>
            (v && v % 1 === 0) || 'La categoria debe ser un numero entero!',
        ],
        name: [
          (v) => !!v || `${this.shopLabel.name} es requerido!`,
          (v) =>
            (v && v.length >= 3) ||
            'El nombredebe tener al menos 3 caracteres!',
          (v) =>
            (v && v.length < 30) ||
            'El nombre debe tener menos de 30 caracteres!',
        ],
        telephone: [
          (v) => !!v || `${this.shopLabel.telephone} es requerido!`,
          (v) =>
            (v && v.length >= 5) ||
            'El telefono debe tener al menos 5 caracteres!',
          (v) =>
            (v && v.length < 30) ||
            'El telefono debe tener menos de 30 caracteres!',
        ],
        telephone1: [
          (v) =>
            !v ||
            v.length >= 5 ||
            'El telefono debe tener al menos 5 caracteres!',
          (v) =>
            !v ||
            v.length < 30 ||
            'El telefono debe tener menos de 30 caracteres!',
        ],
        telephone2: [
          (v) =>
            !v ||
            v.length >= 5 ||
            'El telefono debe tener al menos 5 caracteres!',
          (v) =>
            !v ||
            v.length < 30 ||
            'El telefono debe tener menos de 30 caracteres!',
        ],
        deliveryMin: [
          (v) =>
            (v && v % 1 === 0) ||
            v === 0 ||
            'El costo minimo para delivery debe ser un numero entero!',
        ],
        deliveryCost: [
          (v) =>
            (v && v % 1 === 0) ||
            v === 0 ||
            'El costo debe ser un numero entero!',
        ],
      };
    },
    addressRules() {
      return {
        cityId: [(v) => !!v || `Por favor elige una ciudad.`],
        street: [
          (v) => !!v || `Por favor escrive una direccion.`,
          (v) =>
            (v && v.length < 100) ||
            'La direccion debe tener menos de 100 caracteres!',
        ],
        note: [
          (v) =>
            v.length < 200 || 'La nota debe tener menos de 200 caracteres!',
        ],
      };
    },
  },

  methods: {
    ...mapActions('auth', ['getUser']),
    async onSubmitShop() {
      this.address.cityId = this.address.cityId.id;
      this.shop.address = this.address;
      await this.$http.post('shop', this.shop);
      await this.getUser();
    },

    async getShopCategories() {
      await this.$http.get(`shop-category`).then((res) => {
        this.shopCategory.items = res.data.data.data;
      });
    },

    async getCities() {
      const response = await this.$http.get('location/city');
      this.cities = response.data.data.data;
    },
    // setShopCategory(shopCategory) {
    //   this.shopCategory.items.push(shopCategory);
    //   this.shop.shopCategoryId = shopCategory.id;
    //   this.shopCategory.state = false;
    // },
  },

  async created() {
    await this.getShopCategories();
    await this.getCities();
  },
};
</script>

<style></style>

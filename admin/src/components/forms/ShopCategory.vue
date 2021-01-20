<template>
  <v-form ref="form" v-model="shopCategoryValid" class="text-center">
    <!-- <v-text-field
      v-model.number="shopCategory.shopCategoryId"
      :rules="shopCategoryRules.shopCategoryId"
      :label="shopCategoryLabel.shopCategoryId"
    >
    </v-text-field> -->

    <v-text-field
      v-model="shopCategory.name"
      :counter="30"
      :rules="shopCategoryRules.name"
      :label="shopCategoryLabel.name"
      required
    ></v-text-field>

    <v-btn
      :disabled="!shopCategoryValid"
      color="success"
      class="mr-4"
      @click="onSubmitShopCategory"
      >Submit</v-btn
    >
  </v-form>
</template>
<script>
export default {
  data: () => ({
    shopCategoryValid: true,

    shopCategory: {
      // shopCategoryId: undefined,
      name: undefined,
    },
    shopCategoryRules: {
      // shopCategoryId: [
      //   (v) =>
      //     (v && v % 1 === 0) || 'shopCategoryId debe ser un numero entero!',
      // ],
      name: [
        (v) => !!v || `${this.shopCategoryLabel.name} es requerido!`,
        (v) =>
          (v && v.length >= 5) || 'El nombre debe tener al menos 5 caracteres!',
        (v) =>
          (v && v.length < 30) ||
          'El nombre debe tener menos de 30 caracteres!',
      ],
    },
    shopCategoryLabel: {
      shopCategoryId: 'ShopCategoryId',
      name: 'Name',
    },

    shopCategoryParent: {
      state: false,
      items: [],
    },
  }),

  methods: {
    onSubmitShopCategory() {
      this.shopCategory.shopId = this.currentShop.id;
      this.$http
        .post(`shop/${this.currentShop.id}/category`, this.shopCategory)
        .then((res) => {
          this.$emit('set-shop-category', res.data.data);
        })
        .catch((err) => console.log(err.response));
    },
    getShopCategories() {
      this.$http.get(`shop-category`).then((res) => {
        this.shopCategoryParent.items = res.data.data.data;
      });
    },
    setShopCategory(shopCategory) {
      this.shopCategoryParent.items.push(shopCategory);
      this.shopCategory.categoryId = shopCategory.id;
      this.shopCategoryParent.state = false;
    },
  },
  async mounted() {
    await this.getShopCategories();
  },
};
</script>

<style></style>

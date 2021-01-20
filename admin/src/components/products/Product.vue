<template >
  <v-data-table
    class="elevation-1"
    :headers="headers"
    :items="productDetail.variants"
    :loading="loading"
    multi-sort
    hide-default-footer
  >
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2">mdi-pencil</v-icon>
      <v-icon small>mdi-delete</v-icon>
    </template>
    <template v-slot:item.visible="{ item }">
      <v-simple-checkbox :value="!!item.visble" disabled></v-simple-checkbox>
    </template>
  </v-data-table>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      productDetail: {
        variants: [],
        atributes: [],
      },
      loading: true,
      // totalProducts: 0,
      variants: [],
      options: {},
    };
  },
  computed: {
    ...mapGetters('auth', ['currentShop']),
    headers() {
      const headers = [
        {
          text: 'Precio ($)',
          value: 'price',
        },
        {
          text: 'Stock',
          value: 'stock',
        },
        {
          text: 'Acciones',
          value: 'actions',
          sortable: false,
        },
        {
          text: 'Visible',
          value: 'visible',
        },
      ];

      if (
        !this.productDetail.atributes.length ||
        this.productDetail.atributes[0].type == 'null'
      )
        return headers;

      const atributes = [];
      this.productDetail.atributes.map((atr, index) => {
        atributes.push({
          text: atr.name,
          value: `atributes[${index}].value`,
        });
      });
      headers.splice(1, 0, ...atributes);
      return headers;
    },
  },
  methods: {
    getProduct() {
      this.loading = true;
      this.$http
        .get(`shop/${this.currentShop.id}/product/${this.product.id}`)
        .then((response) => {
          this.productDetail = response.data.data.data;
          console.log('Getted');
        })
        .finally((this.loading = false));
    },
  },
  async mounted() {
    await this.getProduct();
  },
};
</script>

<style scoped lang="scss">
.v-application .elevation-1 {
  box-shadow: none !important;
}
</style>

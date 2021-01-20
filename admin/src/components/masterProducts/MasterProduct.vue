<template>
  <v-data-table
    class="elevation-1"
    :headers="headers"
    :items="masterProductDetail.atributes"
    :loading="loading"
    multi-sort
    hide-default-footer
  >
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2">mdi-pencil</v-icon>
      <v-icon small>mdi-delete</v-icon>
    </template>
    <template v-slot:item.values="{ item }">
      <div v-for="(value, i) in item.values" :key="i">
        <p class="my-1">{{ value.value }}</p>
      </div>
    </template>
  </v-data-table>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  props: {
    masterProduct: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      masterProductDetail: {
        variants: [],
        atributes: [],
      },
      loading: true,
      // totalProducts: 0,
      variants: [],
      options: {},
      headers: [
        {
          text: 'Atributo',
          value: 'name',
        },
        {
          text: 'Valores',
          value: 'values',
        },
        {
          text: 'Acciones',
          value: 'actions',
          sortable: false,
        },
      ],
    };
  },
  computed: {
    ...mapGetters('auth', ['currentShop']),
  },
  methods: {
    getMasterProduct() {
      this.loading = true;
      this.$http
        .get(
          `shop/${this.currentShop.id}/master-product/${this.masterProduct.id}`
        )
        .then((response) => {
          this.masterProductDetail = response.data.data.data;
        })
        .finally((this.loading = false));
    },
  },
  async mounted() {
    await this.getMasterProduct();
  },
};
</script>

<style scoped lang="scss">
.v-application .elevation-1 {
  box-shadow: none !important;
}
</style>

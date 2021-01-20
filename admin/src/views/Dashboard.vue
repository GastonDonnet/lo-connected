<template>
  <v-container fluid class="mx-0 my-2">
    <div v-if="!loading">
      <v-row align="center" justify="center">
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>Ventas Diarias ($)</v-card-title>
            <DaySales class="pa-5 pt-0" :shop="currentShop" />
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>Ventas del mes ($)</v-card-title>
            <MonthSales class="pa-5 pt-0" :shop="currentShop" />
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>Ventas del año ($)</v-card-title>
            <YearSales class="pa-5 pt-0" :shop="currentShop" />
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
// @ is an alias to /src
import YearSales from '@/components/dashboard/YearSales.vue';
import MonthSales from '@/components/dashboard/MonthSales.vue';
import DaySales from '@/components/dashboard/DaySales.vue';
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      loading: true,
    };
  },
  components: {
    YearSales,
    MonthSales,
    DaySales,
  },
  computed: {
    ...mapGetters('auth', ['currentShop']),
  },

  async created() {
    this.loading = false;
  },
};
</script>

<style lang="scss" scope>
</style>

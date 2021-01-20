<template>
  <div
    :style="this.$vuetify.breakpoint.lgAndUp ? 'max-width: 900px' : ''"
    class="mx-auto"
  >
    <v-stepper v-model="step" alt-labels>
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1" editable
          >Productos</v-stepper-step
        >
        <v-divider></v-divider>
        <v-stepper-step
          :complete="step > 2"
          step="2"
          :editable="!!cart.products.length"
          >Entrega</v-stepper-step
        >
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 3" step="3">Resumen</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <Step1 @changeStep="changeStep"></Step1>
        </v-stepper-content>
        <v-stepper-content step="2">
          <Step2 @changeStep="changeStep"></Step2>
        </v-stepper-content>
        <v-stepper-content step="3">
          <Step3></Step3>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CartStep1 from '@/components/cart/CartStep1.vue';
import CartStep2 from '@/components/cart/CartStep2.vue';
import CartStep3 from '@/components/cart/CartStep3.vue';

export default {
  components: {
    Step1: CartStep1,
    Step2: CartStep2,
    Step3: CartStep3,
  },
  data() {
    return {
      step: 1,
    };
  },
  computed: {
    ...mapState('cart', ['cart']),
  },
  methods: {
    ...mapActions('cart', [
      'getOrCreateCart',
      'addOrUpdateProductToCart',
      'addOrUpdateProductToCartInCartPage',
    ]),
    ...mapActions('shop', ['getShop']),
    changeStep(step) {
      this.step = step;
    },
  },
  async beforeMount() {
    await this.getShop(this.$route.params.shopId);
    await this.getOrCreateCart();
  },
};
</script>

<style lang="scss" scoped>
.v-stepper {
  box-shadow: 0px 2px 50px -35px rgb(255, 159, 28);
  .v-stepper__header {
    box-shadow: 0px 3px 20px -15px rgb(255, 159, 28);
  }
}
</style>
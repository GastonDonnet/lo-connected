<template>
  <v-form ref="form" v-model="shopReviewValid" class="text-center">
    <v-text-field v-model="shopReview.comment" :counter="200" :rules="shopReviewRules.comment" :label="shopReviewLabel.comment"></v-text-field>

    <v-text-field v-model.number="shopReview.rating" :rules="shopReviewRules.rating" :label="shopReviewLabel.rating" required></v-text-field>

    <v-text-field v-model.number="shopReview.userId" :rules="shopReviewRules.userId" :label="shopReviewLabel.userId"></v-text-field>

    <v-text-field v-model.number="shopReview.shopId" :rules="shopReviewRules.shopId" :label="shopReviewLabel.shopId"></v-text-field>

    <v-btn :disabled="!shopReviewValid" color="success" class="mr-4" @click="onSubmitShopReview">Submit</v-btn>
  </v-form>
</template>
<script>
  export default {

    data: () => ({
      shopReviewValid: true,

      shopReview: {
        comment: undefined,
        rating: undefined,
        userId: undefined,
        shopId: undefined,
      },
      shopReviewRules: {
        comment: [
          v => (v && v.length < 200) || 'comment debe tener menos de 200 caracteres!',
        ],
        rating: [
          v => !!v || `${this.shopReviewLabel.rating} es requerido!`,
          v => (v && v >= 1) || 'rating debe ser menor o igual a 1 caracteres!',
          v => (v && v <= 5) || 'rating debe ser mayor o igual a 5 caracteres!',
        ],
        userId: [
          v => (v && v % 1 === 0 || 'userId debe ser un numero entero!'),
        ],
        shopId: [
          v => (v && v % 1 === 0 || 'shopId debe ser un numero entero!'),
        ],
      },
      shopReviewLabel: {
        comment: "Comment",
        rating: "Rating",
        userId: "UserId",
        shopId: "ShopId",
      },
    }),

    methods: {
      async onSubmitShopReview() {},
    },
  };
</script>

<style></style>
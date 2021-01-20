<template>
  <v-form ref="form" v-model="productReviewValid" class="text-center">
    <v-text-field v-model.number="productReview.userId" :rules="productReviewRules.userId" :label="productReviewLabel.userId"></v-text-field>

    <v-text-field v-model.number="productReview.productId" :rules="productReviewRules.productId" :label="productReviewLabel.productId"></v-text-field>

    <v-text-field v-model="productReview.comment" :counter="200" :rules="productReviewRules.comment" :label="productReviewLabel.comment"></v-text-field>

    <v-text-field v-model.number="productReview.rating" :rules="productReviewRules.rating" :label="productReviewLabel.rating" required></v-text-field>

    <v-btn :disabled="!productReviewValid" color="success" class="mr-4" @click="onSubmitProductReview">Submit</v-btn>
  </v-form>
</template>
<script>
  export default {

    data: () => ({
      productReviewValid: true,

      productReview: {
        userId: undefined,
        productId: undefined,
        comment: undefined,
        rating: undefined,
      },
      productReviewRules: {
        userId: [
          v => (v && v % 1 === 0 || 'userId debe ser un numero entero!'),
        ],
        productId: [
          v => (v && v % 1 === 0 || 'productId debe ser un numero entero!'),
        ],
        comment: [
          v => (v && v.length < 200) || 'comment debe tener menos de 200 caracteres!',
        ],
        rating: [
          v => !!v || `${this.productReviewLabel.rating} es requerido!`,
          v => (v && v >= 1) || 'rating debe ser menor o igual a 1 caracteres!',
          v => (v && v <= 5) || 'rating debe ser mayor o igual a 5 caracteres!',
        ],
      },
      productReviewLabel: {
        userId: "UserId",
        productId: "ProductId",
        comment: "Comment",
        rating: "Rating",
      },
    }),

    methods: {
      async onSubmitProductReview() {},
    },
  };
</script>

<style></style>
<template>
  <v-form ref="form" v-model="shopValid" class="text-center">
    <v-text-field v-model.number="shop.shopCategoryId" :rules="shopRules.shopCategoryId" :label="shopLabel.shopCategoryId" required></v-text-field>

    <v-text-field v-model.number="shop.avgRating" :rules="shopRules.avgRating" :label="shopLabel.avgRating"></v-text-field>

    <v-text-field v-model="shop.name" :counter="30" :rules="shopRules.name" :label="shopLabel.name" required></v-text-field>

    <v-text-field v-model="shop.telephone" :counter="30" :rules="shopRules.telephone" :label="shopLabel.telephone" required></v-text-field>

    <v-text-field v-model="shop.telephone1" :counter="30" :rules="shopRules.telephone1" :label="shopLabel.telephone1"></v-text-field>

    <v-text-field v-model="shop.telephone2" :counter="30" :rules="shopRules.telephone2" :label="shopLabel.telephone2"></v-text-field>

    <v-text-field v-model="shop.imgBanner" :counter="0" :rules="shopRules.imgBanner" :label="shopLabel.imgBanner"></v-text-field>

    <v-text-field v-model="shop.imgLogo" :counter="0" :rules="shopRules.imgLogo" :label="shopLabel.imgLogo"></v-text-field>


    <v-text-field v-model.number="shop.deliveryMin" :rules="shopRules.deliveryMin" :label="shopLabel.deliveryMin"></v-text-field>

    <v-text-field v-model.number="shop.deliveryCost" :rules="shopRules.deliveryCost" :label="shopLabel.deliveryCost"></v-text-field>

    <v-text-field v-model.number="shop.shopState" :rules="shopRules.shopState" :label="shopLabel.shopState"></v-text-field>


    <v-btn :disabled="!shopValid" color="success" class="mr-4" @click="onSubmitShop">Submit</v-btn>
  </v-form>
</template>
<script>
  export default {

    data: () => ({
      shopValid: true,

      shop: {
        shopCategoryId: undefined,
        avgRating: "1",
        name: undefined,
        telephone: undefined,
        telephone1: undefined,
        telephone2: undefined,
        imgBanner: undefined,
        imgLogo: undefined,
        invitationCode: undefined,
        invitationCodeExpires: undefined,
        defaultRoleId: undefined,
        deliveryMin: undefined,
        deliveryCost: undefined,
        shopState: "1",
        active: undefined,
      },
      shopRules: {
        shopCategoryId: [
          v => !!v || `${this.shopLabel.shopCategoryId} es requerido!`,
          v => (v && v % 1 === 0 || 'shopCategoryId debe ser un numero entero!'),
        ],
        avgRating: [
          v => (v && v >= 1) || 'avgRating debe ser menor o igual a 1 caracteres!',
          v => (v && v <= 5) || 'avgRating debe ser mayor o igual a 5 caracteres!',
        ],
        name: [
          v => !!v || `${this.shopLabel.name} es requerido!`,
          v => (v && v.length >= 5) || 'name debe tener al menos 5 caracteres!',
          v => (v && v.length < 30) || 'name debe tener menos de 30 caracteres!',
        ],
        telephone: [
          v => !!v || `${this.shopLabel.telephone} es requerido!`,
          v => (v && v.length >= 5) || 'telephone debe tener al menos 5 caracteres!',
          v => (v && v.length < 30) || 'telephone debe tener menos de 30 caracteres!',
        ],
        telephone1: [
          v => (v && v.length >= 5) || 'telephone1 debe tener al menos 5 caracteres!',
          v => (v && v.length < 30) || 'telephone1 debe tener menos de 30 caracteres!',
        ],
        telephone2: [
          v => (v && v.length >= 5) || 'telephone2 debe tener al menos 5 caracteres!',
          v => (v && v.length < 30) || 'telephone2 debe tener menos de 30 caracteres!',
        ],
        imgBanner: [],
        imgLogo: [],
        deliveryMin: [
          v => (v && v % 1 === 0 || 'deliveryMin debe ser un numero entero!'),
        ],
        deliveryCost: [
          v => (v && v % 1 === 0 || 'deliveryCost debe ser un numero entero!'),
        ],
        shopState: [
          v => (v && v % 1 === 0 || 'shopState debe ser un numero entero!'),
        ],
      },
      shopLabel: {
        shopCategoryId: "ShopCategoryId",
        avgRating: "AvgRating",
        name: "Name",
        telephone: "Telephone",
        telephone1: "Telephone1",
        telephone2: "Telephone2",
        imgBanner: "ImgBanner",
        imgLogo: "ImgLogo",
        invitationCode: "InvitationCode",
        invitationCodeExpires: "InvitationCodeExpires",
        defaultRoleId: "DefaultRoleId",
        deliveryMin: "DeliveryMin",
        deliveryCost: "DeliveryCost",
        shopState: "ShopState",
        active: "Active",
      },
    }),

    methods: {
      async onSubmitShop() {},
    },
  };
</script>

<style></style>
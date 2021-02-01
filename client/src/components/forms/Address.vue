<template>
  <v-form ref="form" v-model="addressValid" class="text-center">
    <v-autocomplete
      v-model.number="address.cityId"
      :items="cities"
      :item-text="(item) => `${item.name} - ${item.province.name}`"
      :label="addressLabel.cityId"
      outlined
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
      :disabled="!addressValid"
      color="success"
      class="mr-4"
      @click="onSubmitAddress"
      >Agregar</v-btn
    >
  </v-form>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  data: () => ({
    addressValid: true,

    address: {
      userId: null,
      shopId: null,
      cityId: null,
      street: '',
      note: '',
    },
    addressLabel: {
      cityId: 'Ciudad',
      street: 'Calle',
      note: 'Nota',
    },
    addressRules: {
      street: [
        (v) => !!v || `Por favor escribe una direccion.`,
        (v) =>
          (v && v.length < 100) ||
          'La dirección debe tener menos de 100 caracteres!',
      ],
      note: [
        (v) => v.length < 200 || 'La nota debe tener menos de 200 caracteres!',
      ],
    },

    cities: [],
  }),
  computed: {
    ...mapState('auth', ['currentUser']),
  },
  methods: {
    ...mapActions('auth', ['getUser']),
    async init() {
      const response = await this.$http.get('location/city');
      this.cities = response.data.data.data;

      this.address.userId = this.currentUser.id;
    },
    async onSubmitAddress() {
      this.address.cityId = this.address.cityId.id;

      try {
        await this.$http.post('location/address', this.address);
        await this.getUser(true);
        this.$toast.success('Dirección agregada correctamente!');
        this.$emit('addressAdded');
      } catch (error) {
        console.log(error.response);
      }
    },
  },
  async mounted() {
    await this.init();
  },
};
</script>

<style></style>

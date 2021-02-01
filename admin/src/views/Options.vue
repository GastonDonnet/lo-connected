<template>
  <v-container>
    <h2>Mostrar/Ocultar Tienda</h2>
    <v-switch
      :input-value="currentShop.active"
      @change="
        updateShop({ active: !currentShop.active });
        patchUpdatedShop();
      "
      :label="currentShop.active ? 'Visible' : 'No Visible'"
      class="ml-4"
      hide-details
    ></v-switch>

    <hr class="my-6" />
    <h2>Horarios</h2>
    <div>
      <ScheduleTable class="my-2" :options="openTimeOptions"></ScheduleTable>
      <ScheduleTable
        class="my-2"
        :options="deliveryTimeOptions"
      ></ScheduleTable>
    </div>

    <hr class="my-6" />
    <h2>Informacion</h2>
    <v-select
      :disabled="!editing"
      class="my-7"
      :items="shopStates"
      :value="currentShop.stateId"
      label="Estado"
      item-text="name"
      item-value="id"
      hide-details
      @change="updateShop({ stateId: $event })"
    ></v-select>

    <div class="my-7">
      <v-text-field
        :value="currentShop.name"
        @change="updateShop({ name: $event })"
        label="Nombre"
        :disabled="!editing"
      ></v-text-field>
      <v-textarea
        :value="currentShop.description"
        @change="updateShop({ description: $event })"
        label="Descripcion"
        rows="4"
        :disabled="!editing"
      ></v-textarea>

      <v-row>
        <v-col>
          <v-text-field
            :value="currentShop.deliveryMin"
            @change="updateShop({ deliveryMin: $event })"
            label="Compra minima para delivery"
            prefix="$"
            :disabled="!editing"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            :value="currentShop.deliveryCost"
            @change="updateShop({ deliveryCost: $event })"
            label="Costo de envio"
            prefix="$"
            :disabled="!editing"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-btn v-if="!editing" @click="editing = !editing" color="warning" block
        >Editar</v-btn
      >

      <div v-if="editing">
        <v-btn @click="resetUpdatedShop" color="grey lighten-2" block
          >No guardar</v-btn
        >
        <v-btn @click="patchUpdatedShop" color="success" block>Guardar</v-btn>
      </div>

      <hr class="my-6" />
      <h2>Imagenes</h2>

      <v-row>
        <v-col>
          <v-img
            :src="staticUrl + 'img/shop/' + currentShop.imgBanner"
            max-width="500px"
            class="mx-auto"
          ></v-img>
          <Cropper
            type="imgBanner"
            typeLabel="Banner"
            :aspectRatio="5"
            @on-submit="uploadImg"
          ></Cropper>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-img
            :src="staticUrl + 'img/shop/' + currentShop.imgLogo"
            max-width="200px"
            class="mx-auto"
          ></v-img>
          <Cropper
            type="imgLogo"
            typeLabel="Logo"
            :aspectRatio="1"
            @on-submit="uploadImg"
          ></Cropper>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';
import ScheduleTable from '@/components/options/ScheduleTable.vue';
import Cropper from '../components/Cropper.vue';

export default {
  components: {
    ScheduleTable,
    Cropper,
  },
  data() {
    return {
      openTimeOptions: {
        title: 'Horarios de atención al publico',
      },
      deliveryTimeOptions: {
        title: 'Horario de delivery',
        delivery: true,
      },
      shopStateId: 0,
      shopStates: [
        {
          id: 1,
          name: 'Abierto',
          description: 'El local esta abierto',
        },
        {
          id: 2,
          name: 'Cerrado',
          description: 'El local esta cerrado',
        },
        {
          id: 3,
          name: 'Demorado',
          description: 'El local posee demoras en las ordenes',
        },
      ],
      updatedShop: {},
      editing: false,
      editingImg: false,
      option: {
        outputSize: 0.9,
        outputType: 'jpeg',
      },
    };
  },
  computed: {
    ...mapGetters('auth', ['currentShop']),
    staticUrl() {
      return this.$staticUrl;
    },
    apiUrl() {
      return this.$apiUrl;
    },
  },
  methods: {
    ...mapActions('auth', ['getUser', 'updateCurrentShop']),
    updateShop(payload) {
      Object.assign(this.updatedShop, payload);
    },
    async patchUpdatedShop() {
      this.editing = false;
      await this.$http
        .patch(`shop/${this.currentShop.id}`, this.updatedShop)
        .catch((err) => console.log(err.response));
      await this.getUser();
    },
    resetUpdatedShop() {
      this.editing = false;
      this.editingImg = false;
      this.updatedShop = {};
      this.$forceUpdate();
    },

    resetImage(type) {
      this.updatedShop[type] = this.currentShop[type];
    },

    uploadImg(blob, type) {
      this.editingImg = false;
      const form = new FormData();

      if (type === 'imgBanner') {
        type = 'banner';
        form.append('photo', blob);
      } else if (type === 'imgLogo') {
        type = 'logo';
        form.append('photo', blob);
      }

      form.append('photoType', type);

      axios
        .patch(`${this.apiUrl}shop/${this.currentShop.id}`, form, {
          headers: {
            'content-type': 'multipart/form-data',
          },
          withCredentials: true,
        })
        .then((res) => {
          this.updateCurrentShop(res.data.data.data);
        })
        .catch((err) => console.log(err.response));
    },
  },
  created() {
    console.log(this.currentShop);
    this.URL = URL;
  },
};
</script>

<style>
</style>

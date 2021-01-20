<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col>
        <p class="title text-center">Mis Datos</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-form ref="form" v-model="userValid" class="text-center">
          <v-text-field
            v-model="user.email"
            :counter="50"
            :rules="userRules.email"
            :label="userLabel.email"
            disabled
          ></v-text-field>

          <v-text-field
            v-model="user.displayName"
            :counter="255"
            :rules="userRules.displayName"
            :label="userLabel.displayName"
            required
          ></v-text-field>

          <v-text-field
            v-model="user.telephone"
            :counter="30"
            :rules="userRules.telephone"
            :label="userLabel.telephone"
            required
          ></v-text-field>

          <v-text-field
            type="date"
            v-model="user.birthDate"
            :rules="userRules.birthDate"
            :label="userLabel.birthDate"
          ></v-text-field>

          <v-radio-group v-model="user.gender">
            <v-radio
              v-for="option in genderItems"
              :key="option"
              :label="`${option}`"
              :value="option"
            ></v-radio>
          </v-radio-group>

          <v-btn
            :disabled="!userValid"
            color="success"
            class="mr-4"
            @click="updateUser"
            >Actualizar</v-btn
          >
        </v-form>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col>
        <v-btn
          v-if="!user.facebookId"
          block
          color="#3b5998"
          class="white--text"
          :href="apiUrl + 'auth/facebook'"
          >Vincular con Facebook</v-btn
        >
        <v-btn
          v-else
          block
          color="#3b5998"
          class="white--text"
          :href="apiUrl + 'auth/facebook'"
          disabled
          >Vinculado con Facebook</v-btn
        >
      </v-col>
      <v-col>
        <v-btn
          v-if="!user.googleId"
          block
          color="#4285F4"
          class="white--text"
          :href="apiUrl + 'auth/google'"
          >Vincular con Google</v-btn
        >
        <v-btn
          v-else
          disabled
          block
          color="#4285F4"
          class="white--text"
          :href="apiUrl + 'auth/google'"
          >Vinculado con Google</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Perfil',

  data() {
    return {
      userValid: true,

      genderItems: ['Male', 'Female', 'Other'],

      user: {
        email: undefined,
        displayName: undefined,
        telephone: undefined,
        birthDate: undefined,
        gender: 'Other',
      },
      userRules: {
        displayName: [
          (v) => !!v || `${this.userLabel.firstName} es requerido!`,
          (v) =>
            (v && v.length >= 1) ||
            'firstName debe tener al menos 1 caracteres!',
          (v) =>
            (v && v.length < 255) ||
            'firstName debe tener menos de 255 caracteres!',
        ],
        telephone: [
          (v) => !!v || `${this.userLabel.telephone} es requerido!`,
          (v) =>
            (v && v.length >= 5) ||
            'telephone debe tener al menos 5 caracteres!',
          (v) =>
            (v && v.length < 30) ||
            'telephone debe tener menos de 30 caracteres!',
        ],
        birthDate: [],
      },
      userLabel: {
        email: 'Email',
        displayName: 'Nombre y Apellido',
        telephone: 'Telefono',
        birthDate: 'Fecha de nacimiento',
        gender: 'Genero',
      },
    };
  },
  computed: {
    ...mapState('auth', ['currentUser']),

    apiUrl() {
      return this.$apiUrl;
    },
  },
  created() {
    this.user = {
      ...this.currentUser,
      birthDate: this.currentUser.birthDate
        ? this.currentUser.birthDate.split('T')[0]
        : null,
    };
  },
  methods: {
    updateUser() {
      //TODO: IMPLEMENTAR
    },
  },
};
</script>

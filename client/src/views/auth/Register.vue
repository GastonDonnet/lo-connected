<template>
  <v-container fluid id="x" class="fill-height">
    <v-row align="center" justify="center">
      <v-col sm="8" md="6">
        <v-card elevation="24" class="rounded-xl" outlined>
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title
              color="primary"
              class="justify-center font-weight-bold"
              style="font-size: 30px"
              >LoConntected
            </v-toolbar-title>
          </v-toolbar>
          <v-card-subtitle>
            Para crear una cuenta complete los datos.
            <br />
            * Campo obligatorio.
          </v-card-subtitle>
          <v-card-text>
            <v-form ref="form" v-model="userValid" class="text-center">
              <v-text-field
                autocomplete="email"
                type="email"
                v-model="user.email"
                :rules="userRules.email"
                :label="userLabel.email"
              ></v-text-field>

              <v-text-field
                autocomplete="new-password"
                type="password"
                v-model="user.password"
                :rules="userRules.password"
                :label="userLabel.password"
              ></v-text-field>

              <v-text-field
                autocomplete="new-password"
                type="password"
                v-model="user.passwordConfirm"
                :rules="userRules.passwordConfirm"
                :label="userLabel.passwordConfirm"
              ></v-text-field>

              <v-text-field
                autocomplete="name"
                v-model="user.firstName"
                :rules="userRules.firstName"
                :label="userLabel.firstName"
                required
              ></v-text-field>

              <v-text-field
                v-model="user.lastName"
                :rules="userRules.lastName"
                :label="userLabel.lastName"
              ></v-text-field>

              <v-text-field
                autocomplete="tel"
                v-model="user.telephone"
                :rules="userRules.telephone"
                :label="userLabel.telephone"
              ></v-text-field>

              <v-text-field
                autocomplete="bday"
                type="date"
                v-model="user.birthDate"
                :rules="userRules.birthDate"
                :label="userLabel.birthDate"
              ></v-text-field>

              <legend
                id="input-192"
                class="v-label theme--light"
                style="left: 0px; right: auto; position: relative"
              >
                Genero:
              </legend>
              <v-radio-group v-model="user.gender" row dense>
                <v-radio
                  v-for="option in genderItems"
                  :key="option.key"
                  :label="`${option.label}`"
                  :value="option.key"
                ></v-radio>
              </v-radio-group>

              <v-btn
                block
                :disabled="!userValid"
                color="primary"
                class="mr-4"
                @click="sendRegister(user)"
                >Registrar</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
        <v-btn
          text
          class="text-center mt-5"
          block
          color="accent"
          @click="$router.push({ name: 'Login' })"
          >Ya tienes cuenta?</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Registro',
  data: () => ({
    userValid: true,
    genderItems: [
      { key: 'Male', label: 'Masculino' },
      { key: 'Female', label: 'Femenino' },
      { key: 'Other', label: 'Otro' },
    ],
    user: {
      password: '',
      passwordConfirm: '',
      email: '',
      firstName: '',
      lastName: '',
      telephone: '',
      birthDate: undefined,
      gender: null,
    },

    userLabel: {
      password: '*Contraseña',
      passwordConfirm: '*Confirmar contraseña',
      email: '*Email',
      firstName: '*Nombre',
      lastName: '*Apellido',
      telephone: 'Telefono',
      birthDate: 'Fecha de nacimiento',
      gender: 'Genero:',
    },
  }),
  computed: {
    ...mapState('auth', ['loginRedirect']),
    userRules() {
      return {
        password: [
          (v) => !!v || `${this.userLabel.password} es requerido!`,
          (v) =>
            (v && v.length >= 8) ||
            `${this.userLabel.password} debe tener al menos 8 caracteres!`,
          (v) =>
            (v && v.length < 50) ||
            `${this.userLabel.password} debe tener menos de 50 caracteres!`,
        ],
        passwordConfirm: [
          (v) => !!v || `${this.userLabel.passwordConfirm} es requerido!`,
          (v) =>
            (v && v.length >= 8) ||
            `${this.userLabel.passwordConfirm} debe tener al menos 8 caracteres!`,
          (v) =>
            (v && v.length < 50) ||
            `${this.userLabel.passwordConfirm} debe tener menos de 50 caracteres!`,
        ],
        email: [
          (v) => !!v || `${this.userLabel.email} es requerido!`,
          (v) =>
            (v && v.length >= 8) ||
            `${this.userLabel.email} debe tener al menos 8 caracteres!`,
          (v) =>
            (v && v.length < 50) ||
            `${this.userLabel.email} debe tener menos de 50 caracteres!`,
          (v) => isEmail(v) || `Email invalido!`,
        ],
        firstName: [
          (v) => !!v || `${this.userLabel.firstName} es requerido!`,
          (v) =>
            (v && v.length >= 1) ||
            `${this.userLabel.firstName} debe tener al menos 1 caracteres!`,
          (v) =>
            (v && v.length < 20) ||
            `${this.userLabel.firstName} debe tener menos de 20 caracteres!`,
        ],
        lastName: [
          (v) => !!v || `${this.userLabel.lastName} es requerido!`,
          (v) =>
            (v && v.length >= 1) ||
            `${this.userLabel.lastName} debe tener al menos 1 caracteres!`,
          (v) =>
            (v && v.length < 20) ||
            `${this.userLabel.lastName} debe tener menos de 20 caracteres!`,
        ],
        telephone: [
          (v) =>
            !v.length ||
            v.length >= 6 ||
            `${this.userLabel.telephone} debe tener al menos 6 caracteres!`,
          (v) =>
            !v.length ||
            v.length < 30 ||
            `${this.userLabel.telephone} debe tener menos de 30 caracteres!`,
          (v) =>
            !v.length ||
            isMobilePhone(v) ||
            `Telefono invalido! use el siguiente formato: 3404634792.`,
        ],
        birthDate: [],
      };
    },
  },
  methods: {
    ...mapActions('auth', ['register']),
    async sendRegister() {
      this.user.displayName = `${this.user.firstName} ${this.user.lastName}`;
      await this.register(this.user);
      this.$router.push(this.loginRedirect);
    },
  },
};
</script>

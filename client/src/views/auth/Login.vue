<template>
  <v-container fluid class="fill-height">
    <v-row justify="center">
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

          <v-card-subtitle
            >Debes acceder a tu cuenta para continuar...</v-card-subtitle
          >
          <v-card-text>
            <v-row align="center" justify="center">
              <v-col>
                <v-form ref="form" v-model="userValid" class="text-center">
                  <v-text-field
                    type="email"
                    v-model="user.email"
                    :rules="userRules.email"
                    :label="userLabel.email"
                  ></v-text-field>

                  <v-text-field
                    type="password"
                    v-model="user.password"
                    :rules="userRules.password"
                    :label="userLabel.password"
                  ></v-text-field>

                  <v-btn
                    block
                    :disabled="!userValid"
                    color="primary"
                    class="mr-4"
                    @click="sendLoginWithPassword()"
                    >Loguearse</v-btn
                  >
                </v-form>
              </v-col>
            </v-row>
            <hr style="border-color: #2ec4b6rgb(46 196 182 / 28%)" />

            <v-card-actions>
              <v-row align="center" justify="center">
                <v-col>
                  <v-btn
                    block
                    rounded
                    elevation="0"
                    color="#3b5998"
                    dark
                    :href="apiUrl + 'auth/facebook'"
                    ><v-icon left>mdi-facebook</v-icon>Ingresar con
                    Facebook</v-btn
                  >
                </v-col>
                <v-col>
                  <v-btn
                    block
                    rounded
                    elevation="0"
                    color="#4285F4"
                    dark
                    :href="apiUrl + 'auth/google'"
                    ><v-icon left>mdi-google</v-icon>Ingresar con Google
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card-text>
        </v-card>
        <v-btn
          text
          class="text-center mt-5"
          block
          color="accent"
          @click="$router.push({ name: 'Register' })"
          >No tienes cuenta?</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import isEmail from 'validator/lib/isEmail';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Login',
  data: () => ({
    userValid: true,
    user: {
      email: '',
      password: '',
    },
    userLabel: {
      email: 'Email',
      password: 'Contraseña',
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
        email: [
          (v) =>
            !!v ||
            !!this.user.username ||
            `Nombre de usuario o email es requerido!`,
          (v) =>
            (!!v && v.length >= 8) ||
            !!this.user.username ||
            `${this.userLabel.email} debe tener al menos 8 caracteres!`,
          (v) =>
            (!!v && v.length < 50) ||
            !!this.user.username ||
            `${this.userLabel.email} debe tener menos de 50 caracteres!`,
          (v) =>
            (!!v && isEmail(v)) || !!this.user.username || `Email invalido!`,
        ],
      };
    },
    apiUrl() {
      return this.$apiUrl;
    },
  },
  watch: {
    user: {
      handler: function (val) {
        this.$refs.form.validate();
      },
      deep: true,
    },
  },

  methods: {
    ...mapActions('auth', ['login', 'loginWithPassword']),
    async sendLogin() {
      console.log('sendLogin');
      await this.login();
      this.$router.push(this.loginRedirect);
    },
    async sendLoginWithPassword() {
      await this.loginWithPassword(this.user);
      this.$router.push(this.loginRedirect);
    },
  },

  async created() {
    const loggedIn = localStorage.getItem('loggedIn') === '1';

    if (this.$cookies.get('jwt') || localStorage.getItem('jwt')) {
      this.sendLogin();
    }
  },
};
</script>

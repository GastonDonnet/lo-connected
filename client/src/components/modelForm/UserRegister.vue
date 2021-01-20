<template>
  <v-form ref="form" v-model="userValid" class="text-center">
    <v-text-field
      v-model="user.username"
      :rules="userRules.username"
      :label="userLabel.username"
      required
      :disabled="editing"
    ></v-text-field>

    <v-text-field
      v-model="user.password"
      :rules="userRules.password"
      :label="userLabel.password"
      required
      :disabled="editing"
    ></v-text-field>

    <v-text-field
      v-model="user.passwordConfirm"
      :rules="userRules.passwordConfirm"
      :label="userLabel.passwordConfirm"
      required
      :disabled="editing"
    ></v-text-field>

    <v-text-field
      v-model="user.email"
      :rules="userRules.email"
      :label="userLabel.email"
      required
      :disabled="editing"
    ></v-text-field>

    <v-text-field
      v-model="user.firstName"
      :rules="userRules.firstName"
      :label="userLabel.firstName"
      required
      :disabled="editing"
    ></v-text-field>

    <v-text-field
      v-model="user.lastName"
      :rules="userRules.lastName"
      :label="userLabel.lastName"
      required
      :disabled="editing"
    ></v-text-field>

    <v-text-field
      v-model="user.telephone"
      :rules="userRules.telephone"
      :label="userLabel.telephone"
      required
      :disabled="editing"
    ></v-text-field>

    <v-text-field
      type="date"
      v-model="user.birthDate"
      :rules="userRules.birthDate"
      :label="userLabel.birthDate"
      :disabled="editing"
    ></v-text-field>

    <v-radio-group v-model="user.gender" :label="userLabel.gender" row :disabled="editing">
      <v-radio v-for="option in genderItems" :key="option" :label="`${option}`" :value="option"></v-radio>
    </v-radio-group>

    <v-btn
      v-if="!editing"
      text
      block
      :disabled="!userValid"
      color="primary"
      class="mr-4"
      @click="editing=true"
    >Registrar</v-btn>
  </v-form>
</template>
<script>

  import isEmail from 'validator/lib/isEmail';

  export default {
    data: () => ({
      editing: false,

      userValid: true,
      genderItems: ["Male", "Female", "Other"],
      user: {
        username: undefined,
        password: undefined,
        passwordConfirm: undefined,
        email: undefined,
        firstName: undefined,
        lastName: undefined,
        telephone: undefined,
        birthDate: undefined,
        gender: "Other",
        // passwordChangedAt: undefined,
        // passwordResetToken: undefined,
        // passwordResetExpires: undefined,
        // isActive: undefined,
      },
      userRules: {
        username: [
          v => !!v || `${this.userLabel.username} es requerido!`,
          v => (v && v.length >= 5) || `${this.userLabel.username} debe tener al menos 5 caracteres!`,
          v => (v && v.length < 50) || `${this.userLabel.username} debe tener menos de 50 caracteres!`,
        ],
        password: [
          v => !!v || `${this.userLabel.password} es requerido!`,
          v => (v && v.length >= 8) || `${this.userLabel.password} debe tener al menos 8 caracteres!`,
          v => (v && v.length < 50) || `${this.userLabel.password} debe tener menos de 50 caracteres!`,
        ],
        passwordConfirm: [
          v => !!v || `${this.userLabel.passwordConfirm} es requerido!`,
          v => (v && v.length >= 8) || `${this.userLabel.passwordConfirm} debe tener al menos 8 caracteres!`,
          v => (v && v.length < 50) || `${this.userLabel.passwordConfirm} debe tener menos de 50 caracteres!`,
        ],
        email: [
          v => !!v || `${this.userLabel.email} es requerido!`,
          v => (v && v.length >= 8) || `${this.userLabel.email} debe tener al menos 8 caracteres!`,
          v => (v && v.length < 50) || `${this.userLabel.email} debe tener menos de 50 caracteres!`,
        ],
        firstName: [
          v => !!v || `${this.userLabel.firstName} es requerido!`,
          v => (v && v.length >= 1) || `${this.userLabel.firstName} debe tener al menos 1 caracteres!`,
          v => (v && v.length < 255) || `${this.userLabel.firstName} debe tener menos de 255 caracteres!`,
        ],
        lastName: [
          v => !!v || `${this.userLabel.lastName} es requerido!`,
          v => (v && v.length >= 1) || `${this.userLabel.lastName} debe tener al menos 1 caracteres!`,
          v => (v && v.length < 255) || `${this.userLabel.lastName} debe tener menos de 255 caracteres!`,
        ],
        telephone: [
          v => !!v || `${this.userLabel.telephone} es requerido!`,
          v => (v && v.length >= 5) || `${this.userLabel.telephone} debe tener al menos 5 caracteres!`,
          v => (v && v.length < 30) || `${this.userLabel.telephone} debe tener menos de 30 caracteres!`,
        ],
        birthDate: [],
      },
      userLabel: {
        username: "Usuario",
        password: "Contraseña",
        passwordConfirm: "Confirmar contraseña",
        email: "Email",
        firstName: "Nombre",
        lastName: "Apellido",
        telephone: "Telefono",
        birthDate: "Fecha de nacimiento",
        gender: "Genero:",
        // passwordChangedAt: "PasswordChangedAt",
        // passwordResetToken: "PasswordResetToken",
        // passwordResetExpires: "PasswordResetExpires",
        // isActive: "IsActive",
      },
    }),

    methods: {
      async register() {
        
      },
    },
  };
</script>

<style></style>
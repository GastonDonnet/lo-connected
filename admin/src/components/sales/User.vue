<template>
  <v-container>
    <div class="text-center">
      <v-text-field v-model="user.firstName" :label="userLabel.firstName" required readonly></v-text-field>

      <v-text-field v-model="user.lastName" :label="userLabel.lastName" required readonly></v-text-field>

      <v-text-field v-model="user.email" :label="userLabel.email" required readonly></v-text-field>

      <v-text-field v-model="user.telephone" :label="userLabel.telephone" required readonly></v-text-field>

      <!--   <v-text-field
        type="date"
        :value="user.birthDate.split('T')[0]"
        :label="userLabel.birthDate"
        readonly
      ></v-text-field>-->

      <v-radio-group v-model="user.gender" :label="userLabel.gender" row readonly>
        <v-radio v-for="option in genderItems" :key="option" :label="`${option}`" :value="option"></v-radio>
      </v-radio-group>
    </div>
  </v-container>
</template>
<script>
  import isEmail from 'validator/lib/isEmail';
  
  export default {
    props: {
      user: {
        type: Object,
        required: true
      }
    },
    data: () => ({
        genderItems: ["Male", "Female", "Other"],
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
        isActive: "IsActive",
      },
    }),

    methods: {
    
    },
  };
</script>

<style></style>
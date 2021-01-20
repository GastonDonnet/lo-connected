<template>
  <v-form ref="form" v-model="userValid" class="text-center">
    <v-text-field v-model="user.facebookId" :counter="0" :rules="userRules.facebookId" :label="userLabel.facebookId"></v-text-field>

    <v-text-field v-model="user.googleId" :counter="0" :rules="userRules.googleId" :label="userLabel.googleId"></v-text-field>

    <v-text-field v-model="user.email" :counter="0" :rules="userRules.email" :label="userLabel.email" required></v-text-field>

    <v-text-field v-model="user.password" :counter="50" :rules="userRules.password" :label="userLabel.password"></v-text-field>

    <v-text-field v-model="user.photo" :counter="0" :rules="userRules.photo" :label="userLabel.photo"></v-text-field>

    <v-text-field v-model="user.displayName" :counter="0" :rules="userRules.displayName" :label="userLabel.displayName" required></v-text-field>

    <v-text-field v-model="user.telephone" :counter="30" :rules="userRules.telephone" :label="userLabel.telephone"></v-text-field>

    <v-text-field type="date" v-model="user.birthDate" :rules="userRules.birthDate" :label="userLabel.birthDate"></v-text-field>
    <v-radio-group v-model="user.gender">
      <v-radio v-for="option in genderItems" :key="option" :label="`${option}`" :value="option"></v-radio>
    </v-radio-group>


    <v-btn :disabled="!userValid" color="success" class="mr-4" @click="onSubmitUser">Submit</v-btn>
  </v-form>
</template>
<script>
  export default {

    data: () => ({
      userValid: true,

      genderItems: ["Male", "Female", "Other"],

      user: {
        facebookId: undefined,
        googleId: undefined,
        email: undefined,
        password: undefined,
        photo: undefined,
        displayName: undefined,
        telephone: undefined,
        birthDate: undefined,
        gender: "Other",
        passwordChangedAt: undefined,
        passwordResetToken: undefined,
        passwordResetExpires: undefined,
        isActive: undefined,
      },
      userRules: {
        facebookId: [],
        googleId: [],
        email: [
          v => !!v || `${this.userLabel.email} es requerido!`,
        ],
        password: [
          v => (v && v.length >= 8) || 'password debe tener al menos 8 caracteres!',
          v => (v && v.length < 50) || 'password debe tener menos de 50 caracteres!',
        ],
        photo: [],
        displayName: [
          v => !!v || `${this.userLabel.displayName} es requerido!`,
        ],
        telephone: [
          v => (v && v.length >= 5) || 'telephone debe tener al menos 5 caracteres!',
          v => (v && v.length < 30) || 'telephone debe tener menos de 30 caracteres!',
        ],
        birthDate: [],
      },
      userLabel: {
        facebookId: "FacebookId",
        googleId: "GoogleId",
        email: "Email",
        password: "Password",
        photo: "Photo",
        displayName: "DisplayName",
        telephone: "Telephone",
        birthDate: "BirthDate",
        gender: "Gender",
        passwordChangedAt: "PasswordChangedAt",
        passwordResetToken: "PasswordResetToken",
        passwordResetExpires: "PasswordResetExpires",
        isActive: "IsActive",
      },
    }),

    methods: {
      async onSubmitUser() {},
    },
  };
</script>

<style></style>
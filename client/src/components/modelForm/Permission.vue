<template>
  <v-form ref="form" v-model="permissionValid" class="text-center">
    <v-text-field v-model="permission.name" :counter="0" :rules="permissionRules.name" :label="permissionLabel.name" required></v-text-field>

    <v-text-field v-model="permission.permission" :counter="0" :rules="permissionRules.permission" :label="permissionLabel.permission" required></v-text-field>

    <v-btn :disabled="!permissionValid" color="success" class="mr-4" @click="onSubmitPermission">Submit</v-btn>
  </v-form>
</template>
<script>
  export default {

    data: () => ({
      permissionValid: true,

      permission: {
        name: undefined,
        permission: undefined,
      },
      permissionRules: {
        name: [
          v => !!v || `${this.permissionLabel.name} es requerido!`,
        ],
        permission: [
          v => !!v || `${this.permissionLabel.permission} es requerido!`,
        ],
      },
      permissionLabel: {
        name: "Name",
        permission: "Permission",
      },
    }),

    methods: {
      async onSubmitPermission() {},
    },
  };
</script>

<style></style>
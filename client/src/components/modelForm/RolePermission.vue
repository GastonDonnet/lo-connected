<template>
  <v-form ref="form" v-model="rolePermissionValid" class="text-center">
    <v-text-field v-model.number="rolePermission.roleId" :rules="rolePermissionRules.roleId" :label="rolePermissionLabel.roleId" required></v-text-field>

    <v-text-field v-model.number="rolePermission.permissionId" :rules="rolePermissionRules.permissionId" :label="rolePermissionLabel.permissionId" required>
    </v-text-field>

    <v-btn :disabled="!rolePermissionValid" color="success" class="mr-4" @click="onSubmitRolePermission">Submit</v-btn>
  </v-form>
</template>
<script>
  export default {

    data: () => ({
      rolePermissionValid: true,

      rolePermission: {
        roleId: undefined,
        permissionId: undefined,
      },
      rolePermissionRules: {
        roleId: [
          v => !!v || `${this.rolePermissionLabel.roleId} es requerido!`,
          v => (v && v % 1 === 0 || 'roleId debe ser un numero entero!'),
        ],
        permissionId: [
          v => !!v || `${this.rolePermissionLabel.permissionId} es requerido!`,
          v => (v && v % 1 === 0 || 'permissionId debe ser un numero entero!'),
        ],
      },
      rolePermissionLabel: {
        roleId: "RoleId",
        permissionId: "PermissionId",
      },
    }),

    methods: {
      async onSubmitRolePermission() {},
    },
  };
</script>

<style></style>
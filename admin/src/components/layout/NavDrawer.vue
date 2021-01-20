<template>
  <v-navigation-drawer permanent expand-on-hover app>
    <v-list>
      <v-list-item link @click="$router.push({ name: 'Index' })">
        <v-list-item-content>
          <v-list-item-title class="title">{{
            currentShop.name
          }}</v-list-item-title>
          <v-list-item-subtitle>{{
            activeEmployee.role.name
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item link @click="$router.push({ name: 'Index' })">
        <v-list-item-icon>
          <v-icon>mdi-shopping-search</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Tiendas</v-list-item-title>
      </v-list-item>

      <hr />

      <v-list-item
        link
        @click="$router.push({ name: 'Dashboard' })"
        v-if="hasPermission('getShopDashboard')"
      >
        <v-list-item-icon>
          <v-icon>mdi-monitor-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item>

      <!--       <v-list-item link @click="$router.push({name: 'MasterProducts'})">
        <v-list-item-icon>
          <v-icon>mdi-tshirt-crew</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Productos Maestros</v-list-item-title>
      </v-list-item>-->

      <v-list-item
        link
        @click="$router.push({ name: 'Products' })"
        v-if="hasPermission('getProduct')"
      >
        <v-list-item-icon>
          <v-icon>mdi-tshirt-crew-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Productos</v-list-item-title>
      </v-list-item>

      <v-list-item
        link
        @click="$router.push({ name: 'Sales' })"
        v-if="hasPermission('getOrder')"
      >
        <v-list-item-icon>
          <v-icon>mdi-file-document</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Ventas</v-list-item-title>
      </v-list-item>

      <v-list-item
        link
        @click="$router.push({ name: 'Options' })"
        v-if="hasPermission('updateShop')"
      >
        <v-list-item-icon>
          <v-icon>mdi-cog</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Opciones</v-list-item-title>
      </v-list-item>

      <v-list-item
        link
        @click="$router.push({ name: 'Employees' })"
        v-if="hasPermission('getEmployee')"
      >
        <v-list-item-icon>
          <v-icon>mdi-account-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Empleados</v-list-item-title>
      </v-list-item>

      <v-list-item
        link
        @click="$router.push({ name: 'Roles' })"
        v-if="hasPermission('updateRole')"
      >
        <v-list-item-icon>
          <v-icon>mdi-account-details</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Roles</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  computed: {
    ...mapGetters('auth', ['permissions']),
    ...mapGetters('auth', ['currentShop']),
    ...mapState('auth', ['activeEmployee']),
  },
  methods: {
    hasPermission(permission) {
      return (
        this.permissions.includes(permission) ||
        this.permissions.includes('totalAccess')
      );
    },
  },
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn color="success" block text @click="newShopDialog = true"
          >Crear Tienda</v-btn
        >
      </v-col>
      <v-col>
        <v-btn color="accent" block text @click="invitationCode.state = true"
          >Linkear Tienda</v-btn
        >
      </v-col>
    </v-row>
    <hr />
    <h2>Tiendas en las que estas registrado</h2>
    <v-row>
      <v-col
        v-for="employee in currentUser.employees"
        :key="employee.id"
        xl="3"
        lg="4"
        sm="6"
      >
        <v-card>
          <v-card-title>{{ employee.shop.name }}</v-card-title>
          <v-card-subtitle> Rol: {{ employee.role.name }} </v-card-subtitle>
          <v-card-actions>
            <v-btn
              class="mx-auto"
              color="primary"
              :disabled="activeEmployee.shopId == employee.shopId"
              @click="setActiveEmployee(employee)"
              >Seleccionar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="invitationCode.state" max-width="690">
      <v-card :loading="invitationCode.loading">
        <v-card-title>Codigo de invitacion</v-card-title>
        <v-card-subtitle
          >Pega el codigo de invitacion que obtuviste.
        </v-card-subtitle>
        <v-card-text>
          <v-text-field outlined v-model="invitationCode.code"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn outlined block color="success" @click="linkShop()"
            >Linkear tienda</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="newShopDialog" max-width="690">
      <v-card class="pa-8">
        <ShopForm></ShopForm>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  components: { ShopForm: () => import('../components/forms/Shop.vue') },
  data() {
    return {
      invitationCode: {
        code: '',
        state: false,
        loading: false,
      },
      newShopDialog: false,
    };
  },
  computed: {
    ...mapState('auth', ['currentUser', 'activeEmployee']),
  },
  methods: {
    ...mapActions('auth', ['setActiveEmployee']),
    async linkShop() {
      try {
        const res = await this.$http.post(`shop/newEmployee`, {
          token: this.invitationCode.code,
        });
        this.$toast.succes('Se ha registrado en la tienda!');
      } catch (error) {
        this.$toast.error('Ocurrio un error!.');
      }
    },
  },
};
</script>

<style>
</style>

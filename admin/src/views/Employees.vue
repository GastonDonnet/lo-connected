<template>
  <v-container fluid class="mx-0 my-2">
    <v-btn
      class="mb-3"
      color="primary"
      @click="
        invitationCode.state = true;
        generateInvitationCode();
      "
      >Agregar Empleado</v-btn
    >
    <v-data-table
      :headers="headers"
      :items="employees"
      :options.sync="options"
      :server-items-length="totalEmployees"
      item-key="name"
      class="elevation-1"
      multi-sort
    >
      <template v-slot:item.client="{ item }">
        <v-chip color="grey lighten-5" @click="showUserInfo(item)">
          {{ item.user.firstName }} {{ item.user.lastName }}
          <v-icon right link>mdi-account-details</v-icon>
        </v-chip>
      </template>

      <template v-slot:item.createdAt="{ item }">
        <span>{{ item.createdAt.split('T').join(' ').slice(0, 16) }}</span>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon
          class="mx-2"
          color="error"
          small
          v-if="item.active"
          @click="disableAccount(item, true)"
          >mdi-delete</v-icon
        >
        <v-icon
          class="mx-2"
          color="success"
          small
          v-else
          @click="disableAccount(item, false)"
          >mdi-check</v-icon
        >

        <v-icon class="mx-2" small color="warning" @click="editRole(item)"
          >mdi-pen</v-icon
        >
      </template>
    </v-data-table>
    <v-dialog v-model="role.state">
      <v-card>
        <v-container>
          <v-select
            :items="roles"
            v-model="role.data"
            label="Rol"
            item-text="name"
            item-value="id"
            return-object
          ></v-select>
          <div class="text-center">
            <v-btn color="success" @click="patchRole()">Guardar</v-btn>
          </div>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog v-model="invitationCode.state" max-width="690">
      <v-card :loading="invitationCode.loading">
        <v-card-title>Codigo de invitacion</v-card-title>
        <v-card-subtitle
          >Enviale este codigo al empleado para que lo utilice en "Linkear
          Tienda". (10 minutos de duracion).
        </v-card-subtitle>
        <v-card-text>
          <v-text-field
            outlined
            disabled
            :value="invitationCode.code"
          ></v-text-field>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import Query from '../utils/query';

export default {
  data() {
    return {
      headers: [
        {
          text: 'Estado',
          value: 'active',
          align: 'center',
          sortable: false,
        },
        {
          text: 'Nombre y Apellido',
          value: 'user.displayName',
          sortable: false,
        },
        {
          text: 'Email',
          value: 'user.email',
          sortable: false,
        },
        {
          text: 'Telefono',
          value: 'user.telephone',
          sortable: false,
        },
        {
          text: 'Direccion',
          value: 'user.address[0].street',
          sortable: false,
        },
        {
          text: 'Rol',
          value: 'role.name',
        },
        {
          text: 'Acciones',
          value: 'actions',
          align: 'center',
          sortable: false,
        },
      ],
      employees: [],
      totalEmployees: 0,
      options: {
        sortBy: [],
        sortDesc: [],
      },
      role: {
        state: false,
        data: {},
      },
      roles: [],
      invitationCode: {
        state: false,
        loading: false,
      },
    };
  },
  computed: {
    ...mapGetters('auth', ['currentShop']),
  },
  methods: {
    getEmployees() {
      const { sortBy, sortDesc, page, itemsPerPage } = this.options;

      const url = new Query(`shop/${this.currentShop.id}/employee`)
        .sortBy(sortBy[0] || '', sortDesc[0] || '')
        .graph('[user.address, role]')
        .paginate(page, itemsPerPage).query;

      this.loading = true;
      this.$http
        .get(url)
        .then((response) => {
          this.employees = response.data.data.data;
          this.totalEmployees = response.data.data.results;
        })
        .catch((err) => console.log(err.response))
        .finally((this.loading = false));
    },
    getRoles() {
      this.$http.get(`shop/${this.currentShop.id}/role`).then((res) => {
        this.roles = res.data.data.data;
      });
    },
    editRole(employee) {
      this.getRoles();
      this.role.state = true;
      this.role.data = employee.role;
    },
    patchRole() {
      this.role.state = false;

      this.$http.patch(
        `shop/${this.currentShop.id}/employee/${this.role.data.id}`,
        {
          roleId: this.role.data.id,
        }
      );
    },
    disableAccount(employee, disable) {
      this.$http
        .patch(`shop/${this.currentShop.id}/employee/${employee.id}`, {
          active: !disable,
        })
        .then((res) => {
          employee.active = !disable;
        })
        .catch((err) => console.log(err.response));
    },
    async generateInvitationCode() {
      this.invitationCode.loading = true;
      const res = await this.$http.get(
        `shop/${this.currentShop.id}/invitationCode`
      );
      this.invitationCode.code = res.data.invitationCode;
      this.invitationCode.loading = false;
    },
  },
  watch: {
    options: {
      async handler() {
        console.log(this.options);
        if (this.employees.length) {
          await this.getEmployees();
        }
      },
      deep: true,
    },
  },
  async created() {
    await this.getEmployees();
  },
};
</script>

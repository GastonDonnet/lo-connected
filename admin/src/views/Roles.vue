<template>
  <v-container fluid class="mx-0 my-2">
    <v-btn class="mb-3" color="primary" @click="addRole()">Agregar Rol</v-btn>
    <v-data-table
      :headers="headers"
      :items="roles"
      :options.sync="options"
      :server-items-length="totalRoles"
      item-key="name"
      class="elevation-1"
      multi-sort
    >
      <template v-slot:item.permissions="{ item }">
        <div>
          <v-chip
            class="mx-1 my-1"
            v-for="(permission, i) in item.permissions"
            :key="i"
            color="primary"
            >{{ permission.name }}</v-chip
          >
        </div>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon small color="error" @click="deleteRole(item.id)" class="mr-4"
          >mdi-delete</v-icon
        >
        <v-icon small color="warning" @click="editRole(item)"
          >mdi-pencil</v-icon
        >
      </template>
    </v-data-table>

    <v-dialog v-model="role.dialog">
      <v-card>
        <v-container>
          <RoleForm
            @updateRoles="roleAdded"
            :propRole="role.data"
            :editing="role.editing"
          ></RoleForm>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import Query from '../utils/query';

export default {
  components: {
    RoleForm: () => import('@/components/forms/Role.vue'),
  },
  data() {
    return {
      headers: [
        {
          text: 'Nombre',
          value: 'name',
        },
        {
          text: 'Permisos',
          value: 'permissions',
        },
        {
          text: 'Acciones',
          value: 'actions',
          align: 'center',
          sortable: false,
        },
      ],
      roles: [],
      totalRoles: 0,
      options: {
        sortBy: [],
        sortDesc: [],
      },

      role: {
        dialog: false,
        data: {},
        editing: false,
      },
    };
  },
  computed: {
    ...mapGetters('auth', ['currentShop']),
  },
  methods: {
    getRoles() {
      const { sortBy, sortDesc, page, itemsPerPage } = this.options;

      const url = new Query(`shop/${this.currentShop.id}/role`)
        .sortBy(sortBy[0], sortDesc[0])
        .graph('[permissions]')
        .paginate(page, itemsPerPage).query;

      this.loading = true;
      this.$http
        .get(url)
        .then((response) => {
          this.roles = response.data.data.data;
          this.totalRoles = response.data.data.results;
        })
        .finally((this.loading = false));
    },
    addRole() {
      this.role = {
        dialog: true,
        data: {},
        editing: false,
      };
    },
    editRole(data) {
      this.role = {
        dialog: true,
        data: data,
        editing: true,
      };
    },
    roleAdded() {
      this.getRoles();
      this.role.dialog = false;
    },
    deleteRole(id) {
      this.$http
        .delete(`shop/${this.currentShop.id}/role/${id}`)
        .then(this.getRoles());
    },
  },
  watch: {
    options: {
      async handler() {
        if (this.roles.length) {
          await this.getRoles();
        }
      },
      deep: true,
    },
  },
  async created() {
    await this.getRoles();
  },
};
</script>

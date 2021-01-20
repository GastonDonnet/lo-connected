<template>
  <v-form ref="form" v-model="roleValid" class="text-center">
    <v-text-field
      v-model="role.name"
      :rules="roleRules.name"
      :label="roleLabel.name"
      required
    ></v-text-field>

    <v-select
      v-model="role.permissions"
      item-text="name"
      :items="permissions"
      label="Permisos"
      return-object
      multiple
      chips
    ></v-select>
    <v-btn
      v-if="!editing"
      :disabled="!roleValid || !role.permissions.length"
      color="success"
      class="mr-4"
      @click="postRole"
      >Agregar</v-btn
    >
    <v-btn
      v-else
      :disabled="!roleValid || !role.permissions.length"
      color="success"
      class="mr-4"
      @click="patchRole"
      >Guardar</v-btn
    >
  </v-form>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  props: {
    editing: {
      type: Boolean,
      default: false,
    },
    propRole: {
      type: Object,
    },
  },

  data: () => ({
    roleValid: true,

    role: {
      name: undefined,
      permissions: [],
    },
    roleRules: {
      name: [
        (v) => !!v || `El nombre es requerido!`,
        (v) =>
          (v && v.length < 500) ||
          'El nombre debe tener menos de 500 caracteres!',
      ],
    },
    roleLabel: {
      name: 'Nombre',
    },

    permissions: [],
  }),
  computed: {
    ...mapGetters('auth', ['currentShop']),
  },
  methods: {
    postRole() {
      this.$http
        .post(`shop/${this.currentShop.id}/role`, this.role)
        .then(this.$emit('updateRoles'));
    },
    patchRole() {
      this.role.permissions = this.role.permissions.map((el) => {
        return { id: el.id };
      });
      this.$http
        .patch(`shop/${this.currentShop.id}/role/${this.role.id}`, this.role)
        .then(this.$emit('updateRoles'))
        .catch((err) => console.log(err.response));
    },
    getPermissions() {
      this.$http.get('permission').then((res) => {
        this.permissions = res.data.data.data;
      });
    },
  },

  created() {
    this.getPermissions();
    this.role = {
      name: undefined,
      permissions: [],
    };
    if (this.editing) {
      this.role = { ...this.propRole };
    }
  },
};
</script>

<style></style>

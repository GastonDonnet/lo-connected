<template>
  <v-form ref="form" v-model="listValid" class="text-center">
    <v-text-field v-model="list.name" :counter="0" :rules="listRules.name" :label="listLabel.name" required></v-text-field>

    <v-text-field v-model="list.description" :counter="0" :rules="listRules.description" :label="listLabel.description"></v-text-field>

    <v-btn :disabled="!listValid" color="success" class="mr-4" @click="onSubmitList">Submit</v-btn>
  </v-form>
</template>
<script>
  export default {

    data: () => ({
      listValid: true,

      list: {
        name: undefined,
        description: undefined,
      },
      listRules: {
        name: [
          v => !!v || `${this.listLabel.name} es requerido!`,
        ],
        description: [],
      },
      listLabel: {
        name: "Name",
        description: "Description",
      },
    }),

    methods: {
      async onSubmitList() {},
    },
  };
</script>

<style></style>
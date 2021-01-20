<template>
  <v-form ref="form" v-model="dayValid" class="text-center">
    <v-radio-group v-model="day.day">
      <v-radio v-for="option in dayItems" :key="option" :label="`${option}`" :value="option"></v-radio>
    </v-radio-group>
    <v-btn :disabled="!dayValid" color="success" class="mr-4" @click="onSubmitDay">Submit</v-btn>
  </v-form>
</template>
<script>
  export default {

    data: () => ({
      dayValid: true,

      dayItems: ["lunes", "martes", "miercoles", "jueves", "sabado", "domingo", "feriado", "semana", "finDeSemana", "oneTime"],
      day: {
        day: undefined,
      },
      dayRules: {},
      dayLabel: {
        day: "Day",
      },
    }),

    methods: {
      async onSubmitDay() {},
    },
  };
</script>

<style></style>
<template>
  <div>
    <v-toolbar class="elevation-1">
      <v-toolbar-title>{{ options.title }}</v-toolbar-title>
      <v-switch
        v-model="show"
        :label="show ? 'Ocultar' : 'Mostrar'"
        class="ml-4"
        :loading="loading"
        hide-details
      ></v-switch>
      <v-spacer></v-spacer>
      <v-btn
        depressed
        small
        v-if="show && editing"
        @click="
          getTimes();
          editing = false;
        "
        :loading="loading"
        >Resetear</v-btn
      >
      <v-switch
        v-if="show"
        v-model="editing"
        :label="editing ? 'Guardar' : 'Editar'"
        color="success"
        class="ml-4"
        :loading="editLoading"
        @change="postTimes()"
        hide-details
      ></v-switch>
    </v-toolbar>
    <v-data-table
      class="elevation-2"
      :items="times"
      :headers="headers"
      dense
      :items-per-page="100"
      hide-default-footer
      v-if="show"
    >
      <template v-slot:item.horario="{ item }">
        <span>{{ `${item.from.slice(0, 5)} - ${item.to.slice(0, 5)}` }}</span>
      </template>

      <template v-slot:item.semana="{ item }">
        <v-simple-checkbox
          :disabled="!editing"
          :value="
            item.days.find((el) => !!el && el.day == 'semana') != undefined
          "
          :ripple="false"
          color="success"
          @input="modifyHourOfDay(item, 'semana')"
        ></v-simple-checkbox>
      </template>

      <template v-slot:item.lunes="{ item }">
        <v-simple-checkbox
          :disabled="!editing"
          :value="
            item.days.find((el) => !!el && el.day == 'lunes') != undefined
          "
          :ripple="false"
          color="success"
          @input="modifyHourOfDay(item, 'lunes')"
        ></v-simple-checkbox>
      </template>

      <template v-slot:item.martes="{ item }">
        <v-simple-checkbox
          :disabled="!editing"
          :value="
            item.days.find((el) => !!el && el.day == 'martes') != undefined
          "
          :ripple="false"
          color="success"
          @input="modifyHourOfDay(item, 'martes')"
        ></v-simple-checkbox>
      </template>
      <template v-slot:item.miercoles="{ item }">
        <v-simple-checkbox
          :disabled="!editing"
          :value="
            item.days.find((el) => !!el && el.day == 'miercoles') != undefined
          "
          :ripple="false"
          color="success"
          @input="modifyHourOfDay(item, 'miercoles')"
        ></v-simple-checkbox>
      </template>
      <template v-slot:item.jueves="{ item }">
        <v-simple-checkbox
          :disabled="!editing"
          :value="
            item.days.find((el) => !!el && el.day == 'jueves') != undefined
          "
          :ripple="false"
          color="success"
          @input="modifyHourOfDay(item, 'jueves')"
        ></v-simple-checkbox>
      </template>
      <template v-slot:item.viernes="{ item }">
        <v-simple-checkbox
          :disabled="!editing"
          :value="
            item.days.find((el) => !!el && el.day == 'viernes') != undefined
          "
          :ripple="false"
          color="success"
          @input="modifyHourOfDay(item, 'viernes')"
        ></v-simple-checkbox>
      </template>
      <template v-slot:item.sabado="{ item }">
        <v-simple-checkbox
          :disabled="!editing"
          :value="
            item.days.find((el) => !!el && el.day == 'sabado') != undefined
          "
          :ripple="false"
          color="success"
          @input="modifyHourOfDay(item, 'sabado')"
        ></v-simple-checkbox>
      </template>
      <template v-slot:item.domingo="{ item }">
        <v-simple-checkbox
          :disabled="!editing"
          :value="
            item.days.find((el) => !!el && el.day == 'domingo') != undefined
          "
          :ripple="false"
          color="success"
          @input="modifyHourOfDay(item, 'domingo')"
        ></v-simple-checkbox>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      headers: [
        {
          text: 'Semana',
          sortable: false,
          value: 'semana',
        },
        {
          text: 'Horario',
          sortable: false,
          value: 'horario',
        },
        {
          text: 'Lunes',
          sortable: false,
          value: 'lunes',
        },
        {
          text: 'Martes',
          sortable: false,
          value: 'martes',
        },
        {
          text: 'Miercoles',
          sortable: false,
          value: 'miercoles',
        },
        {
          text: 'Jueves',
          sortable: false,
          value: 'jueves',
        },
        {
          text: 'Viernes',
          sortable: false,
          value: 'viernes',
        },
        {
          text: 'Sabado',
          sortable: false,
          value: 'sabado',
        },
        {
          text: 'Domingo',
          sortable: false,
          value: 'domingo',
        },
      ],
      times: [
        {
          days: [],
          from: '00:00:00',
          to: '00:30:00',
        },
        {
          days: [],
          from: '00:30:00',
          to: '01:00:00',
        },
        {
          days: [],
          from: '01:00:00',
          to: '01:30:00',
        },
        {
          days: [],
          from: '01:30:00',
          to: '02:00:00',
        },
        {
          days: [],
          from: '02:00:00',
          to: '02:30:00',
        },
        {
          days: [],
          from: '02:30:00',
          to: '03:00:00',
        },
        {
          days: [],
          from: '03:00:00',
          to: '03:30:00',
        },
        {
          days: [],
          from: '03:30:00',
          to: '04:00:00',
        },
        {
          days: [],
          from: '04:00:00',
          to: '04:30:00',
        },
        {
          days: [],
          from: '04:30:00',
          to: '05:00:00',
        },
        {
          days: [],
          from: '05:00:00',
          to: '05:30:00',
        },
        {
          days: [],
          from: '05:30:00',
          to: '06:00:00',
        },
        {
          days: [],
          from: '06:00:00',
          to: '06:30:00',
        },
        {
          days: [],
          from: '06:30:00',
          to: '07:00:00',
        },
        {
          days: [],
          from: '07:00:00',
          to: '07:30:00',
        },
        {
          days: [],
          from: '07:30:00',
          to: '08:00:00',
        },
        {
          days: [],
          from: '08:00:00',
          to: '08:30:00',
        },
        {
          days: [],
          from: '08:30:00',
          to: '09:00:00',
        },
        {
          days: [],
          from: '09:00:00',
          to: '09:30:00',
        },
        {
          days: [],
          from: '09:30:00',
          to: '10:00:00',
        },
        {
          days: [],
          from: '10:00:00',
          to: '10:30:00',
        },
        {
          days: [],
          from: '10:30:00',
          to: '11:00:00',
        },
        {
          days: [],
          from: '11:00:00',
          to: '11:30:00',
        },
        {
          days: [],
          from: '11:30:00',
          to: '12:00:00',
        },
        {
          days: [],
          from: '12:00:00',
          to: '12:30:00',
        },
        {
          days: [],
          from: '12:30:00',
          to: '13:00:00',
        },
        {
          days: [],
          from: '13:00:00',
          to: '13:30:00',
        },
        {
          days: [],
          from: '13:30:00',
          to: '14:00:00',
        },
        {
          days: [],
          from: '14:00:00',
          to: '14:30:00',
        },
        {
          days: [],
          from: '14:30:00',
          to: '15:00:00',
        },
        {
          days: [],
          from: '15:00:00',
          to: '15:30:00',
        },
        {
          days: [],
          from: '15:30:00',
          to: '16:00:00',
        },
        {
          days: [],
          from: '16:00:00',
          to: '16:30:00',
        },
        {
          days: [],
          from: '16:30:00',
          to: '17:00:00',
        },
        {
          days: [],
          from: '17:00:00',
          to: '17:30:00',
        },
        {
          days: [],
          from: '17:30:00',
          to: '18:00:00',
        },
        {
          days: [],
          from: '18:00:00',
          to: '18:30:00',
        },
        {
          days: [],
          from: '18:30:00',
          to: '19:00:00',
        },
        {
          days: [],
          from: '19:00:00',
          to: '19:30:00',
        },
        {
          days: [],
          from: '19:30:00',
          to: '20:00:00',
        },
        {
          days: [],
          from: '20:00:00',
          to: '20:30:00',
        },
        {
          days: [],
          from: '20:30:00',
          to: '21:00:00',
        },
        {
          days: [],
          from: '21:00:00',
          to: '21:30:00',
        },
        {
          days: [],
          from: '21:30:00',
          to: '22:00:00',
        },
        {
          days: [],
          from: '22:00:00',
          to: '22:30:00',
        },
        {
          days: [],
          from: '22:30:00',
          to: '23:00:00',
        },
        {
          days: [],
          from: '23:00:00',
          to: '23:30:00',
        },
        {
          days: [],
          from: '23:30:00',
          to: '00:00:00',
        },
      ],
      editing: false,
      editLoading: false,
      show: false,
      loading: false,
    };
  },
  computed: {
    ...mapGetters('auth', ['currentShop']),
  },
  methods: {
    modifyHourOfDay(item, day) {
      const time = this.times.find((el) => el.from == item.from);

      time.modified = true;
      if (time.days.find((el) => el.day == day)) {
        time.days = time.days.filter((el) => !(el.day == day));
      } else {
        time.days.push({ day: day });
      }
    },

    getTimes() {
      this.loading = true;
      this.resetTimes();
      this.$http
        .get(
          `shop/${this.currentShop.id}/time?${
            this.options.delivery ? 'delivery=1' : 'delivery=0'
          }`
        )
        .then((res) => {
          for (const resTime of Array(...res.data.data.data)) {
            const index = this.times.findIndex((el) => el.from == resTime.from);
            this.times[index] = resTime;
            // time.id = resTime.id
            // time.days.push(time.day)
          }
        })
        .finally((this.loading = false));
    },
    postTimes() {
      if (this.editing) return;
      const modifiedTimes = this.times.filter((el) => el.modified);
      for (const modifiedTime of modifiedTimes) {
        modifiedTime.shopId = this.currentShop.id;
        modifiedTime.delivery = this.options.delivery;
        if (modifiedTime.id) {
          this.$http
            .patch(
              `shop/${this.currentShop.id}/time/${modifiedTime.id}`,
              modifiedTime
            )
            .then((res) => console.log(res))
            .catch((err) => console.log(err.response));
        } else {
          this.$http
            .post(`shop/${this.currentShop.id}/time/`, modifiedTime)
            .then((res) => console.log(res))
            .catch((err) => console.log(err.response));
        }
      }
    },
    resetTimes() {
      this.times = [
        {
          days: [],
          from: '00:00:00',
          to: '00:30:00',
        },
        {
          days: [],
          from: '00:30:00',
          to: '01:00:00',
        },
        {
          days: [],
          from: '01:00:00',
          to: '01:30:00',
        },
        {
          days: [],
          from: '01:30:00',
          to: '02:00:00',
        },
        {
          days: [],
          from: '02:00:00',
          to: '02:30:00',
        },
        {
          days: [],
          from: '02:30:00',
          to: '03:00:00',
        },
        {
          days: [],
          from: '03:00:00',
          to: '03:30:00',
        },
        {
          days: [],
          from: '03:30:00',
          to: '04:00:00',
        },
        {
          days: [],
          from: '04:00:00',
          to: '04:30:00',
        },
        {
          days: [],
          from: '04:30:00',
          to: '05:00:00',
        },
        {
          days: [],
          from: '05:00:00',
          to: '05:30:00',
        },
        {
          days: [],
          from: '05:30:00',
          to: '06:00:00',
        },
        {
          days: [],
          from: '06:00:00',
          to: '06:30:00',
        },
        {
          days: [],
          from: '06:30:00',
          to: '07:00:00',
        },
        {
          days: [],
          from: '07:00:00',
          to: '07:30:00',
        },
        {
          days: [],
          from: '07:30:00',
          to: '08:00:00',
        },
        {
          days: [],
          from: '08:00:00',
          to: '08:30:00',
        },
        {
          dateId: '17',
          days: [],
          from: '08:30:00',
          to: '09:00:00',
        },
        {
          dateId: '18',
          days: [],
          from: '09:00:00',
          to: '09:30:00',
        },
        {
          dateId: '19',
          days: [],
          from: '09:30:00',
          to: '10:00:00',
        },
        {
          dateId: '20',
          days: [],
          from: '10:00:00',
          to: '10:30:00',
        },
        {
          dateId: '21',
          days: [],
          from: '10:30:00',
          to: '11:00:00',
        },
        {
          dateId: '22',
          days: [],
          from: '11:00:00',
          to: '11:30:00',
        },
        {
          dateId: '23',
          days: [],
          from: '11:30:00',
          to: '12:00:00',
        },
        {
          dateId: '24',
          days: [],
          from: '12:00:00',
          to: '12:30:00',
        },
        {
          dateId: '25',
          days: [],
          from: '12:30:00',
          to: '13:00:00',
        },
        {
          dateId: '26',
          days: [],
          from: '13:00:00',
          to: '13:30:00',
        },
        {
          dateId: '27',
          days: [],
          from: '13:30:00',
          to: '14:00:00',
        },
        {
          dateId: '28',
          days: [],
          from: '14:00:00',
          to: '14:30:00',
        },
        {
          dateId: '29',
          days: [],
          from: '14:30:00',
          to: '15:00:00',
        },
        {
          dateId: '30',
          days: [],
          from: '15:00:00',
          to: '15:30:00',
        },
        {
          dateId: '31',
          days: [],
          from: '15:30:00',
          to: '16:00:00',
        },
        {
          dateId: '32',
          days: [],
          from: '16:00:00',
          to: '16:30:00',
        },
        {
          dateId: '33',
          days: [],
          from: '16:30:00',
          to: '17:00:00',
        },
        {
          dateId: '34',
          days: [],
          from: '17:00:00',
          to: '17:30:00',
        },
        {
          dateId: '35',
          days: [],
          from: '17:30:00',
          to: '18:00:00',
        },
        {
          dateId: '36',
          days: [],
          from: '18:00:00',
          to: '18:30:00',
        },
        {
          dateId: '37',
          days: [],
          from: '18:30:00',
          to: '19:00:00',
        },
        {
          dateId: '38',
          days: [],
          from: '19:00:00',
          to: '19:30:00',
        },
        {
          dateId: '39',
          days: [],
          from: '19:30:00',
          to: '20:00:00',
        },
        {
          dateId: '40',
          days: [],
          from: '20:00:00',
          to: '20:30:00',
        },
        {
          dateId: '41',
          days: [],
          from: '20:30:00',
          to: '21:00:00',
        },
        {
          dateId: '42',
          days: [],
          from: '21:00:00',
          to: '21:30:00',
        },
        {
          dateId: '43',
          days: [],
          from: '21:30:00',
          to: '22:00:00',
        },
        {
          dateId: '44',
          days: [],
          from: '22:00:00',
          to: '22:30:00',
        },
        {
          dateId: '45',
          days: [],
          from: '22:30:00',
          to: '23:00:00',
        },
        {
          dateId: '46',
          days: [],
          from: '23:00:00',
          to: '23:30:00',
        },
        {
          dateId: '47',
          days: [],
          from: '23:30:00',
          to: '00:00:00',
        },
      ];
    },
  },
  async created() {
    this.getTimes();
  },
};
</script>

<style>
</style>

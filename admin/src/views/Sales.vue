<template>
  <v-container fluid class="mx-0 my-2">
    <v-data-table
      :headers="headers"
      :items="orders"
      :options.sync="options"
      :server-items-length="totalOrders"
      item-key="name"
      class="elevation-1"
      multi-sort
    >
      <template v-slot:item.state="{ item }">
        <v-chip
          :color="orderState.find((el) => el.id == item.orderStateId).color"
          v-if="item.orderStateId < 100"
        >
          <v-icon
            left
            v-if="item.orderStateId > 1"
            @click="changeStateIncrement(item, -1)"
            >mdi-arrow-left-thick</v-icon
          >
          <v-icon
            left
            v-else
            @click="
              state.data.item = item;
              (state.data.stateId = 101), (state.dialog = true);
            "
            >mdi-cancel</v-icon
          >
          {{ orderState.find((el) => el.id == item.orderStateId).name }}
          <v-icon
            v-if="item.orderStateId < 5"
            right
            link
            @click="changeStateIncrement(item, 1)"
            >mdi-arrow-right-thick</v-icon
          >
        </v-chip>
        <v-chip
          v-else
          :color="orderState.find((el) => el.id == item.orderStateId).color"
          >{{
            orderState.find((el) => el.id == item.orderStateId).name
          }}</v-chip
        >
      </template>

      <template v-slot:item.details="{ item }">
        <v-btn
          icon
          color="primary"
          @click="
            details.dialog = !details.dialog;
            details.data = item.id;
          "
        >
          <v-icon>mdi-details</v-icon>
        </v-btn>
      </template>

      <template v-slot:item.deliveryDate="{ item }">
        <v-chip v-if="item.deliveryDate" :color="colorDay(item.deliveryDate)">{{
          item.deliveryDate | toDayString
        }}</v-chip>
      </template>

      <template v-slot:item.client="{ item }">
        <v-chip color="grey lighten-5" @click="showUserInfo(item)">
          {{ item.user.displayName }}
          <v-icon right link>mdi-account-details</v-icon>
        </v-chip>
      </template>

      <template v-slot:item.note="{ item }">
        <v-btn
          v-if="item.note"
          icon
          color="primary"
          @click="
            note.data = item.note;
            note.dialog = !note.dialog;
          "
        >
          <v-icon link>mdi-note</v-icon>
        </v-btn>
      </template>

      <template v-slot:item.paymentType="{ item }">
        <v-icon
          color="success darken-1"
          v-if="item.paymentMethod === 'efectivo'"
          >mdi-cash</v-icon
        >
        <v-icon
          color="accent darken-1"
          v-else-if="item.paymentMethod === 'tarjeta'"
          >mdi-credit-card</v-icon
        >
      </template>

      <template v-slot:item.delivery="{ item }">
        <v-icon v-if="item.delivery" color="accent darken-3"
          >mdi-truck-fast-outline</v-icon
        >
        <v-icon v-else color="grey lighten-1">mdi-home-city-outline</v-icon>
      </template>

      <template v-slot:item.total="{ item }">
        <span>${{ item.total }}</span>
      </template>

      <template v-slot:item.createdAt="{ item }">
        <span>{{ item.createdAt.split('T').join(' ').slice(0, 16) }}</span>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon
          v-if="item.orderStateId < 100"
          small
          @click="
            state.data.item = item;
            (state.data.stateId = 101), (state.dialog = true);
          "
          >mdi-cancel</v-icon
        >
        <v-icon
          v-else-if="item.orderStateId > 100"
          small
          @click="
            state.data.item = item;
            (state.data.stateId = 1), (state.dialog = true);
          "
          >mdi-reload</v-icon
        >
      </template>
    </v-data-table>

    <!-- User Info -->
    <v-dialog v-model="user.dialog">
      <v-card>
        <UserForm :user="user.data"></UserForm>
      </v-card>
    </v-dialog>

    <!-- Note Info -->
    <v-dialog v-model="note.dialog">
      <v-card>
        <v-textarea
          class="pa-8"
          outlined
          hide-details
          rows="5"
          readonly
          :value="note.data"
        ></v-textarea>
      </v-card>
    </v-dialog>

    <!-- Details Info -->
    <v-dialog
      v-model="details.dialog"
      :style="this.$vuetify.breakpoint.lgAndUp ? 'max-width: 900px' : ''"
    >
      <v-card>
        <v-container>
          <SaleDetail :orderId="details.data"></SaleDetail>
        </v-container>
      </v-card>
    </v-dialog>

    <!-- Confirm Change State -->
    <v-dialog persistent v-model="state.dialog" max-width="300px">
      <v-card>
        <v-card-title
          >Desea {{ state.data.stateId == 101 ? 'cancelar' : 're-generar' }} la
          orden?</v-card-title
        >
        <v-btn depressed tile @click="state.dialog = false">No</v-btn>
        <v-btn
          depressed
          tile
          color="error"
          class="float-right"
          @click="
            changeState(state.data.item, state.data.stateId);
            state.dialog = false;
          "
          >Si</v-btn
        >
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import Query from '../utils/query';

export default {
  components: {
    UserForm: () => import('@/components/sales/User'),
    SaleDetail: () => import('@/components/sales/Detail'),
  },
  data() {
    return {
      headers: [
        {
          text: 'Estado',
          value: 'state',
          align: 'center',
          sortable: false,
        },
        {
          text: 'Detalles',
          value: 'details',
          align: 'center',
          sortable: false,
        },

        {
          text: 'Comprador',
          value: 'client',
          sortable: false,
        },
        {
          text: 'Nota',
          value: 'note',
          align: 'center',
          sortable: false,
        },
        {
          text: 'Horario de entrega',
          value: 'deliveryTime',
          align: 'center',
        },
        {
          text: 'Fecha de entrega',
          value: 'deliveryDate',
          align: 'center',
        },
        {
          text: 'Tipo de pago',
          value: 'paymentType',
          align: 'center',
          sortable: false,
        },
        {
          text: 'Delivery',
          value: 'delivery',
          align: 'center',
          sortable: false,
        },
        {
          text: 'Total',
          value: 'total',
          align: 'center',
        },
        {
          text: 'Direccion',
          value: 'clientAddress',
        },
        {
          text: 'Telefono',
          value: 'telephone',
        },
        {
          text: 'Generada',
          value: 'createdAt',
        },
        {
          text: 'Acciones',
          value: 'actions',
          align: 'center',
          sortable: false,
        },
      ],
      orders: [],
      totalOrders: 0,
      options: {
        sortBy: [],
        sortDesc: [],
      },

      orderState: [
        {
          id: 1,
          name: 'Generada',
          description: 'Order realizada, aun no atendida',
          color: 'primary lighten-2',
        },
        {
          id: 2,
          name: 'En Preparacion',
          description: 'Order aceptada, en preparacion',
          color: 'accent',
        },
        {
          id: 3,
          name: 'Esperando Envio',
          description: 'Order ya preparada, esperando asignacion de envio',
          color: 'secondary darken-2',
        },
        {
          id: 4,
          name: 'En Envio',
          description: 'Orden asignada a envio, en camino al cliente',
          color: 'success lighten-1',
        },
        {
          id: 5,
          name: 'Cerrada',
          description: 'Orden entregada a cliente y aceptada',
          color: 'success',
        },
        {
          id: 100,
          name: 'Cancelada',
          description: 'Orden cancelada',
          color: 'error',
        },
        {
          id: 101,
          name: 'Rechazada por vendedor',
          description: 'Order rechazada por el vendedor',
          color: 'error',
        },
        {
          id: 102,
          name: 'Rechazada por cliente',
          description: 'Orden enviada a cliente y rechazada',
          color: 'error lighten-2',
        },
      ],
      orderStatus: [
        {
          id: 1,
          name: 'En espera',
        },
        {
          id: 2,
          name: 'Procesando',
        },
        {
          id: 3,
          name: 'Suspendida',
        },
        {
          id: 4,
          name: 'Terminada',
        },
        {
          id: 5,
          name: 'Error',
        },
      ],
      orderProductState: [
        {
          id: 1,
          name: 'No Preparado',
          description: 'Producto no preparado',
        },
        {
          id: 2,
          name: 'En Preparacion',
          description: 'Producto siendo preparado',
        },
        {
          id: 3,
          name: 'Preparado',
          description: 'Producto preparado',
        },
        {
          id: 101,
          name: 'Fuera de stock',
          description: 'Producto fuera de stock',
        },
        {
          id: 102,
          name: 'Producto rechazado',
          description: 'Producto rechazado por razones no especificadas.',
        },
      ],

      user: {
        dialog: false,
        data: [],
      },
      note: {
        dialog: false,
        data: [],
      },
      details: {
        dialog: false,
        data: {},
      },
      state: {
        dialog: false,
        data: {},
      },
    };
  },
  computed: {
    ...mapGetters('auth', ['currentShop']),
    ...mapState('auth', ['currentUser']),
  },
  methods: {
    getOrders() {
      const { sortBy, sortDesc, page, itemsPerPage } = this.options;
      const url = new Query(`shop/${this.currentShop.id}/order`)
        .sortBy(sortBy[0], sortDesc[0])
        .graph('[state, transactions, products.[transactions, variant], user]')
        .paginate(page, itemsPerPage).query;

      this.loading = true;
      this.$http
        .get(url)
        .then((response) => {
          this.orders = response.data.data.data;
          this.totalOrders = response.data.data.results;
          console.log(response);
        })
        .finally((this.loading = false));
    },
    changeStateIncrement(order, increment) {
      if (increment == -1 && order.orderStateId == 1) return;
      if (increment == 1 && order.orderStateId == 5) return;

      this.$http
        .patch(`order/state/${order.id}`, {
          orderStateId: order.orderStateId + increment,
        })
        .then((res) => {
          console.log(this.orders.find((el) => el.id == order.id).orderStateId);
          this.orders.find((el) => el.id == order.id).orderStateId =
            res.data.data.data.orderStateId;
        })
        .catch((err) => console.log(err.response));
    },
    changeState(order, stateId) {
      this.$http
        .patch(`order/state/${order.id}`, {
          orderStateId: stateId,
        })
        .then((res) => {
          this.orders.find((el) => el.id == order.id).orderStateId =
            res.data.data.data.orderStateId;
        })
        .catch((err) => console.log(err.response));
    },

    showUserInfo(order) {
      console.log(order);
      this.user.dialog = !this.user.dialog;
      this.user.data = order.user;
    },
    colorDay(date) {
      if (new Date(date) < new Date()) {
        return 'error';
      }
      const day = new Date(date).getUTCDay();
      const today = new Date().getUTCDay();
      if (day == today) return 'success';
      if (day == today + 1) return 'success lighten-2';
      if (day == today + 2) return 'warning';
      return '';
    },
  },
  watch: {
    options: {
      async handler() {
        await this.getOrders();
      },
      deep: true,
    },
  },
  filters: {
    toDayString(val) {
      if (new Date(val) < new Date()) {
        return 'Atrasado';
      }
      const day = new Date(val).getUTCDay();
      const today = new Date().getUTCDay();
      if (day == today) return 'Hoy';
      if (day == today + 1) return 'Mañana';
      if (day == today + 2) return 'Pasado Mañana';
      return val.split('T')[0];
    },
  },
};
</script>

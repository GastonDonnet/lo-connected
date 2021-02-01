<template>
  <div>
    <v-form v-model="isValid">
      <v-row no-gutters>
        <v-col>
          <p class="mb-4 font-weight-bold">Forma de Pago</p>
          <v-radio-group v-model="order.paymentMethod" row>
            <v-radio label="Efectivo" value="efectivo"></v-radio>
            <v-radio label="Tarjeta" value="tarjeta"></v-radio>
          </v-radio-group>
          <div v-if="order.paymentMethod === 'efectivo'">
            <v-text-field
              v-model="order.paymentPrediction"
              outlined
              placeholder="Con cuanto va a pagar?"
            ></v-text-field>
          </div>
        </v-col>
      </v-row>
      <v-divider class="my-2"></v-divider>

      <v-row>
        <v-col>
          <p class="mb-4 font-weight-bold">Tipo de entrega</p>
          <v-radio-group v-model="order.delivery" row>
            <v-radio label="Delivery" :value="true"></v-radio>
            <v-radio label="Entrega en el local" :value="false"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-divider class="my-2"></v-divider>

      <div v-if="order.delivery">
        <v-row>
          <v-col>
            <p class="mb-4 font-weight-bold">Direccion</p>
            <v-select
              v-model="order.address"
              :items="currentUser.address"
              :rules="rules.address"
              item-text="street"
              label="Dirección de envio"
              outlined
              return-object
            ></v-select>
            <div v-if="order.address">
              <v-row>
                <v-col>
                  <span>Ciudad:</span>
                  <span class="font-weight-light mx-2">{{
                    `${order.address.city.name}, ${order.address.city.province.name}`
                  }}</span>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <span>Direccion:</span>
                  <span class="font-weight-light mx-2">{{
                    order.address.street
                  }}</span>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <span>Notas:</span>
                  <span class="font-weight-light mx-2">{{
                    order.address.note
                  }}</span>
                </v-col>
              </v-row>
            </div>
            <div class="text-center">
              <v-btn color="success" depressed @click="addingAddress = true"
                >Crear nueva direccion</v-btn
              >
            </div>
          </v-col>
        </v-row>
        <v-divider class="my-2"></v-divider>
      </div>

      <div v-if="order.delivery">
        <v-row>
          <v-col>
            <p class="mb-4 font-weight-bold">Horario de entrega</p>

            <v-row justify="center" align="center" class="text-center">
              <v-col>
                <v-select
                  v-model="deliveryDate"
                  :items="shopDeliveryDays"
                  :item-text="(item) => `${item.dayText}`"
                  :rules="rules.deliveryDate"
                  label="Dia de entrega"
                  outlined
                  return-object
                ></v-select>
              </v-col>
              <v-col>
                <v-select
                  v-if="deliveryDate"
                  v-model="deliveryTime"
                  :rules="rules.deliveryTime"
                  :items="shopDeliveryTimes"
                  :item-text="(item) => `${item.from} - ${item.to}`"
                  label="Horario estimato de entrega"
                  outlined
                  return-object
                ></v-select>
              </v-col>
            </v-row>

            <!--  <v-select
              v-model="order.deliveryDay"
              :rules="rules.deliveryDay"
              :items="deliveryDays"
              item-text="text"
              label="Dia de entrega"
              outlined
              return-object
            ></v-select>-->
          </v-col>
        </v-row>
        <v-divider class="my-2"></v-divider>
      </div>

      <v-row>
        <v-col>
          <p class="mb-4 font-weight-bold">Nota</p>
          <v-text-field
            v-model="order.note"
            outlined
            placeholder="Quieres dejar una nota?"
          ></v-text-field>
        </v-col>
      </v-row>

      <div class="my-2 text-center">
        <v-btn
          color="primary"
          depressed
          block
          @click="onSubmit()"
          :disabled="!isValid"
          >Continuar</v-btn
        >
      </div>
    </v-form>
    <v-dialog v-model="addingAddress">
      <v-card class="pa-4">
        <AddressForm @addressAdded="addingAddress = false"></AddressForm>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    AddressForm: () => import('@/components/forms/Address.vue'),
  },
  data() {
    return {
      isValid: false,
      addingAddress: false,
      order: {
        paymentMethod: 'efectivo',
        paymentPrediction: null,
        address: '',
        delivery: true,
        deliveryTime: null,
        deliveryDay: null,
        note: '',
      },
      shopTimes: [],
      deliveryDate: '',
      deliveryTime: '',

      days: [
        'domingo',
        'lunes',
        'martes',
        'miercoles',
        'jueves',
        'viernes',
        'sabado',
        'semana',
        'finDeSemana',
      ],
    };
  },
  computed: {
    ...mapState('auth', ['currentUser']),
    ...mapState('shop', ['currentShop']),
    rules() {
      return {
        deliveryDate: [
          (v) =>
            (this.order.delivery && !!v) ||
            'Debe elegir el dia en que te llevan el pedido!',
        ],
        deliveryTime: [
          (v) =>
            (this.order.delivery && !!v) ||
            'Debe elegir el momento del dia en que te llevan el pedido!',
        ],
        address: [
          (v) =>
            (this.order.delivery && !!v) ||
            'Debe elegir la dirección a la cual se llevara el pedido!',
        ],
      };
    },
    shopDeliveryDates() {
      return this.shopTimes.filter((el) => {
        return el.delivery === 1;
      });
    },
    shopDeliveryDays() {
      if (!this.shopTimes.length) return [];

      const nextDates = [];
      for (const i of Array(3).keys()) {
        nextDates.push(
          new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString()
        );
      }

      let today = new Date().getDay();
      if (today == 7) today = 0;
      const days = [];

      for (const i of Array(3).keys()) {
        const day = today + i;

        let condition = false;
        if (this.shopDeliveryDaysResumed.includes(this.days[day]))
          condition = true;
        else if (
          this.shopDeliveryDaysResumed.includes('semana') &&
          day > 0 &&
          day < 6
        )
          condition = true;

        if (condition) {
          if (i == 0) {
            days.push({
              dayText: `Hoy (${this.days[day]})`,
              day: `${nextDates[i]}`,
            });
          } else if (i == 1) {
            days.push({
              dayText: `Mañana (${this.days[day]})`,
              day: `${nextDates[i]}`,
            });
          } else if (i == 2) {
            days.push({
              dayText: `Pasado Mañana (${this.days[day]})`,
              day: `${nextDates[i]}`,
            });
          }
        }
      }
      return days;
    },
    shopDeliveryDaysResumed() {
      const shopDeliveryDays = [];
      this.shopDeliveryDates
        .map((el) => {
          return el.days.map((el) => el.day);
        })
        .forEach((el) => {
          el.forEach((el2) => {
            if (!shopDeliveryDays.includes(el2)) {
              shopDeliveryDays.push(el2);
            }
          });
        });
      return shopDeliveryDays;
    },
    shopDeliveryTimes() {
      const selectedDay = new Date(this.deliveryDate.day).getDay();
      const days = this.shopDeliveryDates.map((el) =>
        el.days.map((el) => el.day)
      );
      if (this.shopDeliveryDaysResumed.includes(this.days[selectedDay])) {
        return this.shopDeliveryDates.filter((el, i) => {
          if (
            el.days.findIndex((el2) => el2.day == this.days[selectedDay]) >= 0
          ) {
            return i;
          }
        });
      }
      if (
        this.shopDeliveryDaysResumed.includes('semana') &&
        selectedDay > 0 &&
        selectedDay < 6
      ) {
        return this.shopDeliveryDates.filter((el, i) => {
          if (el.days.findIndex((el2) => el2.day == 'semana') >= 0) {
            return i;
          }
        });
      }
    },
  },
  methods: {
    ...mapActions('orders', ['updateNewOrderData']),
    onSubmit() {
      this.$emit('changeStep', 3);

      if (this.order.delivery) {
        this.order.addressId = this.order.address.id;
        this.order.deliveryDate = this.deliveryDate;
        this.order.deliveryTime = this.deliveryTime;
      }

      this.updateNewOrderData(this.order);
    },
    getTimes() {
      this.$http.get(`shop/${this.currentShop.id}/time`).then((res) => {
        this.shopTimes = res.data.data.data;
        //console.log("Getted")
      });
    },
  },
  created() {
    this.getTimes();
  },
};
</script>

<style>
</style>

<template>
  <bar-chart :chart-data="datacollection"></bar-chart>
</template>

<script>
  import BarChart from './BarChart'

  export default {
    props: {
      shop: Object
    },
    components: {
      BarChart
    },
    data() {
      return {
        datacollection: {}
      }
    },
    mounted() {
      this.fillData()
    },
    methods: {
      fillData() {
        const year = new Date().getUTCFullYear()
        const datacollection = {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto',
            'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
          ],
          datasets: [{
              label: 'Año pasado',
              backgroundColor: 'grey',
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
              label: 'Este año',
              backgroundColor: 'orange',
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
          ]
        }
        this.$http.get(
          `shop/${this.shop.id}/getTotal?from=${year-1}-01-01&to=${year-1}-12-30&freq=month`).then(
          res => {
            res.data.data.data.forEach(el => {
              let mes = el.updatedAt.split('-')[1]
              if (mes.charAt(0) == '0') mes = mes[1]
              datacollection.datasets[1].data[mes] = el.sumtotal
            })

            this.$http.get(
                `shop/${this.shop.id}/getTotal?from=${year}-01-01&to=${year}-12-30&freq=month`)
              .then(
                res => {
                  res.data.data.data.forEach(el => {
                    let mes = el.updatedAt.split('-')[1]
                    if (mes.charAt(0) == '0') mes = mes[1]
                    datacollection.datasets[1].data[mes] = el.sumtotal
                  })
                  this.datacollection = datacollection
                })
          })
      },
    }
  }

</script>

<style>
</style>

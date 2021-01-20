<template>
  <pie-chart :chart-data="datacollection"></pie-chart>
</template>

<script>
  import PieChart from './PieChart'

  export default {
    props: {
      shop: Object
    },
    components: {
      PieChart
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
        const today = new Date().toISOString().split('T')[0]

        const datacollection = {
          labels: ['Efectivo', 'Tarjeta'],
          datasets: [{
              backgroundColor: ['lightgreen', '#31dde7'],
              data: [0,0]
            },
          ]
        }
 
        this.$http.get(
          `shop/${this.shop.id}/getTotal?from=${today}T00:00&to=${today}:23:59&freq=payment`
          ).then(
          res => {
            console.log(res)
            res.data.data.data.forEach((el, i) => {
              datacollection.datasets[0].data[i] = el.sumtotal
            })
          this.datacollection = datacollection
          })
      },
    }
  }

</script>

<style>
</style>

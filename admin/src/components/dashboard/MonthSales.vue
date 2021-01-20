<template>
  <div>
    <bar-chart :chart-data="datacollection"></bar-chart>
  </div>
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
        const today = new Date().toISOString()
        const [year, month] = today.split('-')
        const lastDayOfMonth = new Date(year * 1, month * 1 + 1, 0).getDate()
        const months = [...Array(lastDayOfMonth+1).keys()].slice(1)

        let previousMonth = month-1
        if (previousMonth<10) previousMonth = `0${previousMonth}`
        const lastDayOfPreviousMonth = new Date(year * 1, month * 1, 0).getDate()

        const datacollection = {
          labels: months,
          datasets: [{
              label: 'Mes Pasado',
              backgroundColor: 'grey',
              data: [...Array(lastDayOfPreviousMonth)]
            },
            {
              label: 'Este Mes',
              backgroundColor: 'orange',
              data: [...Array(lastDayOfMonth)]
            }
          ]
        }
 
        this.$http.get(
          `shop/${this.shop.id}/getTotal?from=${year}-${previousMonth}-01&to=${year}-${previousMonth}-${lastDayOfPreviousMonth}&freq=day`
          ).then(
          res => {
            res.data.data.data.forEach(el => {
              const day = el.updatedAt.split('T')[0].split('-')[2]
              datacollection.datasets[0].data[day * 1 -1] = el.sumtotal
            })

            this.$http.get(
                `shop/${this.shop.id}/getTotal?from=${year}-${month}-01&to=${year}-${month}-${lastDayOfMonth}&freq=day`
                )
              .then(
                res => {
                  res.data.data.data.forEach(el => {
                    const day = el.updatedAt.split('T')[0].split('-')[2]
                    datacollection.datasets[1].data[day * 1 -1] = el.sumtotal
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

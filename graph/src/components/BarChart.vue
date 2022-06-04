<template>
  <Bar :chart-options="chartOptions" :chart-data="chartData" />
</template>

<script>
import { Bar } from 'vue-chartjs/legacy'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { mapGetters } from 'vuex'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  computed: {
    ...mapGetters(['getCategoryReady', 'con']),

    chartData() {
      return {
        labels: this.getCategoryReady,
        datasets: [{
          data: this.con
        }]
      }
    },
    chartOptions() { return { responsive: true } }
  },
}
</script>


   
<template>
  <Bar :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId" :dataset-id-key="datasetIdKey"
    :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
</template>

<script>
import { Bar } from 'vue-chartjs/legacy'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
// import { mapGetters } from 'vuex'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => { }
    },
    plugins: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      // chartData: {
      //   labels: ['Food', 'Transport', 'Education', 'Entertainment', 'Sport'],
      //   datasets: [{
      //     data: [1,2,3,4,5]
      //   }]
      // },
      // chartOptions: {
      //   responsive: true
      // }
    }
  },
  computed: {
    // "chartData.datasets.0.data"
    getPL() {
      return this.$store.getters.getPaymentsList
    },
    getCL() {
      return this.$store.getters.getCategoryList
    },
    con() {
      const test = [];
      for (let l in this.chartData.labels) {
        const filtred = this.$store.getters.getPaymentsList.filter(f => f.category === this.chartData.labels[l]);
        const total = filtred.reduce((acc, f) => acc + f.value, 0);
        test.push(total)
      }
      return test;
    },
    chartData() {
      return {

        labels: ['Food', 'Transport', 'Education', 'Entertainment', 'Sport'],
        datasets: [{
          data: [1,2,3,4,5]
        }]

      }
    },
    chartOptions() { return { responsive: true } }
  },
  methods: {

  }

}
</script>


   
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
      chartData: {
        labels: ['Food', 'Transport', 'Education', 'Entertainment', 'Sport'],
        datasets: [{
          data: this.con
        }]
      },
      chartOptions: {
        responsive: true
      }
    }
  },
  computed: {

    getPL() {
      return this.$store.getters.getPaymentsList
    },
    con() {
      const test = [];
      for (let l in this.chartData.labels) {
        const filtred = this.$store.getters.getPaymentsList.filter(f => f.category === this.chartData.labels[l]);
        const total = filtred.reduce((acc, f) => acc + f.value, 0);
        test.push(total)
        
      }  
      return test;  
      
    }
    // takeArr() {
    //   this.chartData.labels.forEach(l => {
    //     let test = this.getPL.filter(f => f.category === this.chartData.labels[l]);
    //     console.log(test);
    //     const total = test.reduce((acc, f) => acc + f.value, 0);
    //     console.log(total);
    //   })
    // },
  },
  // methods: {
  //   takeArr() {
  //     for ( l in this.chartData.labels){
  //       let test = this.getPL.filter(f => f.category === this.chartData.labels[l]);
  //       console.log(test);
  //       const total = test.reduce((acc, f) => acc + f.value, 0);
  //       console.log(total);
  //       return total
  //     }
  //   }
  // }

}
</script>

<!-- <template>
    <div>
      <ejs-accumulationchart
          id='container'
          ref='pie'
          style='display:block'
          :theme='theme'
          :legendSettings='legendSettings'
          :tooltip='tooltip'
          :enableAnimation='enableAnimation'
          :enableSmartLabels='enableSmartLabels'>
        <e-accumulation-series-collection>
          <e-accumulation-series
              :dataSource='data'
              xName='x'
              yName='y'
              :radius='radius'
              innerRadius='25%'
              :dataLabel='dataLabel'></e-accumulation-series>
        </e-accumulation-series-collection>
      </ejs-accumulationchart>
    </div>
</template>

<script>
import Vue from 'vue'
import {
  AccumulationChartPlugin,
  AccumulationLegend,
  PieSeries,
  AccumulationDataLabel,
  AccumulationTooltip
} from '@syncfusion/ej2-vue-charts'
import { mapGetters } from 'vuex'
Vue.use(AccumulationChartPlugin)
export default Vue.extend({
  data () {
    return {
      theme: 'Dark',
      data: [
        { x: 'Preloader', y: 100, r: '70%' }
      ],
      radius: 'r',
      legendSettings: { visible: true },
      dataLabel: { visible: true, position: 'Outside', name: 'x' },
      tooltip: {
        enable: true
      },
      enableAnimation: true,
      enableSmartLabels: true
    }
  },
  provide: {
    accumulationchart: [
      AccumulationLegend,
      PieSeries,
      AccumulationDataLabel,
      AccumulationTooltip
    ]
  },
  computed: {
    ...mapGetters([
      'getPaymentsList'
    ]),
  },
  methods: {
    convertDBtoChart() {
      const categories = this.getPaymentsList.map(el => el.category)
      const uniqueCategories = categories.filter((val, idx, self) => self.indexOf(val) === idx)
      this.data = uniqueCategories.map((el) => {
        return {
          x: el,
          y: this.getPaymentsList.filter(item => item.category === el)
              .reduce((acc, cur) => acc + cur.value, 0),
          r: (100 - Math.ceil(
              this.getPaymentsList.filter(item => item.category === el)
                  .reduce((acc, cur) => acc + cur.value, 0) *
              100 /
              this.getPaymentsList.reduce((acc, cur) => acc + cur.value, 0)
          )) + '%'
        }
      })
    }
  },
  created () {
   setTimeout(() => {
      this.convertDBtoChart()
    }, 2000)
  }
})
</script>

<style scoped>
</style> -->
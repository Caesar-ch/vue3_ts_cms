<template>
  <div>
    <ChEchart :option="option"></ChEchart>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import ChEchart from '@/base-ui/echarts'
export default defineComponent({
  components: {
    ChEchart
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const option = computed(() => {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ''
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: props.data[0]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '分别销量',
            data: props.data[1],
            type: 'line',
            areaStyle: {}
          }
        ]
      }
    })
    return {
      option
    }
  }
})
</script>

<style scoped></style>

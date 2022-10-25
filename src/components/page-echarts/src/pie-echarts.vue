<template>
  <div>
    <ChEchart :option="option"></ChEchart>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
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
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '分类数据',
            type: 'pie',
            radius: '50%',
            data: props.data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
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

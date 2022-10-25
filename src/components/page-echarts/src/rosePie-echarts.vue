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
          top: 'bottom'
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '面积模式',
            type: 'pie',
            radius: [10, 100],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: props.data
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

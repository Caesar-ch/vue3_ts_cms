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
    console.log(props.data);

    const option = computed(() => {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: props.data[0]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: props.data[1],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      };
    })

    return {
      option
    }
  }
})
</script>

<style scoped>

</style>

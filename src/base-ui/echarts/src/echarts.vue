<template>
  <div>
    <div ref="myEcharts" style="width: 100%; height: 300px"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watchEffect } from 'vue'
import * as Echarts from 'echarts'
import chinaMapData from './data/china.json'
// import { GeoJSONCompressed } from 'echarts/charts'
export default defineComponent({
  props: {
    option: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    Echarts.registerMap('china', chinaMapData as unknown as any)
    const myEcharts = ref<HTMLElement>()
    onMounted(() => {
      const myEchartsInstance = Echarts.init(myEcharts.value!)
      watchEffect(() => {
        myEchartsInstance.setOption(props.option)
      })
    })

    return {
      myEcharts
    }
  }
})
</script>

<style scoped></style>

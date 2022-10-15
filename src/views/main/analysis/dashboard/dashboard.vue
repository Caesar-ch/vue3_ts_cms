<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="7">
        <ChCard :tittle="'分类商品数量(饼图)'">
          <PieEcharts :data="categoryGoodsCount"></PieEcharts>
        </ChCard>
      </el-col>
      <el-col :span="10">
        <ChCard tittle="不同城市销量(中国地图)">
          <MapEcharts :mapData="addressGoodsSale"></MapEcharts>
        </ChCard>
      </el-col>
      <el-col :span="7">
        <ChCard :tittle="'分类商品数量(玫瑰图)'">
          <RoseEcharts :data="categoryGoodsCount"></RoseEcharts>
        </ChCard>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <ChCard tittle="分类商品的销量">
          <LineEcharts :data="categoryGoodsSale"></LineEcharts>
        </ChCard>
      </el-col>
      <el-col :span="12">
        <ChCard tittle="收藏">
          <BarEcharts :data="categoryGoodsFavor"></BarEcharts>
        </ChCard>

      </el-col>

    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from '@/store'

import ChCard from '@/base-ui/card'
import PieEcharts from '@/components/page-echarts'
import BarEcharts from '@/components/page-echarts/src/bar-echarts.vue'
import RoseEcharts from '@/components/page-echarts/src/rosePie-echarts.vue'
import LineEcharts from '@/components/page-echarts/src/line-echarts.vue'
import MapEcharts from '@/components/page-echarts/src/map-echarts.vue'
export default defineComponent({
  components: {
    ChCard,
    PieEcharts,
    BarEcharts,
    RoseEcharts,
    LineEcharts,
    MapEcharts
  },
  setup() {
    const store = useStore()
    store.dispatch('analysis/getCategoryGoodsCountAction')

    const categoryGoodsCount = computed(() => {
      const TEMP = store.state.analysis.categoryGoodsCount.map((item) => {
        return { value: item.goodsCount, name: item.name }
      })
      return [...TEMP]
    })
    const categoryGoodsFavor = computed(() => {
      const a1: string[] = []
      const a2: number[] = []
      store.state.analysis.categoryGoodsFavor.map((item) => {
        a1.push(item.name)
        a2.push(item.goodsFavor)
      })
      return [a1, a2]
    })
    const categoryGoodsSale = computed(() => {
      const xAxisValue: string[] = []
      const seriesData: number[] = []
      store.state.analysis.categoryGoodsSale.map((item) => {
        xAxisValue.push(item.name)
        seriesData.push(item.goodsCount)
      })
      return [xAxisValue, seriesData]
    })
    const addressGoodsSale = computed(() => {
      return store.state.analysis.addressGoodsSale.map((item) => {
        return { name: item.address, value: item.count }
      })
    })

    return {

      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
  }
})
</script>

<style scoped>

</style>

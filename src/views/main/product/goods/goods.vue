<template>
  <div>
    <PageContent :contentTableConfig="contentTableConfig" pageName="goods">
      <template #image="scope">
        <el-image style="width: 60px; height: 60px" :src="scope.row.imgUrl" :preview-src-list="[scope.row.imgUrl]" />
      </template>
      <template #newPrice="scope">
        {{ '￥' + scope.row.newPrice}}
      </template>
    </PageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageContent from '@/components/page-content'
import { contentTableConfig } from './config/contentTabelConfig'
export default defineComponent({
  components: {
    pageContent
  },
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped>

</style>

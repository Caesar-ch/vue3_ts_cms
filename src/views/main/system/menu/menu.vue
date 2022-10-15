<template>
  <div>
    <PageContent :contentTableConfig="contentTableConfig" pageName="menu">
      <template #icon="scope"> <i :class="scope.row.icon"></i></template>
    </PageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageContent from "@/components/page-content"
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

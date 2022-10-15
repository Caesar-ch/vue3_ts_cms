<template>
  <div class="list">
    <PageContent :contentTableConfig="contentTableConfig" pageName="story"></PageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageContent from '@/components/page-content'

import { contentTableConfig } from './config/contentConfig'
export default defineComponent({
  components: {
    PageContent
  },
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped>
.list {
  height: 100%;
}
</style>

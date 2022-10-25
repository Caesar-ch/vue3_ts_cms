<template>
  <div>
    <PageContent pageName="category" :contentTableConfig="contentTableConfig"></PageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageContent from '@/components/page-content';
import { contentTableConfig } from './config'

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

<template>
  <div>
    <el-breadcrumb separator="/">
      <template v-for=" item in breadCrumbs" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.url }">{{item.name}}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IBreadcrumb } from '../type';
export default defineComponent({
  props: {
    breadCrumbs: {
      type: Array as PropType<IBreadcrumb[]>,
      default: () => []
    }
  },
  setup() {


    return {}
  }
})
</script>

<style scoped>

</style>

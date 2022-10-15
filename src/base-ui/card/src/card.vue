<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <strong>{{tittle}} </strong>
        </div>
      </template>
      <div class="content">
        <slot></slot>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    tittle: {
      type: String,
      default: ''
    }
  },
  setup() {


    return {}
  }
})
</script>

<style scoped>

</style>

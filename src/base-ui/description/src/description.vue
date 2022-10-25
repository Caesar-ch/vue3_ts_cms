<template>
  <div class="descrition">
    <el-descriptions :title="tittle" :column="column" border>
      <template v-for="item in descriptionList" :key="item.name">
        <el-descriptions-item :label="item.name" label-align="left" align="center">
          <el-tag size="small">{{ item.description }}</el-tag>
        </el-descriptions-item>
      </template>
    </el-descriptions>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    tittle: {
      type: String,
      required: true
    },
    column: {
      type: Number,
      default: 2
    },
    descriptionList: {
      type: Array,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
.descrition {
  margin-bottom: 20px;
}
</style>

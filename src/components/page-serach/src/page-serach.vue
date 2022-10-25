<template>
  <div class="page-serach">
    <chform v-bind="searchFormConfig" v-model="formdata">
      <template #header>
        <h2>高级搜索</h2>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button @click="handleRestSearchData"><i class="el-icon-refresh"></i> 重置</el-button>
          <el-button type="primary" @click="handleQuerySelect">
            <i class="el-icon-search"></i> 搜索</el-button
          >
        </div>
      </template>
    </chform>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import chform from '@/base-ui/form'

export default defineComponent({
  components: {
    chform
  },
  props: {
    searchFormConfig: {
      type: Object,
      reuqired: true
    }
  },
  emits: ['handleResetClick', 'handleQueryClick'],
  setup(props, { emit }) {
    //双向绑定数据应该由配置文件的filed决定
    const formItems = props.searchFormConfig?.formItems ?? []
    const originFormData: any = {}
    for (const item of formItems) {
      originFormData[item.field] = ''
    }
    const formdata = ref(originFormData)
    //重置按钮
    const handleRestSearchData = () => {
      formdata.value = originFormData
      emit('handleResetClick')
    }
    //查询按钮
    const handleQuerySelect = () => {
      console.log(formdata.value)

      emit('handleQueryClick', formdata.value)
    }
    return {
      formdata,
      handleRestSearchData,
      handleQuerySelect
    }
  }
})
</script>

<style scoped>
.handle-btns {
  text-align: right;
  padding: 0 20px 0 0;
}
</style>

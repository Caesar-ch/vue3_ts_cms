<template>
  <div class="user">
    <Page-serach
      :searchFormConfig="searchFormConfig"
      @handleQueryClick="handleQueryClick"
      @handleResetClick="handleResetClick"
    ></Page-serach>
    <div class="content">
      <PageContent
        :contentTableConfig="contentTableConfig"
        pageName="users"
        ref="PageData"
        @handleEditClick="handleEditClick"
        @handleNewClick="handleNewClick"
      ></PageContent>
    </div>

    <Page-dialog
      pageName="users"
      ref="dialogRef"
      :dialogFormConfig="dialogFormConfigRef"
      :defaultInfo="defaultInfo"
    >
    </Page-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import PageSerach from '@/components/page-serach'
import PageContent from '@/components/page-content'
import PageDialog from '@/components/page-dialog'

import { searchFormConfig } from './config/searchFormConfig'
import { contentTableConfig } from './config/contentTabelConfig'
import { dialogFormConfig } from './config/dialogFormConfig'

import { usePageDialog } from '@/hook/use-page-dialog'
import { usePageSerach } from '@/hook/use-page-search'
export default defineComponent({
  components: {
    PageSerach,
    PageContent,
    PageDialog
  },
  setup() {
    //1.处理密码显隐的逻辑
    const editCallback = () => {
      const passwordItem = dialogFormConfig.formItems.find((item) => item.field === 'password')
      console.log(passwordItem)

      passwordItem!.isHidden = true
    }
    const newCallback = () => {
      const passwordItem = dialogFormConfig.formItems.find((item) => item.field === 'password')
      passwordItem!.isHidden = false
    }
    //2.动态添加部门和角色列表
    const store = useStore()
    const dialogFormConfigRef = computed(() => {
      const departmentItem = dialogFormConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      departmentItem!.options = store.state.entireDepartment.map((item: any) => {
        return { tittle: item.name, value: item.id }
      })
      const roleItem = dialogFormConfig.formItems.find((item) => item.field === 'roleId')
      roleItem!.options = store.state.entireRole.map((item: any) => {
        return { tittle: item.name, value: item.id }
      })
      return dialogFormConfig
    })
    //3.相关hook函数获取函数和变量
    const [handleQueryClick, handleResetClick, PageData] = usePageSerach()
    //顺序不能变
    const [dialogRef, defaultInfo, handleEditClick, handleNewClick] = usePageDialog(
      editCallback,
      newCallback
    )
    return {
      searchFormConfig,
      contentTableConfig,
      dialogFormConfig,
      handleResetClick,
      handleQueryClick,
      PageData,
      defaultInfo,
      handleEditClick,
      dialogRef,
      handleNewClick,
      dialogFormConfigRef
    }
  }
})
</script>

<style scoped>
.content {
  /* border-top: 20px solid #f0f2f6; */
  margin-top: 20px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: #ffffff;
}
</style>

<template>
  <div class="role">
    <SearchForm :searchFormConfig="searchFormConfig"></SearchForm>
    <div class="content">
      <PageContent
        :contentTableConfig="contentTableConfig"
        pageName="role"
        @handleNewClick="handleNewClick"
        @handleEditClick="handleEditClick"
      ></PageContent>
    </div>
    <PageDialog
      ref="dialogRef"
      :dialogFormConfig="dialogFormConfig"
      pageName="role"
      :othersInfo="othersInfo"
    >
      <el-tree
        ref="treeRef"
        :data="menuList"
        show-checkbox
        node-key="id"
        highlight-current
        :props="{ children: 'children', label: 'name' }"
        @check="handleCheckChange"
      />
    </PageDialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, nextTick } from 'vue'
import { useStore } from '@/store'
import { mapMenuToLeaf } from '@/utils/map-menu'

import { ElTree } from 'element-plus'
import pageContent from '@/components/page-content'
import SearchForm from '@/components/page-serach'
import PageDialog from '@/components/page-dialog'

import { contentTableConfig } from './config/contentTableConfig'
import { searchFormConfig } from './config/searchFormConfig'
import { dialogFormConfig } from './config/dialogFormConfig'

import { usePageDialog } from '@/hook/use-page-dialog'
export default defineComponent({
  components: {
    pageContent,
    SearchForm,
    PageDialog
  },
  setup() {
    //自己的特殊逻辑
    const treeRef = ref<InstanceType<typeof ElTree>>()
    const store = useStore()
    const menuList = computed(() => store.state.entirMenu)
    const othersInfo = ref({})
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      othersInfo.value = { menuList }
    }
    const editCallback = (value: any) => {
      console.log(value)
      const leafKeys = mapMenuToLeaf(value.menuList) //拿到数据的menuList，通过此方法拿到子结点的id
      console.log(treeRef.value)
      nextTick(() => {
        treeRef.value?.setCheckedKeys(leafKeys, false) //因为带你编辑的同时，这个组件才创建出来，这个任务如果和组件创建一起发生，极有可能拿到value时，组件还没创建出来，即拿到的value是未绑定的，则设置初始值失败
      })
    }
    //公共hook
    const [dialogRef, defaultInfo, handleEditClick, handleNewClick] = usePageDialog(
      editCallback,
      null
    )
    return {
      contentTableConfig,
      searchFormConfig,
      dialogFormConfig,
      handleNewClick,
      handleEditClick,
      dialogRef,
      defaultInfo,
      menuList,
      treeRef,
      handleCheckChange,
      othersInfo
    }
  }
})
</script>

<style scoped>
.content {
  border-top: 20px solid #f0f2f6;
  box-sizing: border-box;
  padding: 0 20px;
}
</style>

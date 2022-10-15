<template>
  <div class="page-content">
    <Chtable :tableData="tableData" v-bind="contentTableConfig" :table-column="contentTableConfig.tableColumn"
      @selectionChange="handleSelection" :dataCount="dataCount" v-model:page="pageData">
      <template #handler>
        <el-button v-if="isCreate" @click="handleNewClick" type="primary">新建用户</el-button>
      </template>
      <template #status="scope">
        <template v-if="scope.row.status">
          <el-button plain :type="scope.row.status?'success':'danger'"> {{scope.row.status ? '启用':'禁用'}}
          </el-button>
        </template>
        <template v-else>
          <el-button plain :type="scope.row.enable?'success':'danger'"> {{scope.row.enable ? '启用':'禁用'}}
          </el-button>
        </template>
      </template>
      <template #createAt="scope">
        {{$filters.formatTime(scope.row.createAt)}}
      </template>
      <template #updateAt="scope">
        {{$filters.formatTime(scope.row.updateAt)}}
      </template>
      <template #editFn="scope">
        <div class="btn-edit-delete">
          <el-button v-if="isDelete" size="small" type="primary" @click="handleDeleteClick(scope.row)" text bg> <i
              class="el-icon-delete"></i> 删除
          </el-button>
          <el-button v-if="isUpdate" size="small" type="primary" @click="handleEditClick(scope.row)" ext bg><i
              class="el-icon-edit"></i> 编辑</el-button>
        </div>
      </template>

      <template v-for="item in otherPropSlots" :key="item.prop" #[item.slotName]="scope">
        <slot :name="item.slotName" :row="scope.row">
        </slot>
      </template>
    </Chtable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import Chtable from '@/base-ui/tabel'
import { useStore } from '@/store'
import { computed } from '@vue/reactivity'
import { usePermission } from '@/hook/use-permission'
export default defineComponent({
  components: {
    Chtable
  },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  emit: ['handleEditClick', 'handleNewClick'],
  setup(props, { emit }) {
    const store = useStore()
    //按钮的权限获取
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')
    //分也器数据
    const pageData = ref({ pageSize: 10, currentPage: 1 })
    watch(pageData, () => { getPageData() })

    //发送数据，并保存在vuex里
    const getPageData = (queryInfos: any = {}) => {
      if (props.pageName != 'story') {
        if (!isQuery) return
      }
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageData.value.currentPage - 1) * pageData.value.pageSize,
          size: pageData.value.pageSize,
          ...queryInfos
        }
      })
    }
    getPageData()
    console.log('取数据');

    //从vuex里拿到数据
    const tableData = computed(() => {
      return store.getters['system/dataList'](props.pageName)
    })
    const dataCount = computed(() => {
      return store.getters['system/dataCount'](props.pageName)
    })
    console.log(tableData.value);

    //处理非公共的插槽，eg：image
    const otherPropSlots = props.contentTableConfig.tableColumn.filter((item: any) => {
      if (item.slotName === 'status') return false
      if (item.slotName === 'createAt') return false
      if (item.slotName === 'updateAt') return false
      if (item.slotName === 'editFn') return false
      return true
    })


    //处理选择按钮
    const handleSelection = function (value: any) {
      console.log(value);//拿到 数据在编辑删除时使用
    }
    //删除按钮
    const handleDeleteClick = (value: any) => {
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: value.id
      })
    }
    //编辑按钮
    const handleEditClick = (value: any) => {
      emit('handleEditClick', value)
    }
    //新建按钮
    const handleNewClick = () => {
      emit('handleNewClick')
    }
    return {
      tableData,
      handleSelection,
      getPageData,
      dataCount,
      pageData,
      otherPropSlots,
      isCreate, isUpdate, isDelete,
      handleDeleteClick,
      handleEditClick,
      handleNewClick
    }
  }
})
</script>

<style scoped>
.page-content {
  padding: 20px;
  /* height: 100%;  这个100%一加达不到效果，不加完美达到内容多大，就撑多大*/
  border-radius: 10px;
  background-color: #ffffff;


}

.btn-edit-delete {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
</style>

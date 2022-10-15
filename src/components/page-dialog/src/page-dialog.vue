<template>
  <div class="pageDialog">

    <el-dialog v-model="dialogVisible" title="新建用户" width="30%" center destroy-on-close>
      <template #default>
        <ChForm v-bind="dialogFormConfig" v-model="formData"></ChForm>
        <slot></slot>
      </template>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import ChForm from '@/base-ui/form'
import { useStore } from '@/store'
export default defineComponent({
  components: {
    ChForm
  },
  props: {
    pageName: {
      required: true
    },
    dialogFormConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    othersInfo: {
      type: Object,
      default: () => ({})
    }

  },
  setup(props) {
    const dialogVisible = ref(false)
    const formData = ref<any>({
    })
    watch(() => props.defaultInfo, (newValue) => {
      for (const item of props.dialogFormConfig.formItems) {
        formData.value[`${item.field}`] = newValue[`${item.field}`]
      }
    })
    const store = useStore()
    const handleConfirmClick = () => {
      dialogVisible.value = false
      if (Object.keys(props.defaultInfo).length) {
        //编辑
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.othersInfo },
          id: props.defaultInfo.id
        })
      } else {
        //新建
        dialogVisible.value = false
        store.dispatch('system/createNewDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.othersInfo },
        })
      }


    }
    return {
      dialogVisible,
      formData,
      handleConfirmClick
    }
  }
})
</script>

<style scoped>

</style>

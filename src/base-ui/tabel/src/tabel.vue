<template>
  <div class="chTabel">
    <div class="header">
      <slot name="header">
        <div class="tittle">
          <h2>{{ tittle }}</h2>
        </div>
        <div class="handler">
          <slot name="handler">
            <el-button type="primary">新建用户</el-button>
          </slot>
        </div>
      </slot>
    </div>

    <el-table
      :data="tableData"
      border
      style="width: 100%"
      @selection-change="handleSelect"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        min-width="30px"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        min-width="30px"
      ></el-table-column>
      <template v-for="item in tableColumn" :key="item.label">
        <el-table-column v-bind="item" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <div class="footer">
      <slot name="footer" v-if="showFooter">
        <el-pagination
          :currentPage="page.currentPage"
          :page-size="page.pageSize"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dataCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ItableColumn } from './type'
export default defineComponent({
  props: {
    page: {
      type: Object,
      default: () => ({ pageSize: 10, currentPage: 0 })
    },
    dataCount: {
      type: Number,
      default: 200
    },
    tittle: {
      type: String,
      default: 'tittle'
    },
    tableData: {
      type: Object,
      required: true
    },
    tableColumn: {
      type: Array as unknown as PropType<ItableColumn>,
      required: true
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    const handleSelect = function (value: object) {
      emit('selectionChange', value)
    }

    const handleSizeChange = (value: any) => {
      console.log(value)

      emit('update:page', { ...props.page, pageSize: value })
    }
    const handleCurrentChange = (value: any) => {
      emit('update:page', { ...props.page, currentPage: value })
    }
    return {
      handleSelect,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped lang="less">
.footer {
  margin: 5px 2px;
  // display: flex;
  // justify-content: end;
  text-align: center;
  border-top: 1px solid #cecaca;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .tittle {
    font-size: 14px;
  }

  .handler {
    align-items: center;
  }
}
</style>

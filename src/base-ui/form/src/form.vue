<template>
  <div class="chform">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind=" colLayout ">
            <el-form-item :label="item.label" :style="itemLayout" v-if="!item.isHidden">
              <template v-if="item.type === 'input'">
                <el-input :placeholder="item.placeholder" :model-value="modelValue[item.field]"
                  @update:modelValue="handleValueChange($event,item.field)"></el-input>
              </template>
              <template v-else-if="item.type === 'password'">
                <el-input :placeholder="item.placeholder" :model-value="modelValue[item.field]"
                  @update:modelValue="handleValueChange($event,item.field)"></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select :placeholder="item.placeholder" style="width:100%" :model-value="modelValue[item.field]"
                  @update:modelValue="handleValueChange($event,item.field)">
                  <el-option v-for="option in item.options" :value="option.value" :key="option.value">{{option.tittle}}
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker style="width: 100%" v-bind="item.otheroptions" :model-value="modelValue[item.field]"
                  @update:modelValue="handleValueChange($event,item.field)">
                </el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { Iformitem } from '../types/index'
export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<Iformitem[]>,
      default: () => []
    },
    itemLayout: {
      type: Object,
      default: () => ({ padding: '20px  10px' })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    },
    labelWidth: {
      type: String,
      default: '100px'
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // const formdata = ref({ ...props.modelValue })
    // watch(() => formdata, (newValue) => {
    //   emit('update:modelValue', newValue)
    // }, { deep: true })
    const handleValueChange = function (value: any, filed: any) {
      emit('update:modelValue', { ...props.modelValue, [filed]: value })
    }
    return {
      handleValueChange
    }
  }
})
</script>

<style scoped lang="less">
.chform {
  padding: 1px 20px;
  text-align: center;
  border-radius: 10px;
  background-color: #ffffff;

  .header {
    margin: 20px 5px;
  }
}
</style>

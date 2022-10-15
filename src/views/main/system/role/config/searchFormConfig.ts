import { Iform } from '@/base-ui/form/types'
export const searchFormConfig: Iform = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色名',
      placeholder: '请输入用户名'
    },
    {
      field: 'intro',
      type: 'input',
      label: '权限',
      placeholder: '请输入权限名'
    },
    {
      field: 'createTime',
      type: 'datepicker',
      label: '创建时间',
      otheroptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ],
  itemLayout: {
    padding: '10px  20px'
  },
  colLayout: {
    span: 8
  },
  labelWidth: '120px'
}

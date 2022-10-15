import { Iform } from '@/base-ui/form/types'
export const dialogFormConfig: Iform = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色名:',
      placeholder: '请输入角色名'
    },
    {
      field: 'intro',
      type: 'input',
      label: '角色介绍',
      placeholder: '请输入角色介绍'
    }
  ],
  itemLayout: {
    padding: '10px  0px'
  },
  colLayout: {
    span: 24
  },
  labelWidth: '80px'
}

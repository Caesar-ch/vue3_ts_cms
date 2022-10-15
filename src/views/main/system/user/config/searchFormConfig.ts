import { Iform } from '@/base-ui/form/types'
export const searchFormConfig: Iform = {
  formItems: [
    {
      field: 'id',
      type: 'input',
      label: 'id',
      placeholder: '请输入id'
    },
    {
      field: 'name',
      type: 'input',
      label: '用户',
      placeholder: '请输入用户名'
    },
    {
      field: 'password',
      type: 'password',
      label: '密码',
      placeholder: '请输入密码'
    },
    {
      field: 'sport',
      type: 'select',
      label: '兴趣爱好',
      placeholder: '请选择',
      options: [
        { tittle: '篮球', value: 'basketball' },
        { tittle: '足球', value: 'soccleball' }
      ]
    },
    {
      field: 'createAt',
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

type IFormType = 'input' | 'password' | 'select' | 'datepicker'

export interface Iformitem {
  field: string
  type: IFormType
  label: string
  placeholder?: any
  rules?: any[]
  options?: any
  otheroptions?: any
  isHidden?: boolean
}
export interface Iform {
  formItems: Iformitem[]
  itemLayout?: any
  colLayout?: any
  labelWidth?: string
}

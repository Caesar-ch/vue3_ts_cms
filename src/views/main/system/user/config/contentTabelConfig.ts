export const contentTableConfig = {
  tittle: '用户管理',
  tableColumn: [
    { prop: 'id', label: 'id', minWidth: '80' },
    { prop: 'name', label: '姓名', minWidth: '80' },
    { prop: 'realname', label: '真实姓名', minWidth: '80' },
    { prop: 'enable', label: '状态', minWidth: '90', slotName: 'status' },
    { prop: 'cellphone', label: '联系电话', minWidth: '90' },
    { prop: 'createAt', label: '创建时间', minWidth: '120', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', minWidth: '120', slotName: 'updateAt' },
    { label: '功能', minWidth: '120', slotName: 'editFn' }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}

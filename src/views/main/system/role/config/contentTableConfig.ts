export const contentTableConfig = {
  tittle: '角色管理',
  tableColumn: [
    { prop: 'name', label: '角色名称', minWidth: '80' },
    { prop: 'intro', label: '拥有权限', minWidth: '80' },
    { prop: 'createAt', label: '创建时间', minWidth: '120', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', minWidth: '120', slotName: 'updateAt' },
    { label: '功能', minWidth: '120', slotName: 'editFn' }
  ]
}

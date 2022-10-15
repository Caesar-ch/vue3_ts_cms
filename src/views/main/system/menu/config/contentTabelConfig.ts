export const contentTableConfig = {
  tittle: '菜单管理',
  tableColumn: [
    { prop: 'id', label: 'id', minWidth: '80' },
    { prop: 'name', label: '菜单名称', minWidth: '80' },
    { prop: 'type', label: '类型', minWidth: '80' },
    { prop: 'url', label: '菜单Url', minWidth: '90' },
    { prop: 'icon', label: '菜单Icon', minWidth: '90', slotName: 'icon' },
    { prop: 'permission', label: '按钮权限', minWidth: '120' },
    { prop: 'createAt', label: '创建时间', minWidth: '120', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', minWidth: '120', slotName: 'updateAt' },
    { label: '功能', minWidth: '120', slotName: 'editFn' }
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  childrenProps: {
    rowKey: 'id'
  },
  showFooter: false
}

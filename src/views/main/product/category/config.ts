export const contentTableConfig = {
  tittle: '分类管理',
  tableColumn: [
    { prop: 'id', label: 'id', minWidth: '80' },
    { prop: 'name', label: '类别', minWidth: '80' },
    { prop: 'createAt', label: '创建时间', minWidth: '120', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', minWidth: '120', slotName: 'updateAt' },
    { label: '功能', minWidth: '120', slotName: 'editFn' }
  ],
  showIndexColumn: true,
  showSelectColumn: true,
  showFooter: true
}

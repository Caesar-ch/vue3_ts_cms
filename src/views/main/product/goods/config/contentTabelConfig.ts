export const contentTableConfig = {
  tittle: '商品管理',
  tableColumn: [
    { prop: 'id', label: 'id', minWidth: '80' },
    { prop: 'name', label: '商品名称', minWidth: '80' },
    { prop: 'oldPrice', label: '原价格', minWidth: '80' },
    { prop: 'newPrice', label: '现价格', minWidth: '90', slotName: 'newPrice' },
    { prop: 'imgUrl', label: '商品图片', minWidth: '90', slotName: 'image' },
    { prop: 'status', label: '状态', minWidth: '90', slotName: 'status' },
    { prop: 'createAt', label: '创建时间', minWidth: '120', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', minWidth: '120', slotName: 'updateAt' },
    { label: '功能', minWidth: '120', slotName: 'editFn' }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}

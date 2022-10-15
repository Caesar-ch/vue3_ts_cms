export const contentTableConfig = {
  tittle: '故事列表',
  tableColumn: [
    { prop: 'id', label: '文章ID', minWidth: '80' },
    { prop: 'title', label: '文章标题', minWidth: '80' },
    { prop: 'content', label: '文章内容', minWidth: '400' },
    { prop: 'createAt', label: '创建时间', minWidth: '120', slotName: 'createAt' }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}

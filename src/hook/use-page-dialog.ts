import { ref } from 'vue'
import PageDialog from '@/components/page-dialog'
export function usePageDialog(editFn?: any, newFn?: any) {
  const dialogRef = ref<InstanceType<typeof PageDialog>>()
  const defaultInfo = ref<any>({})
  const handleEditClick = (value: any) => {
    dialogRef.value!.dialogVisible = true
    defaultInfo.value = { ...value }
    editFn && editFn(value)
  }
  const handleNewClick = () => {
    dialogRef.value!.dialogVisible = true
    defaultInfo.value = {}
    newFn && newFn()
  }
  return [dialogRef, defaultInfo, handleEditClick, handleNewClick]
}

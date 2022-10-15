import { ref } from 'vue'
import PageContent from '@/components/page-content'
export function usePageSerach() {
  const PageData = ref<InstanceType<typeof PageContent>>()
  const handleQueryClick = (value: any) => {
    PageData.value?.getPageData(value)
  }
  const handleResetClick = () => {
    PageData.value?.getPageData()
  }
  return [handleQueryClick, handleResetClick, PageData]
}

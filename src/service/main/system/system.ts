import { IDataType } from './../../login/type'
import chRequest from '@/service'
export function getPageListData(url: string, queryinfo: any) {
  return chRequest.post<IDataType>({ url: url, data: queryinfo })
}
export function editPageData(url: string, editData: any) {
  return chRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
export function createPageData(url: string, newData: any) {
  return chRequest.post<IDataType>({
    url: url,
    data: newData
  })
}
export function deletePageData(url: string) {
  return chRequest.delete<IDataType>({
    url: url
  })
}

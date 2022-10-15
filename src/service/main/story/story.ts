import chRequest from '@/service'
import type { IStoryType } from '@/service/type'
export function publishYouStory(data: IStoryType) {
  return chRequest.post({
    url: '/story',
    data
  })
}
export function getStoryList() {
  return chRequest.post({
    url: '/story/list'
  })
}

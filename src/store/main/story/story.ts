import { Module } from 'vuex'
import { IRootState } from '@/store/type'
import { IStoryType } from './type'
import { publishYouStory, getStoryList } from '@/service/main/story/story'
import { ElMessage } from 'element-plus'
import { h } from 'vue'
const StoryModule: Module<IStoryType, IRootState> = {
  namespaced: true,
  state() {
    return {
      storyList: []
    }
  },
  mutations: {
    changeStoryList(state, storyList: any) {
      state.storyList = storyList
    }
  },
  actions: {
    async publishYouStoryAction(payload: any) {
      try {
        await publishYouStory(payload)
      } catch (error) {
        ElMessage({
          message: h('p', null, [
            // h('span', null, 'Message can be '),
            h('i', { style: 'color: teal' }, '发布失败，再次试试!')
          ])
        })
      }
      ElMessage({
        message: h('p', null, [
          // h('span', null, 'Message can be '),
          h('i', { style: 'color: teal' }, '发布成功!')
        ])
      })
    },
    async getStoryListAction({ commit }) {
      const storyListResult = await getStoryList()
      console.log(storyListResult)
      commit('changeStoryList', storyListResult.data[0])
    }
  }
}
export default StoryModule

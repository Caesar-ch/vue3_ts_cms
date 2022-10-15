import { createStore, Store, useStore as useVueXstore } from 'vuex'
import login from './login/login'
import system from './main/system/system'
import analysis from './main/analysis/dashboard'
import story from './main/story/story'
import { IRootState, IStoreType } from './type'
import { getPageListData } from '@/service/main/system/system'
const store = createStore<IRootState>({
  state() {
    return {
      name: 'why',
      age: 18,
      entireDepartment: [],
      entireRole: [],
      entirMenu: []
    }
  },
  mutations: {
    changeEntirDepartment(state, departmentList) {
      state.entireDepartment = departmentList
    },
    changeEntirRole(state, roleList) {
      state.entireRole = roleList
    },
    changeEntirMenu(state, menuList) {
      state.entirMenu = menuList
    }
  },
  getters: {},
  actions: {
    async getInitialDataAction({ commit }) {
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data

      const menuListResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuListResult.data
      commit('changeEntirMenu', menuList)
      commit('changeEntirDepartment', departmentList)
      commit('changeEntirRole', roleList)
    }
  },
  modules: {
    login,
    system,
    analysis,
    story
  }
})
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  // store.dispatch('getInitialDataAction')
  //setup时就拿到整个角色和部门//当退出登陆重新登陆后，因为token这些都是异步请求，
  //所以可能这个请求和请求token的请求一起发送，如果请求token特别慢，这个请求在请
  //求拦截处发现token没有请求成功，则本次请求失败，且因为这个是在main的里执行的，
  //如果不刷新页面这个请求不会重新发送的；所以应当在token请求下来的时候去执行这个
  //请求，则可以在getPageDataList里和加载local的token时发送
}
export function useStore(): Store<IStoreType> {
  return useVueXstore()
}
export default store

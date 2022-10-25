import { Module } from 'vuex'
import { IRootState } from '@/store/type'
import { ISystemState } from './type'
import {
  getPageListData,
  editPageData,
  createPageData,
  deletePageData
} from '@/service/main/system/system'
const SystemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0,
      storyList: [],
      storyCount: 0,
      departmentList: [],
      departmentCount: 0,
      categoryList: [],
      categoryCount: 0
    }
  },
  mutations: {
    changeUsersList(state, userList) {
      state.usersList = userList
    },
    changeUsersCount(state, count) {
      state.usersCount = count
    },
    changeRoleList(state, roleList) {
      state.roleList = roleList
    },
    changeRoleCount(state, count) {
      state.roleCount = count
    },
    changeGoodsList(state, goodsList) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, count) {
      state.goodsCount = count
    },
    changeMenuList(state, menuList) {
      state.menuList = menuList
    },
    changeMenuCount(state, count) {
      state.menuCount = count
    },
    changeStoryList(state, storyList) {
      state.storyList = storyList
    },
    changeStoryCount(state, count) {
      state.storyCount = count
    },
    changeDepartmentList(state, departmentList) {
      state.departmentList = departmentList
    },
    changeDepartmentCount(state, count) {
      state.departmentCount = count
    },
    changeCategoryList(state, departmentList) {
      state.categoryList = departmentList
    },
    changeCategoryCount(state, count) {
      state.categoryCount = count
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      //1.获取pageUrl
      const pageName = payload.pageName
      //如果规范则能拼出来Url
      const pageUrl = `/${pageName}/list`
      // 如果不规范，则可以switch 或者 保存一个map 的映射，当拿到什么名字就去找到对应的地址去发送请求
      // switch (pageName) {
      //   case '/user':
      //     pageUrl = '/user/list'
      //     break
      //   case '/role':
      //     pageUrl = '/role/list'
      // }
      //已不知借口的查询字段，输入无关的字段会报错，所以过滤掉无关的字段，只拿有用字段
      let TEMP = payload.queryInfo
      payload.queryInfo = {
        id: TEMP.id,
        name: TEMP.name,
        offset: TEMP.offset,
        size: TEMP.size
        // createAt: TEMP.createAt
      }
      TEMP = {}
      //2.发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      const { list, totalCount } = pageResult.data
      console.log(pageResult.data)
      //3.保存数据
      const changePageName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
    },
    async editPageDataAction({ dispatch }, payload: any) {
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await editPageData(pageUrl, editData)
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    async createNewDataAction({ dispatch }, payload: any) {
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      await createPageData(pageUrl, newData)
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    async deletePageDataAction({ dispatch }, payload: any) {
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await deletePageData(pageUrl)
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  },
  getters: {
    dataList(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    dataCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  }
}

export default SystemModule

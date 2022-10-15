import { Module } from 'vuex'
import { IloginState } from './type'
import { IAccount } from '@/service/login/type'
import { IRootState } from '../type'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
import localCache from '@/utils/cache'
import router from '@/router'
import { mapMenusToRoutes, mapMenuToPermissions } from '@/utils/map-menu'
const loginModule: Module<IloginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permission: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      console.log(1)

      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
      //保存所有权限，在需要的地方进行这里搜索并返回布尔值控制按钮权限
      state.permission = mapMenuToPermissions(userMenus)
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      //1.实现登陆逻辑
      const loginResult = await accountLoginRequest(payload)
      console.log(loginResult)
      dispatch('getInitialDataAction', null, { root: true }) //请求完整的菜单用于用户创建时的options

      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)
      //2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      console.log(userInfoResult)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)
      //3.请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      console.log(userMenusResult)

      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)
      // //4.跳到首页
      router.push('/main')
    },
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      dispatch('getInitialDataAction', null, { root: true })
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule

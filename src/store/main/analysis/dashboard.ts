import { Module } from 'vuex'
import { IRootState } from './../../type'
import { IAnalysisState } from './type'
import {
  getCategoryGoodsCount,
  getCategoryGoodsFavor,
  getcategoryGoodsSale,
  getAddressGoodsSale
} from '@/service/main/analysis/dashboard'
const AnalysisModule: Module<IAnalysisState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsFavor: [],
      categoryGoodsSale: [],
      addressGoodsSale: []
    }
  },
  mutations: {
    changeCategoryGoodsCount(state, CategoryGoodsCount: any) {
      state.categoryGoodsCount = CategoryGoodsCount
    },
    changeCategoryGoodsFavor(state, CategoryGoodsFavor: any) {
      state.categoryGoodsFavor = CategoryGoodsFavor
    },
    changeCategoryGoodsSale(state, CategoryGoodsSale: any) {
      state.categoryGoodsSale = CategoryGoodsSale
    },
    changeAddressGoodsSale(state, AddressGoodsSale: any) {
      state.addressGoodsSale = AddressGoodsSale
    }
  },
  actions: {
    async getCategoryGoodsCountAction({ commit }) {
      const categoryGoodsCountR = await getCategoryGoodsCount()
      const categoryGoodsCount = categoryGoodsCountR.data
      commit('changeCategoryGoodsCount', categoryGoodsCount)
      const categoryGoodsFavor = await getCategoryGoodsFavor()
      commit('changeCategoryGoodsFavor', categoryGoodsFavor.data)
      const categoryGoodsSale = await getcategoryGoodsSale()
      commit('changeCategoryGoodsSale', categoryGoodsSale.data)
      const addressGoodsSale = await getAddressGoodsSale()
      commit('changeAddressGoodsSale', addressGoodsSale.data)
    }
  }
}
export default AnalysisModule

import chRequest from '@/service'

enum DashboardAPI {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale'
}
export function getCategoryGoodsCount() {
  return chRequest.get({
    url: DashboardAPI.categoryGoodsCount
  })
}
export function getCategoryGoodsFavor() {
  return chRequest.get({
    url: DashboardAPI.categoryGoodsFavor
  })
}
export function getcategoryGoodsSale() {
  return chRequest.get({
    url: DashboardAPI.categoryGoodsSale
  })
}
export function getAddressGoodsSale() {
  return chRequest.get({
    url: DashboardAPI.addressGoodsSale
  })
}

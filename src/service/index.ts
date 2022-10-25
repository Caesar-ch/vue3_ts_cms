import CHRequest from './request'
import { Base_URL, Time_Out } from './request/config'
import localCache from '@/utils/cache'
const chRequest = new CHRequest({
  baseURL: Base_URL,
  timeout: Time_Out,
  interceptors: {
    requestInterceptor: (config) => {
      //携带token
      const token = localCache.getCache('token')
      if (token) {
        // config.headers.Authorization = `Bearer ${token}`
        config.headers!.Authorization = `Bearer ${token}` //非空断言因为header为可选属性，可能为空，则可能没有属性Author，所以使用非空断言。为什么不使用可选链呢，因为可选链不能出现在赋值操作符的左侧::赋值表达式的左侧不能是可选属性访问。
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    // res => res.data  取出data数据，将来调用接口的时候直接拿到的就是后台的数据
    responseInterceptorCatch: (err) => {
      // 401 状态码，进入该函数
      if (err.response && err.response.status === 401) {
        // 1. 清空无效用户信息
        // 2. 跳转到登录页
        // 3. 跳转需要传参（当前路由地址）给登录页码
        // store.commit('user/setUser', {})
        // 当前路由地址
        // 组件里头：`/user?a=10` $route.path === /user  $route.fullPath === /user?a=10
        // js模块中：router.currentRoute.value.fullPath 就是当前路由地址，router.currentRoute 是ref响应式数据
        // const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
        // encodeURIComponent 转换uri编码，防止解析地址出问题
        // router.push('/login?redirectUrl=' + fullPath)//这里只要用于当支付时发现token过期需要保存当前的商品地址，当用户重新登陆后能跳转回来这个页面
      }
      return Promise.reject(err)
    }
  }
})
export default chRequest

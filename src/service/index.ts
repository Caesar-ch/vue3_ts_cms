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
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})
export default chRequest

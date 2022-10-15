import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { ChRequestConfig, ChRequestInterceptors } from './type'
import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading'
const Default_Loading = true
class CHRequest {
  instance: AxiosInstance
  interceptors?: ChRequestInterceptors
  showLoading: boolean
  loading?: LoadingInstance
  constructor(config: ChRequestConfig) {
    //创建axios实例
    this.instance = axios.create(config)

    //保存基本信息
    this.showLoading = config.showLoading ?? Default_Loading
    this.interceptors = config.interceptors

    //使用拦截器
    //1.从config中取出来的拦截器对应的实例的拦截器  //为使用者自定义的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor, //(config)=>return config
      this.interceptors?.requestInterceptorCatch // (err)=> return err
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor, //(res)=> return res.data
      this.interceptors?.responseInterceptorCatch // (err)=>return err
    )
    //2.添加所有的实例都有的拦截器   //可以设置多个请求或者响应拦截。每个拦截器都可以设置两个拦截函数，一个为成功拦截，一个为失败拦截
    this.instance.interceptors.request.use(
      //为共有的拦截器默认一定有的拦截器
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            background: 'rgba(0,0,0,0.5)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close()
        const data = res.data
        // if (data.returnCode === '-1001') {
        // console.log('请求失败，错误信息')
        // } else {
        return data
        // }
      },
      (err) => {
        this.loading?.close()
        if (err.response.status === 404) {
          console.log('404的错误')
        }
        return err
      }
    )
  } //     这个配置的T是对响应数据拦截时的类型限制和promise返回的值是同一个，所以类型一样
  request<T>(config: ChRequestConfig<T>): Promise<T> {
    //指定的配置将与实例的配置合并。
    //promise的T决定了resolve的值得类型，因为最终是将请求回来的res，resolve出去，所以传入的T决定了返回的res类型，同样也是Promise类型
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理  //就是在使用的时候油传过来独特的拦截器
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config) // ??
      }

      //2.判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      //3.使用axios实例发送请求
      this.instance
        .request<any, T>(config) //这里的config是一步一步传的，在创建axios.create(config)这个config传入的是基础的baseurl，timeout，
        .then((res) => {
          //1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          //2.将showLoading设置为true，这样不会影响下一个请求
          this.showLoading = Default_Loading

          //3.请求结果返回出去resolve
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = Default_Loading
          reject(err)
          return err
        })

      // }
    })
  }
  get<T = any>(config: ChRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T = any>(config: ChRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T = any>(config: ChRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: ChRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default CHRequest

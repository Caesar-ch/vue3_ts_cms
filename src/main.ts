import { createApp } from 'vue'
import App from './App.vue'
import { globalRegister } from './global/index'
// import 'element-plus/theme-chalk/base.css' //引入公共css
// import 'element-plus/lib/theme-chalk/base.css'
import 'element-plus/dist/index.css' //正确的引入
import 'element-plus/theme-chalk/el-message.css' //不引入ELMessage无法显示正确位置
// import 'element-plus/theme-chalk/el-button.css'; //引入公共css
// import 'normalize.css'
import '@csstools/normalize.css'
import '@/assets/css/index.less'
import store from './store'
import { setupStore } from './store'
import router from './router'
const app = createApp(App)
//引入部分样式
globalRegister(app) //app.use(对应函数)，这个函数会接收app作为参数，与函数（app）一样的效果
app.use(store)
setupStore() //先注册动态路由后use
app.use(router)
app.mount('#app')

//全局注册element-plus
// import ElementPlus from "element-plus"
// import "element-plus/lib/theme-check/index.css"
// app.use(ElementPlus)

//可用的接口
// import axios from 'axios'
// axios.defaults.baseURL = ' http://localhost:8080'
// axios.defaults.baseURL = '/api'
// axios
// .post('/api/register', {
//   account: '15580774982',
//   mobile: '15580774982',
//   code: 123456,
//   password: 1234567
// })
// .get('/register/code', {
// params: { mobile: 15580774982 }
// })
// .then((res) => {
//   console.log(res)

//   console.log(JSON.parse(res as unknown as string))
// })
// .catch((err) => {
//   console.log(err)
// })
// axios
//   .post('http://152.136.185.210:5000/login', {
//     name: 'coderwhy',
//     password: '123456'
//   })
//   .then((res) => {
//     console.log(res)
//   })
// import { AxiosRequestConfig } from 'axios'
// interface ccc extends AxiosRequestConfig {
//   a: string
// }
// const a1: ccc = {
//   a: '1'
// }
// const axiosinstance = axios.create(a1)
// axiosinstance
//   .post('http://152.136.185.210:5000/login', {
//     name: 'coderwhy',
//     password: '123456'
//   })
//   .then((res) => {
//     console.log('12312312312')

//     console.log(res)
//   })

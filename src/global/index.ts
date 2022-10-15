import { App } from 'vue' //引入app类型
import { registerApp } from './register-elementplus'
import { registerFormat } from './registerFormat'
export function globalRegister(app: App): void {
  registerApp(app)
  registerFormat(app)
}

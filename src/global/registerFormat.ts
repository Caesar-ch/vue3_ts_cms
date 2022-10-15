import { App } from 'vue'
import { formatUtcString } from '@/utils/utc-format'
export function registerFormat(app: App): void {
  app.config.globalProperties.$filters = {
    foo() {
      console.log('foo')
    },
    formatTime(utcString: string) {
      return formatUtcString(utcString)
    }
  }
}

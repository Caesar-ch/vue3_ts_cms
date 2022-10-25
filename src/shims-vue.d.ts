import { Module } from 'vuex'
/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare const App: App
declare module '*.json' {
  const value: any
  export default value
}

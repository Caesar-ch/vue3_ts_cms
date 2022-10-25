const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = defineConfig({
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
  // devServer: {
  // proxy: {
  //   '/api': {
  //     target: 'http://pcapi-xiaotuxian-front-devtest.itheima.net/',
  //     pathRewrite: {
  //       '^/api': ''
  //     },
  //     changeOrigin: true
  //   }
  // }
  // proxy: 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
  // }
  // devServer: {
  //   proxy: {
  //     '^/api': {
  //       target: 'http://152.136.185.210:4000',
  //       pathRewrite: {
  //         '^/api': ''
  //       },
  //       changeOrigin: true
  //     }
  //   }
  // }
  // transpileDependencies: true
})

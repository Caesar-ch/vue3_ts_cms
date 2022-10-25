<template>
  <div class="app">
    <elConfigProvider :locale="local">
      <router-view></router-view>
    </elConfigProvider>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    const local = zhCn
    return {
      local
    }
  }
})
</script>
<style lang="less" scoped>
.app {
  width: 100%;
  height: 100%;
}
</style>

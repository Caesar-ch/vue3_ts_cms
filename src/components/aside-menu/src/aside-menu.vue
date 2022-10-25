<template>
  <div class="aside">
    <h3>Base Management</h3>
    <el-menu :default-active="defaultValue" class="el-menu-vertical" :collapse="collapse">
      <template v-for="item in menuList" :key="item.id">
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <template v-if="item.children">
              <template v-for="items in item.children" :key="items.id">
                <el-menu-item :index="items.id + ''" @click="jumbRouter(items.url)">
                  <el-icon :class="item.icon"> </el-icon>
                  <span>{{ items.name }}</span>
                </el-menu-item>
              </template>
            </template>
          </el-sub-menu>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import router from '@/router'
import { pathMapToMenu } from '@/utils/map-menu'
import { useRoute } from 'vue-router'
export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  setup() {
    //store拿到数据去进行渲染
    const store = useStore()
    const menuList = computed(() => store.state.login.userMenus)

    // 0: {id: 38, name: '系统总览', type: 1, url: '/main/analysis', icon: 'el-icon-monitor', …}
    // 1: {id: 1, name: '系统管理', type: 1, url: '/main/system', icon: 'el-icon-setting', …}
    // 2: {id: 9, name: '商品中心', type: 1, url: '/main/product', icon: 'el-icon-goods', …}
    // 3: {id: 41, name: '随便聊聊', type: 1, url: '/main/story', icon: 'el-icon-chat-line-round', …}
    //route拿到当前路径去匹配响应的menuItem
    const route = useRoute()
    const currentPath = route.path
    const menu = pathMapToMenu(menuList.value, currentPath)
    const defaultValue = ref(menu.id + '')

    // 点击执行对象url属性的跳转
    const jumbRouter = (value: any) => {
      router.push({
        path: value ?? '/not-found'
      })
    }
    return {
      menuList,
      jumbRouter,
      defaultValue
    }
  }
})
</script>

<style scoped>
.tittle {
  width: 100%;
  height: 30px;
  border: 1px solid red;
}

h3 {
  text-align: left;
  padding: 0 0 0 18px;
  /* height: 48px;
  line-height: 48px; */
}

.el-menu {
  border-right: 0;
  width: 100%;
  height: calc(100% - 40px);
}

.el-menu-vertical {
  /* transition: width 0.3s linear; */
}
</style>

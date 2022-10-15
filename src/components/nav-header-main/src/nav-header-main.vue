<template>
  <div class="nav-header">
    <el-icon class="flod-menu" :class="flod?'el-icon-s-fold':'el-icon-s-unfold'" @click="handleFoldClick">
    </el-icon>
    <div class="content">
      <chbreadcrumb :breadCrumbs="breadcrumb"></chbreadcrumb>
      <div class="user-info">
        <el-avatar size="small"><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor"
              d="M288 320a224 224 0 1 0 448 0 224 224 0 1 0-448 0zm544 608H160a32 32 0 0 1-32-32v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 0 1-32 32z">
            </path>
          </svg></el-avatar>
        <user-info></user-info>
      </div>
    </div>

  </div>
</template>

<script lang="ts">

import { defineComponent, ref, computed } from 'vue'
import chbreadcrumb from '@/base-ui/breadcrumb/index'
import userInfo from './user-info.vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { pathMApBreadcrumbs } from '@/utils/map-menu'
export default defineComponent({
  components: {
    chbreadcrumb,
    userInfo
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const flod = ref(false)
    const handleFoldClick = () => {
      flod.value = !flod.value
      emit('foldChange', flod.value)
    }
    const store = useStore()

    const breadcrumb = computed(() => {
      const menuList = store.state.login.userMenus
      const route = useRoute()
      const currentPath = route.path
      return pathMApBreadcrumbs(menuList, currentPath)
    })


    return {
      flod,
      handleFoldClick,
      breadcrumb
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {

  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;


  .flod-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px 0 0;
  }

  .user-info {
    display: flex;
    align-items: center;
  }

}
</style>

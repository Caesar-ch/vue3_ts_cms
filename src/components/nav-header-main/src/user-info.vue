<template>
  <div>
    <el-dropdown>
      <span class="el-dropdown-link">
        dropdown list
        <!-- <i class="iconfont">&#xe882;</i> -->
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="el-icon-circle-close" @click="handleExitClick">退出登录</el-dropdown-item>
          <el-dropdown-item divided>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import localCache from '@/utils/cache'
import router from '@/router'
export default defineComponent({
  setup() {
    const handleExitClick = () => {
      localCache.deleateCache('token')
      router.push('/main')
    }
    return {
      handleExitClick
    }
  }
})
</script>

<style scoped>
.el-dropdown-item:hover {
  background-color: rgb(152, 152, 205);
}
</style>

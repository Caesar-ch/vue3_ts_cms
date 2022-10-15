<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside class="aside" :style="iscollapse?'width:60px':'width:210px'">
        <aside-Menu :collapse="iscollapse"></aside-Menu>
      </el-aside>
      <el-container class="page">
        <el-header class="nav-header">
          <navheader @foldChange="handleFoldChange"></navheader>
        </el-header>
        <el-main>

          <router-view v-slot="{Component}">
            <keep-alive include="chat">
              <component :is="Component"></component>
            </keep-alive>
          </router-view>

        </el-main>
      </el-container>
    </el-container>

    <!-- <div class="nav-header">
      <navheader @foldChange="handleFoldChange"></navheader>
    </div>
    <div class="aside" :style="iscollapse?'width:60px':'width:210px'">
      <aside-Menu :collapse="iscollapse"></aside-Menu>
    </div>
    <div class="page-content">
      <div class="pagebackground">
        <router-view></router-view>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { navheader } from '@/components/nav-header-main/index'
import { asideMenu } from '@/components/aside-menu'
export default defineComponent({
  components: {
    navheader,
    asideMenu
  },
  setup() {
    const iscollapse = ref(false)
    const handleFoldChange = (value: boolean) => {
      iscollapse.value = value
    }

    return {
      handleFoldChange,
      iscollapse
    }
  }
})
</script>

<style scoped lang="less">
.main {
  // width: 100%;
  // height: 100%;
  // display: flex;
  // flex-wrap: wrap;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .main-content,
  .page {
    height: 100%; //不加无法出现滚动条
    background-color: #eef0f3;
  }

  .nav-header {
    // height: 100px;
    width: 100%;
    height: 48px;
    // border-bottom: 3px solid #af9e9e;
    background-color: #ffffff;
  }

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    // width: 210px;
    // height: 100%;//根本不需要加100%，以后加100%慎用
    transition: width 0.3s linear;
    flex-shrink: 0;
    background-color: #ffffff;

    &::-webkit-scrollbar {
      display: none; //消失滚动条，当高度超过时
    }
  }

  // .page-content {
  //   flex: 1;
  //   height: 100%;
  //   // border: 1px solid red;
  //   background-color: #f0f2f6;
  //   transition: width 0.3s linear;

  //   .pagebackground {
  //     background-color: #ffffff87;
  //     // margin: 10px 5px;
  //     border-radius: 10px;
  //     height: 100%;
  //   }
  // }

  // .el-main {
  //   // height: 100%;
  // }
}
</style>

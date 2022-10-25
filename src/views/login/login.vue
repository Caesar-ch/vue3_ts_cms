<template>
  <div class="login">
    <span class="login-table">
      <h2>Welcome login</h2>
      <!-- <div class="data-table">
        <label for="account">用户名:</label>
        <input id="account" v-model="account.name">
      </div>
      <div class="data-table">
        <label for="password">密码:</label>
        <input type="password" id="password" v-model="account.password">
      </div> -->
      <el-form label-width="60px" :model="account" :rules="rules">
        <el-form-item label="账号" prop="name">
          <el-input v-model="account.name" maxlength="200px"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="account.password" show-password></el-input>
        </el-form-item>
      </el-form>
      <div class="save-password">
        <el-checkbox v-model="isKeepPassword" label="记住密码" size="large" />
      </div>
      <button class="account-login-btn" @click="handleLoginClick">登陆</button>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import localCache from '@/utils/cache'
import { rules } from './config/account-config'
export default defineComponent({
  setup() {
    //声明双向绑定的账户名和密码
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })
    const isKeepPassword = ref(true)
    //使用vuex的store
    const store = useStore()
    //定义好一个登陆函数，当登陆按钮触发时，触发login函数
    const loginAction = (isKeepPassword: boolean) => {
      //保存密码则保存到本地
      if (isKeepPassword) {
        localCache.setCache('name', account.name)
        localCache.setCache('password', account.password)
      } else {
        localCache.deleateCache('name')
        localCache.deleateCache('password')
      }
      //2.调用vuex的actions处理请求以及存储，以及后续的请求信息
      store.dispatch('login/accountLoginAction', { ...account })
    }
    //当点击时的触发函数
    const handleLoginClick = () => {
      loginAction(isKeepPassword.value)
    }

    return {
      account,
      handleLoginClick,
      isKeepPassword,
      rules
    }
  }
})
</script>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
  // position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .el-form {
    padding: 0 20px;
  }

  .login-table {
    display: block;
    width: 320px;
    height: 270px;
    // position: absolute;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    background-color: rgb(229, 236, 231);
    margin-bottom: 130px;

    h2 {
      text-align: center;
    }

    .data-table {
      padding: 20px 10px;
    }

    .save-password {
      padding: 0 80px;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      vertical-align: middle;
    }

    .account-login-btn {
      width: 100%;
      height: 50px;
      margin-top: 12px;
      padding: 0;
    }
  }
}
</style>

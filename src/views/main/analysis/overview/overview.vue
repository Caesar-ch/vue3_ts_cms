<template>
  <div class=" overview">
    <ChCard tittle="关于">
      <span>
        <b>VueTsCMS</b> 是基于<b>Vue3、Vuex、VueRouter、VueCLI、 ElementPlus 、TypeScript、Echart5 </b>等后台系统解决方案。
      </span>
    </ChCard>
    <ChCard tittle="技术栈">
      <ul class="technology-stacks">
        <li v-for="(item, index) in technologyConfig" :key="index">
          {{ item.title }}:<a href="javascript:;">{{ item.desp }}</a>
        </li>
      </ul>
      <ChDescription v-bind="dependenciesConfig"></ChDescription>
    </ChCard>

    <ChCard tittle="结构树">
      <pre>{{ treeConfig}}</pre>
    </ChCard>
    <ChCard tittle="项目规范">
      <ChDescription v-bind="filenameStandard"></ChDescription>
      <ChDescription v-bind="commitStandard"></ChDescription>
      <ChDescription v-bind="componentStandard"></ChDescription>
    </ChCard>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ChDescription from '@/base-ui/description'
import ChCard from '@/base-ui/card'
import dependenciesConfig from './config/dependencies'
import treeConfig from './config/projectTree'
import technologyConfig from './config/technologyStacks'
import { filenameStandard, commitStandard, componentStandard } from './config/projectStandard'
export default defineComponent({
  components: {
    ChDescription,
    ChCard
  },
  setup() {


    return {
      dependenciesConfig,
      treeConfig,
      technologyConfig,
      filenameStandard, commitStandard, componentStandard
    }
  }
})
</script>

<style scoped lang="less">
.technology-stacks {
  margin-bottom: 30px;

  li {
    font-weight: 600;
    font-size: 16px;
    line-height: 30px;

    a {
      margin-left: 20px;
      font-weight: 500;
      text-decoration: none;
      color: #409eff;
    }
  }
}

pre {
  font-size: 16px;
  font-weight: 500;
  background: #dee1e6;
}
</style>

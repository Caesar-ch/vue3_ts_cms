<template>
  <div class="chat">
    <div class="tittle">
      <el-input placeholder="请输入..." v-model="tittle"></el-input>
      <el-button @click="handlePublish">发布</el-button>
    </div>
    <ChBytemd ref="ChByTemdRef"></ChBytemd>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, h } from 'vue'
import ChBytemd from '@/base-ui/bytemd/src/bytemd.vue'
import { useStore } from '@/store'
export default defineComponent({
  name: 'chat',
  components: {
    ChBytemd
  },
  setup() {
    const ChByTemdRef = ref<InstanceType<typeof ChBytemd>>()
    const tittle = ref('')
    const store = useStore()
    // store.dispatch('story/getStoryListAction')
    const handlePublish = () => {
      store.dispatch('story/publishYouStoryAction', {
        tittle: tittle,
        content: ChByTemdRef.value?.value
      })
    }
    return {
      ChByTemdRef,
      tittle,
      handlePublish
    }
  }
})
</script>

<style scoped lang="less">
.chat {
  height: 100%;

  .tittle {
    display: flex;
  }
}
</style>

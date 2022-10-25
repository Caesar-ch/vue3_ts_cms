<template>
  <div class="chbytemd">
    <Editor
      class="editos"
      :value="value"
      :locale="zhHans"
      @change="handleChange"
      :plugins="plugins"
      previewDebounce="0"
      :placeholder="'书写...'"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// import { Editor, Viewer } from '@bytemd/vue-next'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import 'bytemd/dist/index.css'
import zhHans from 'bytemd/locales/zh_Hans.json'
const plugins = [gfm(), highlight()]
export default defineComponent({
  components: {
    Editor: require('@bytemd/vue-next').Editor
  },
  setup() {
    let value = ref('')
    const handleChange = (v: any) => {
      value.value = v
    }
    return {
      value,
      zhHans,
      handleChange,
      plugins
    }
  }
})
</script>

<style scoped lang="less">
.chbytemd {
  height: 100%;

  .editos {
    margin-top: 10px;
    height: 100%;
  }
}
</style>

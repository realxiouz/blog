<template>
  <quill-editor
    :content="value"
    ref="myQuillEditor"
    :options="editorOption"
    @change="onEditorChange"
  />
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  data() {
    return {
      editorOption: {}
    }
  },
  props: {
    value: {
      type: String,
    }
  },
  methods: {
    onEditorChange({ quill, html, text }) {
      this.$emit('input', html)
    }
  },
  components: {
    quillEditor
  }
}
</script>

<style lang="scss">
.ql-container{
  min-height: 420px
}
</style>

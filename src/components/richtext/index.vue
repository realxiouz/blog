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
    var toolbarOptions = [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ 'header': 1 }, { 'header': 2 }],
          // [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          // [{ 'script': 'sub'}, { 'script': 'super' }],
          // [{ 'indent': '-1'}, { 'indent': '+1' }],
          [{ 'direction': 'rtl' }],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'font': [] }],
          [{ 'align': [] }],
          ['clean']
        ]
    return {
      editorOption: {
        placeholder: '请输入文章...',
        modules: {
          toolbar: toolbarOptions
        }
      }
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

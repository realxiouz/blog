<template>
  <div>
    <!-- 图片上传组件辅助-->
    <el-upload
      id="quill-upload"
      class='avatar-uploader'
      :action='serverUrl'
      :data='header'
      :show-file-list='false'
      :on-success='uploadSuccess'
      :on-error='uploadError'
      :before-upload='beforeUpload'>
    </el-upload>
    <!-- <Upload
      action="http://upload-z2.qiniup.com"
      :data="header"
      :show-upload-list='false'
      :on-success='uploadSuccess'
      :on-error='uploadError'
      :before-upload='beforeUpload'
      ref="upload"
    ></Upload> -->
    <!--富文本编辑器组件-->
    <el-row v-loading='quillUpdateImg'>
      <quill-editor
        ref='myQuillEditor'
        :options='editorOption'
        :content="value"
        @change='onEditorChange($event)'>
      </quill-editor>
    </el-row>
  </div>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
// import { quillEditor, Quill } from 'vue-quill-editor'
// import ImageResize from 'quill-image-resize-module'
// const ImageResize = require('quill-image-resize-module')
// Quill.register('modules/imageResize', ImageResize)
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ indent: '-1' }, { indent: '+1' }],
  // [{ direction: 'rtl' }],

  // [{ size: ['small', false, 'large', 'huge'] }],
  // [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }],
  // [{ font: [] }],
  [{ align: [] }],
  ['link', 'image', 'video'],
  ['clean']
]
export default {
  data() {
    return {
      quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
      serverUrl: 'http://upload-z2.qiniup.com', // 这里写你要上传的图片服务器地址
      header: { token: sessionStorage.token }, // 有的图片服务器要求请求头需要有token之类的参数，写在这里
      detailContent: '', // 富文本内容
      editorOption: {
        placeholder: '',
        theme: 'snow', // or 'bubble'
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: (value) => {
                if (value) {
                  this.type = 'image'
                  document.querySelector('#quill-upload input').click()
                }
              },
              video: (value) => {
                if (value) {
                  this.type = 'video'
                  document.querySelector('#quill-upload input').click()
                }
              }
            }
          },
          // imageResize: {
          //   displayStyles: {
          //     backgroundColor: 'black',
          //     border: 'none',
          //     color: 'white'
          //   },
          //   modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
          // }
        }
      },
      type: 'image'
    }
  },
  methods: {
    // 上传图片前
    beforeUpload(res, file) {
      this.quillUpdateImg = true
    },
    // 上传图片成功
    uploadSuccess(res, file) {
      let quill = this.$refs.myQuillEditor.quill
      // 如果上传成功
      console.log(res)
      if (res.key) {
        // 获取光标所在位置
        let length = quill.getSelection().index
        // 插入图片  res.info为服务器返回的图片地址
        quill.insertEmbed(length, this.type, 'http://pjpw0xspe.bkt.clouddn.com/' + res.key)
        // 调整光标到最后
        quill.setSelection(length + 1)
      } else {
        this.$message.error('图片插入失败')
      }
      // loading动画消失
      this.quillUpdateImg = false
    },
    // 上传图片失败
    uploadError(res, file) {},
    onEditorChange({ quill, html, text }) {
      this.$emit('input', html)
    }
  },
  components: {
    quillEditor
  }
}
</script>

<template>
  <div>
    <Form
      inline
      :model="form"
      ref="form"
      :rules='rules'>
      <FormItem prop='title'>
        <Input v-model="form.title">
          <Select slot='prepend' v-model="form.type" style="width:60px">
            <Option :value="1">原创</Option>
            <Option :value="0">转载</Option>
          </Select>
        </Input>
      </FormItem>
      <FormItem prop='tag'>
        <Input v-model="form.tag" placeholder="请输入标签"/>
      </FormItem>
      <FormItem prop='category'>
        <Select v-model="form.category" placeholder='选择类型' style='width: 100px'>
          <Option :value="i.val" v-for="(i, inx) in categories" :key="inx">{{i.name}}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Select v-model="form.markdown" placeholder='选择类型' :disabled='isEdit' style='width: 100px'>
          <Option :value="1">Markdown</Option>
          <Option :value="0">富文本</Option>
        </Select>
      </FormItem>
      <FormItem v-if="form.markdown === 1">
        <Checkbox v-model="preSee">预览</Checkbox>
      </FormItem>
      <FormItem style="display: block" prop='body'>
        <mark-down v-if="form.markdown === 1" v-model="form.body" :pre-see="preSee"/>
        <!-- <rich-text v-else v-model="form.body"/> -->
        <rich-text v-else v-model="form.body"/>
      </FormItem>
      <FormItem>
        <Button @click="handleSubmit" type='primary'>submit</Button>
        <Button @click="$router.go(-1)" type='info'>back</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import MarkDown from '@/components/markdown'
import RichText from '@/components/richtext/richtext'
import { newPost, getPostById, editPost } from '@/utils/api'
export default {
  created() {
    this.isEdit = !!this.$route.params.id
  },
  mounted() {
    if (this.isEdit) {
      getPostById({id: this.$route.params.id})
        .then(res => {
          const {body, category, tag, title, type, markdown} = res.data
          this.form = {body, category, tag, title, type, markdown}
        })
    }
  },
  data() {
    return {
      form: {
        type: 1,
        title: '',
        tag: '',
        category: '',
        markdown: 1,
        body: ''
      },
      categories: [{name: 'js', val: '0'}, {name: 'css', val: '1'}, {name: 'test', val: '2'}],
      preSee: true,
      rules: {
        title: [
          { required: true, message: '填写文章标题', trigger: 'blur' },
          { min: 5, max: 20, message: '字数限定5-20字' }
        ],
        tag: [
          { required: true, message: '填写文章标签', trigger: 'blur' },
          { min: 2, max: 8, message: '字数限定2-8字' }
        ],
        category: [
          { required: true, message: '选择文章类型', trigger: 'blur', type: 'string' }
        ],
        body: [
          { required: true, message: '填写文章正文', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    MarkDown, RichText
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate()
        .then(res => {
          if (res) {
            if (this.isEdit) {
              editPost(Object.assign({}, this.form, {id: this.$route.params.id}))
                .then(res => {
                  this.$Message.info('编辑成功')
                  this.$router.go(-1)
                })
            } else {
              newPost(this.form)
                .then(res => {
                  this.$Message.info('发布成功')
                  this.$router.go(-1)
                })
            }
          } else {
            this.$Message.error('表单数据不完整,请完善表单')
          }
        })
    }
  }
}
</script>

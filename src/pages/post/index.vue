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
      <!-- <FormItem prop='tag'>
        <Input v-model="form.tag" placeholder="请输入标签"/>
      </FormItem> -->
      <FormItem prop='tag_ids'>
        <el-cascader
          :options="tags"
          v-model="form.tag_ids"
          :props="{label: 'name', value: 'id'}"
          :change-on-select="true"
          placeholder="选择标签"
          size="small"
          clearable
        />
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
import { newPost, getPostById, editPost, getTags } from '@/utils/api'
export default {
  created() {
    this.isEdit = !!this.$route.params.id
  },
  mounted() {
    getTags().then(r => {
      this.tags = r.data
    })
    if (this.isEdit) {
      getPostById(this.$route.params.id)
        .then(res => {
          const {body, tag, title, markdown, tag_ids} = res.data
          this.form = {body, tag, title, markdown, tag_ids: JSON.parse(tag_ids)}
        })
    }
  },
  data() {
    return {
      form: {
        type: 1,
        title: '',
        tag_ids: [],
        markdown: 1,
        body: ''
      },
      preSee: true,
      rules: {
        // title: [
        //   { required: true, message: '填写文章标题', trigger: 'blur' },
        //   { min: 5, max: 20, message: '字数限定5-20字' }
        // ],
        // tag_id: [
        //   { required: true, message: '选择文章标签', trigger: 'blur' }
        // ],
        // // category: [
        // //   { required: true, message: '选择文章类型', trigger: 'blur', type: 'string' }
        // // ],
        // body: [
        //   { required: true, message: '填写文章正文', trigger: 'blur' }
        // ]
      },

      selTag: [],
      tags: []
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

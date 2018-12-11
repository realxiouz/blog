<template>
  <div>
    <Form inline :model="form" ref="form">
      <FormItem :rules="{require: true, trigger: 'blur', message: '请输入文章标题'}" prop='title'>
        <Input v-model="form.title">
          <Select slot='prepend' v-model="form.type" style="width:60px">
            <Option :value="1">原创</Option>
            <Option :value="0">转载</Option>
          </Select>
        </Input>
      </FormItem>
      <FormItem required :rules="[{require: true, trigger: 'blur', message: '请输入文章标题'}]" prop='tag'>
        <Input v-model="form.tag" placeholder="请输入标签">
        </Input>
      </FormItem>
      <FormItem required>
        <Select v-model="form.category" placeholder='选择类型'>
          <Option :value="i.val" v-for="(i, inx) in categories" :key="inx">{{i.name}}</Option>
        </Select>
      </FormItem>
      <FormItem required>
        <Select v-model="form.markdown" placeholder='选择类型' :disabled='isEdit'>
          <Option :value="1">Markdown</Option>
          <Option :value="0">富文本</Option>
        </Select>
      </FormItem>
      <FormItem v-if="form.markdown === 1">
        <Checkbox v-model="preSee">预览</Checkbox>
      </FormItem>
      <mark-down v-if="form.markdown === 1" v-model="form.body" :pre-see="preSee"/>
      <FormItem>
        <Button @click="handleSubmit" type='primary'>submit</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import MarkDown from '@/components/markdown'
// eslint-disable-next-line
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
      categories: [{name: 'js', val: 0}, {name: 'css', val: 1}],
      preSee: true
    }
  },
  components: {
    MarkDown
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate()
        .then(res => {
          console.log(res)
          // if (res) {
          //   if (this.isEdit) {
          //     editPost(Object.assign({}, this.form, {id: this.$route.params.id}))
          //       .then(res => {
          //         this.$Message.info('编辑成功')
          //         this.$router.go(-1)
          //       })
          //   } else {
          //     newPost(this.form)
          //       .then(res => {
          //         this.$Message.info('发布成功')
          //         this.$router.go(-1)
          //       })
          //   }
          // }
        })
    }
  },
  watch: {
    'form.body': function(val) {
    }
  }
}
</script>

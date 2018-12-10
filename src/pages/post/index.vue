<template>
  <div>
    <Form inline>
      <FormItem >
        <Input v-model="form.title">
          <Select slot='prepend' v-model="form.type" style="width:80px">
            <Option :value="1">原创</Option>
            <Option :value="0">转载</Option>
          </Select>
        </Input>
      </FormItem>
      <FormItem>
        <Input v-model="form.tag" placeholder="请输入标签">
        </Input>
      </FormItem>
      <FormItem>
        <Select v-model="form.category" placeholder='选择类型'>
          <Option :value="i.val" v-for="(i, inx) in categories" :key="inx">{{i.name}}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Select v-model="form.markdown" placeholder='选择类型'>
          <Option :value="1">Markdown</Option>
          <Option :value="0">富文本</Option>
        </Select>
      </FormItem>
      <FormItem v-if="form.markdown === 1">
        <Checkbox v-model="preSee">预览</Checkbox>
      </FormItem>
      <mark-down v-model="form.body" :pre-see="preSee"></mark-down>
      <FormItem>
        <Button @click="handleSubmit">submit</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import MarkDown from '@/components/markdown'
import { newPost, getPostById } from '@/utils/api'
export default {
  mounted() {
    if (this.$route.params.id) {
      this.$Message.info('edit-mode')
      getPostById({id: this.$route.params.id})
        .then(res => {
          const {body, category, markdown, tag, title, type} = res.data
          this.form = {body, category, markdown, tag, title, type}
        })
    } else {
      this.$Message.info('new-mode')
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
      console.log(this.form)
      newPost(this.form)
        .then(res => {})
        .catch(_ => {})
    }
  },
  watch: {
    'form.body': function(val) {
    }
  }
}
</script>

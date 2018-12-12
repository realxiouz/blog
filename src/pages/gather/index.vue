<template>
  <div>
    <Form
      inline
      :model="form"
      ref="form"
      :rules='rules'>
      <FormItem prop='title'>
        <Input v-model="form.title" placeholder="输入标题"/>
      </FormItem>
      <FormItem prop='tag'>
        <Input v-model="form.tag" placeholder="请输入标签"/>
      </FormItem>
      <FormItem style="display: block" prop='detail'>
        <rich-text v-model="form.detail"/>
      </FormItem>
      <FormItem>
        <Button @click="handleSubmit" type='primary'>submit</Button>
        <Button @click="$router.go(-1)" type='info'>back</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import RichText from '@/components/richtext'
import { newGather, getGatherById, editGather } from '@/utils/api'
export default {
  created() {
    this.isEdit = !!this.$route.params.id
  },
  mounted() {
    if (this.isEdit) {
      getGatherById({id: this.$route.params.id})
        .then(res => {
          const {detail, tag, title} = res.data
          this.form = {detail, tag, title}
        })
    }
  },
  data() {
    return {
      form: {
        title: '',
        tag: '',
        detail: ''
      },
      rules: {
        title: [
          { required: true, message: '填写文章标题', trigger: 'blur' },
          { min: 5, max: 20, message: '字数限定5-20字' }
        ],
        tag: [
          { required: true, message: '填写文章标签', trigger: 'blur' },
          { min: 2, max: 8, message: '字数限定2-8字' }
        ],
        detail: [
          { required: true, message: '填写文章正文', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    RichText
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate()
        .then(res => {
          if (res) {
            if (this.isEdit) {
              editGather(Object.assign({}, this.form, {id: this.$route.params.id}))
                .then(res => {
                  this.$Message.info('编辑成功')
                  this.$router.go(-1)
                })
            } else {
              newGather(this.form)
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

<template>
  <Row :gutter="20">
    <Col :sm='24' :md='this.preSee ? 13 : 24'>
      <div class="markdown">
        <Input
          placeholder="编写文章,markdown语法"
          type='textarea'
          :value="value"
          @on-change="handleChange"
          :autosize="{ minRows: 20}"
        />
      </div>
    </Col>
    <Col :sm='24' :md='this.preSee ? 11 : 0'>
      <div v-html="contentHtml"></div>
    </Col>
  </Row>
</template>
<script>
import marked from 'marked'
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    preSee: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      content: '',
      contentHtml: ''
    }
  },
  mounted() {
    this.marked = marked
    this.content = this.value
    this.contentHtml = marked(this.content)
    console.log(this.contentHtml)
  },
  methods: {
    handleChange(e) {
      this.content = e.target.value
      this.contentHtml = marked(this.content)
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.markdown{

}
</style>

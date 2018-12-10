<template>
  <Row :gutter="20">
    <Col :sm='24' :md='this.preSee ? 13 : 24'>
      <div class="markdown">
        <Input type='textarea' :value="value" @on-change="handleChange"/>
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
    this.content = this.value
    this.marked = marked
  },
  methods: {
    handleChange(e) {
      this.content = e.target.value
      console.log(this.content)
      this.$emit('input', e.target.value)
    }
  },
  watch: {
    content(val) {
      this.contentHtml = this.marked(val)
    }
  }

}
</script>

<style lang="scss" scoped>
.markdown{

}
</style>

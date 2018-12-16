<template>
  <div>qn</div>
</template>

<script>
import { qn } from '@/utils/api'
import qs from 'qs'
export default {
  mounted() {
    this.getTableData()
  },
  data() {
    return {
      data: []
    }
  },
  methods: {
    getTableData() {
      // const obj = {bucket: 'blog'}
      qn({url: `/list?bucket=blog`}).then(res => {
      })
    }
  }
}
</script>

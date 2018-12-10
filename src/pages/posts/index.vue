<template>
  <div>
    <Table :columns="columns" :data="data" :loading='loading'></Table>
    <Page
      :total="total"
      :page-size='2'
      show-total
      show-elevator
      @on-change='handleChangePage'
    />
  </div>
</template>

<script>
import { getPost } from '@/utils/api'
export default {
  created() {
    this.getTableData()
  },
  data() {
    return {
      data: [],
      total: 0,
      loading: false,
      columns: [
        {title: 'ID', key: 'id'},
        {title: '标题', key: 'title'},
        {title: '标签', key: 'tag'},
      ]
    }
  },
  methods: {
    getTableData(page = 1) {
      this.loading = true
      getPost({limit: 2, page})
        .then(res => {
          this.loading = false
          this.data = res.data.rows
          this.total = res.data.count
        })
        .catch(_ => (this.loading = false))
    },
    handleChangePage(page) {
      this.getTableData(page)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

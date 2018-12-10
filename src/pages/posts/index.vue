<template>
  <div>
    <Table
      :columns="columns"
      :data="data"
      :loading='loading'
      border
    />
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
import { getPost, delPost } from '@/utils/api'
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
        {
          title: '操作',
          key: 'action',
          width: 150,
          render: (h, params) => (
            h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.detail(params.row.id)
                  }
                }
              }, 'Edit'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.delPost(params.row.id)
                  }
                }
              }, 'Delete')
            ])
          )
        }
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
    },
    delPost(id) {
      delPost({id})
        .then(res => {
          this.data = this.data.filter(i => id !== i.id)
        })
    },
    detail(id) {
      this.$router.push({path: `/admin/post/${id}`})
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

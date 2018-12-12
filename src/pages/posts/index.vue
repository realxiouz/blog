<template>
  <div>
    <Button
      style="margin-bottom:10px;"
      type="primary"
      @click="$router.push({path: '/admin/post'})"
    >New</Button>
    <Table
      :columns="columns"
      :data="data"
      :loading='loading'
      border
    />
    <Page
      style="margin-top:10px"
      :total="total"
      :page-size='10'
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
          title: '类型',
          width: 120,
          render: (h, params) => (
            h('Tag', {props: {color: params.row.markdown === 1 ? 'green' : 'orange'}}, params.row.markdown === 1 ? 'Markdown' : '富文本')
          )
        },
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
                  type: params.row.status === 1 ? 'error' : 'success',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.delPost(params.row)
                  }
                }
              }, params.row.status === 1 ? 'close' : 'open')
            ])
          )
        }
      ]
    }
  },
  methods: {
    getTableData(page = 1) {
      this.loading = true
      getPost({limit: 10, page})
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
    delPost(i) {
      delPost({id: i.id, status: i.status})
        .then(res => {
          i.status === 0 ? i.status = 1 : i.status = 0
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

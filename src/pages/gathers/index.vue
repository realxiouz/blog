<template>
  <div>
    <Button
      style="margin-bottom:10px;"
      type="primary"
      @click="$router.push({path: '/admin/gather'})"
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
      :page-size='pageSize'
      show-total
      show-elevator
      @on-change='handleChangePage'
    />
  </div>
</template>

<script>
import { getGather, delGather } from '@/utils/api'
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
        {title: 'ID', key: 'id', width: 60},
        {title: '标题', key: 'title', width: 200},
        {title: '标签', key: 'tag', width: 100},
        {
          title: '内容',
          render: (h, params) => (
            h('div', {props: {vText: params.row.body}}, '')
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
                  type: params.row.deleted_at ? 'success' : 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.delGather(params.row)
                  }
                }
              }, params.row.deleted_at ? 'open' : 'close')
            ])
          )
        }
      ],
      pageSize: 3,
    }
  },
  methods: {
    getTableData(page = 1) {
      this.loading = true
      getGather({pageSize: this.pageSize, page})
        .then(res => {
          this.loading = false
          this.data = res.data.data
          this.total = res.data.total
        })
        .catch(_ => (this.loading = false))
    },
    handleChangePage(page) {
      this.getTableData(page)
    },
    delGather(i) {
      delGather(i.id)
        .then(res => {
          i.deleted_at ? i.deleted_at = null : i.deleted_at = 1
        })
    },
    detail(id) {
      this.$router.push({path: `/admin/gather/${id}`})
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

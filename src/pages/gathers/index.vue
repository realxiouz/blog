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
      :page-size='10'
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
            h('div', {props: {vText: params.row.detail}}, '')
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
                    this.delGather(params.row)
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
      getGather({limit: 10, page})
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
    delGather(i) {
      delGather({id: i.id, status: i.status})
        .then(res => {
          i.status === 0 ? i.status = 1 : i.status = 0
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

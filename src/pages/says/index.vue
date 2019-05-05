<template>
  <div>
    <Button
      style="margin-bottom:10px;"
      type="primary"
      @click="$router.push({path: '/admin/say'})"
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
import { getSay } from '@/utils/api'
export default {
  mounted() {
    this.getTableData()
  },
  data() {
    return {
      data: [],
      loading: false,
      columns: [
          {title: '内容', key: 'content'},
          {title: '图片', key: 'img', width: 140, render: (h, params) => (
            params.row.img ? h('div', [
              h('img', {
                attrs: {
                  src: `http://localhost:8000${params.row.img}`
                },
                style: {
                  width: '100px',
                  height:'100px'
                }
              })
            ]) : h('Tag','没有图片')
          )},
          {title: '时间', key: 'created_at', width: 100},
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
                      this.delSay(params.row)
                    }
                  }
                }, params.row.deleted_at ? 'open' : 'close')
              ])
            )
          }
        ],
      total: 0,
      pageSize: 3,
    }
  },
  methods: {
    getTableData(page = 1) {
      this.loading = true
      getSay({pageSize: this.pageSize, page})
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
    detail(id) {
      this.$router.push({path: `/admin/say/${id}`})
    },
    delSay(i) {

    }
  },
}
</script>

<template>
  <div>
    <Table
      :columns="columns"
      :data="data"
      :loading='loading'
      border
    />
    <!-- <Page
      style="margin-top:10px"
      :total="total"
      :page-size='10'
      show-total
      show-elevator
      @on-change='handleChangePage'
    /> -->
  </div>
</template>

<script>
import { qn } from '@/utils/api'
export default {
  mounted() {
    this.getTableData()
  },
  data() {
    return {
      data: [],
      columns: [
        {title: '上传时间', key: 'putTime'},
        {title: '文件类型', key: 'mimeType'},
        {title: '文件大小', key: 'fsize'},
        {
          title: '图片',
          width: 120,
          render: (h, params) => (
            h('img', {attrs: {src: `http://pjpw0xspe.bkt.clouddn.com/${params.row.key}`}, style: {width: '100%', height: '60px'}}, '')
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
                // on: {
                //   click: () => {
                //     this.detail(params.row.id)
                //   }
                // }
              }, 'Edit'),
              h('Button', {
                props: {
                  type: params.row.status === 1 ? 'error' : 'success',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                // on: {
                //   click: () => {
                //     this.delPost(params.row)
                //   }
                // }
              }, params.row.status === 1 ? 'close' : 'open')
            ])
          )
        }
      ],
      loading: false,
      total: 0
    }
  },
  methods: {
    getTableData() {
      this.loading = true
      qn({url: `/list?bucket=blog`}).then(res => {
        this.loading = false
        this.data = res.data.items
        this.total = this.data.length
      }).catch(_ => (this.loading = false))
    }
  }
}
</script>

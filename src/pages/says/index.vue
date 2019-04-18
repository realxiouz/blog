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
      :page-size='10'
      show-total
      show-elevator
      @on-change='handleChangePage'
    />
  </div>
</template>

<script>
// import { qn } from '@/utils/api'
export default {
  mounted() {

  },
  data: _ => ({
    data: [],
    loading: false,
    columns: [],
    total: 0,
  }),
}
</script>

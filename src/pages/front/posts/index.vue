<template>
  <div>
    <div v-for="(i, inx) in items" :key="inx" class="post-item">
      <h2 class="title">{{inx}} </h2>
    </div>
  </div>
</template>

<script>
import {getPostsFront} from '@/utils/api-front'
export default {
  created() {
    this.getData()
  },
  data: _ => ({
    items: [],
    page: 1,
  }),
  methods: {
    getData() {
      getPostsFront().then(r => {
        console.log(r)
        this.items = this.items.push(...r.data.rows)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.post-item{
  padding: 20px;
  border-bottom: 1px solid #f0f2f7;
  .title{
    font-size: 18px;
    font-weight: 600;
    line-height: 1.6;
    color: #1a1a1a;
    margin-top: -4px;
    margin-bottom: -4px;
  }
}
</style>

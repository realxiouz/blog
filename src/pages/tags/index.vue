<template>
  <div>
    <Tree :data="items"/>
  </div>
</template>

<script>
import {getTags} from '@/utils/api'
export default {
  mounted() {
    getTags().then(r => {
      console.log(r)
      this.items = r.data
    }).catch(e => {})
  },
  data: _ => ({
    items: []
  })
}
</script>

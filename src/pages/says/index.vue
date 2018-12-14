<template>
  <Button
    style="margin-bottom:10px;"
    type="primary"
    @click="$router.push({path: '/admin/say'})"
  >New</Button>
</template>

<script>
import { test } from '@/utils/api'
export default {
  mounted() {
    test().then(res => {})
  }
}
</script>

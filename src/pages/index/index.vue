<template>
  <div @click="handleGit">index</div>
</template>

<script>
// import axios from 'axios'
export default {
  methods: {
    handleGit() {
      const C_ID = '14e0e049eb3fd4e101bb'
      // axios(`https://github.com/login/oauth/authorize?client_id=${C_ID}&state=${Math.random()}`)
      //   .then(r => {
      //     console.log(r)
      //   }).catch(e => {
      //     console.log(e)
      //   })
      window.open(
        `https://github.com/login/oauth/authorize?client_id=${C_ID}&state=${Math.random()}`,
        '_blank'
      )
    }
  },
  watch: {
    'window.chin': function(val) {
      console.log('hehhe ')
      alert('呵呵')
    }
  }
}
</script>

<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    window.Echo.channel('login').listen('LoginEvent', e => {
      this.$Notice.info({
          title: e.title,
          desc: e.desc,
          duration: 0
      })
    })
  }
}
</script>

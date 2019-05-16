<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    window.Echo.channel('test-echo').listen('TestEvent', e => {
      this.$Notice.info({
          title: e.title,
          desc: `${new Date(e.time)}`,
          duration: 0
      })
    })

    window.Echo.channel('auth').listen('LoginEvent', e => {
      this.$Notice.info({
          title: e.title,
          desc: e.desc,
          duration: 0
      })
    })
  }
}
</script>

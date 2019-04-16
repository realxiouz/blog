<template>
  <div>
    <nav-bar class="nav-bar"/>
    <div class="main-content">
      <div class="main-wrap">
        <div class="main"><router-view /></div>
        <div class="aside"></div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/nav'
export default {
  components: {
    NavBar
  }
}
</script>

<style lang="scss" scoped>
.nav-bar{
  position: fixed;
  z-index: 2;
}
.main-content{
  width: 1000px;
  margin: 0 auto;
  padding-top: 52px;
  .main-wrap{
    margin-top: 10px;
    display: flex;
  }
  .main{
    box-shadow: 0 1px 3px rgba(26,26,26,.1);
    width: 694px;
    margin-right: 10px;
    background: #fff;
  }
  .aside{
    flex: 1;
    height: 100vh;
  }
}
</style>

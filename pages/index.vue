<template>
  <div class="container">
    <div class="main">
      <div class="content"></div>
      <div class="additional"></div>
    </div>
    <User />
  </div>
</template>

<script>
import User from '@/components/User.vue'

export default {
  components: {
    User
  }
}
</script>

<style lang="less" scoped>
.container{
  width: 100%;
  height: 100vh;
  background-image: url(/home-bg.jpg);
  background-position: center center;
  background-repeat: no-repeat;
  background-color: #3c454c;
}
.main{
  display: flex;
  height: 100%;
}
.content{
  flex: 1;
  // background-color: green;
}
.additional{
  width: 240px;
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow:0px 0 10px 0 rgba(255, 255, 255, 0.3);
  // background-color: red;
}
</style>
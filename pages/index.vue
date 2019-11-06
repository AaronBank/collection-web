<!--
 * @Author: Aaron
 * @Date: 2019-11-06 16:36:13
 * @LastEditors: Aaron
 * @LastEditTime: 2019-11-06 22:03:58
 * @Description: file content
 -->
<template>
  <div class="container">
    <div class="main">
      <div class="nav">
        <el-input
          v-model="search"
          placeholder="请输入关键词并回车"
          prefix-icon="el-icon-search"
        />
      </div>
      <el-scrollbar>
        <div class="content">
          <Clip/>
          <Add/>
        </div>
      </el-scrollbar>
    </div>
    <User />
  </div>
</template>

<script>
import User from '@/components/User.vue'
import Clip from '@/components/Clip.vue'
import Add from '@/components/Add.vue'

export default {
  components: {
    User,
    Clip,
    Add
  },
  data() {
    return {
      search: ''
    }
  }
}
</script>

<style lang="less">
.nav{
  .el-input__inner{
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.2);
    color: #fff;
  }
}
</style>
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
  flex-direction: column;
}
.nav{
  display: flex;
  justify-content: center;
  margin: 10px;
  .el-input{
    width: 400px;
  }
}
.content{
  width: 100%;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  padding: 0 70px;
}
</style>

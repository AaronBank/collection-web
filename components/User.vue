<!--
 * @Author: Aaron
 * @Date: 2019-11-05 14:55:41
 * @LastEditors: Aaron
 * @LastEditTime: 2019-11-05 19:12:12
 * @Description: file content
 -->
<template>
  <el-dialog :visible.sync="dialogVisible" width="30%" center>
    <div slot="title" class="container">
      <img class="icon" src="/icon.png" alt="图标" />
      <el-button type="text" :disabled="isLogin" @click="toggle"
        >登 陆</el-button
      >
      <el-divider direction="vertical"></el-divider>
      <el-button type="text" :disabled="!isLogin" @click="toggle">注 册</el-button>
    </div>
    <el-form v-if="isLogin" :model="form">
      <el-form-item>
        <el-input
          v-model="form.username"
          prefix-icon="el-icon-user"
          autocomplete="off"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="form.password"
          type="password"
          prefix-icon="el-icon-unlock"
          autocomplete="off"
          placeholder="请输入密码"
        />
      </el-form-item>
    </el-form>
    <el-form v-else :model="form">
      <el-form-item>
        <el-input
          v-model="form.username"
          prefix-icon="el-icon-user"
          autocomplete="off"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="form.password"
          type="password"
          prefix-icon="el-icon-unlock"
          autocomplete="off"
          placeholder="请输入密码"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="form.password"
          type="password"
          prefix-icon="el-icon-unlock"
          autocomplete="off"
          placeholder="再次输入密码"
        />
      </el-form-item>
    </el-form>
    <el-button v-if="isLogin" size="mini" type="text" class="forgot-password">忘记密码？</el-button>
    <span class="dialog-footer">
      <el-button v-if="isLogin" round type="primary" @click="dialogVisible = false">登 陆</el-button>
      <el-button v-else round type="primary" @click="dialogVisible = false">注 册</el-button>
    </span>
    <span class="other">
      其他登陆方式：
      <el-tooltip class="item" effect="dark" content="微信" placement="top">
        <em class="iconfont icon-weixin"></em>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="QQ" placement="top">
        <em class="iconfont icon-qq"></em>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="微博" placement="top">
        <em class="iconfont icon-weibo"></em>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="GitHub" placement="top">
        <em class="iconfont icon-github2"></em>
      </el-tooltip>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: true,
      formLabelWidth: '120px',
      isLogin: true,
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    toggle() {
      this.isLogin = !this.isLogin
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;

  .el-button {
    font-size: 16px;
  }

  .forgot-password {
    font-size: 12px;
  }
}
.icon {
  width: 32px;
  height: 32px;
  margin-right: 20px;
}
.dialog-footer {
  display: flex;
  margin: 10px 0 20px;
  .el-button {
    flex: 1
  }
}
.other {
  color: #000000;
}

</style>

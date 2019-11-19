<template>
  <el-dialog :visible.sync="visible" width="460px" center @closed="closed">
    <div slot="title" class="container">
      <img class="icon" src="/icon.png" alt="图标" />
      <el-button type="text" :disabled="isLogin" @click="toggle">登 陆</el-button>
      <el-divider direction="vertical"/>
      <el-button type="text" :disabled="!isLogin" @click="toggle">注 册</el-button>
    </div>
    <el-form ref="form" :model="form" :rules="rules" :validate-on-rule-change="false">
      <el-form-item prop="username">
        <el-input
          :key="isLogin ? 'login':'aaa'"
          v-model="form.username"
          prefix-icon="el-icon-user"
          autocomplete="off"
          placeholder="请输入账号（邮箱）"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          :key="isLogin ? 'login':'aaa'"
          v-model="form.password"
          type="password"
          prefix-icon="el-icon-unlock"
          autocomplete="off"
          placeholder="请输入密码"
        />
      </el-form-item>
      <div v-if="!isLogin">
        <el-form-item prop="againPassword">
          <el-input
            v-model="form.againPassword"
            type="password"
            prefix-icon="el-icon-unlock"
            autocomplete="off"
            placeholder="再次输入密码"
          />
        </el-form-item>
        <el-form-item prop="name">
          <el-input
            v-model="form.name"
            prefix-icon="el-icon-sugar"
            autocomplete="off"
            placeholder="请输入昵称"
          />
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="form.code"
            prefix-icon="el-icon-key"
            autocomplete="off"
            placeholder="请输入邮箱验证码"
          >
            <el-button slot="append" type="primary">获取验证码</el-button>
          </el-input>
        </el-form-item>
      </div>
    </el-form>
    <el-button v-if="isLogin" size="mini" type="text" class="forgot-password">忘记密码？</el-button>
    <span class="dialog-footer">
      <el-button v-if="isLogin" round type="primary" :disabled="isNoLogin" @click="showCaptcha('login')">登 陆</el-button>
      <el-button v-else round type="primary" :disabled="isNoRegister" @click="showCaptcha('register')">注 册</el-button>
    </span>
    <span v-if="isLogin" class="other">
      其他登陆方式：
      <el-tooltip class="item" effect="dark" content="微信" placement="top">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-weixin2"></use>
        </svg>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="QQ" placement="top">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-qq"></use>
        </svg>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="微博" placement="top">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-weibo"></use>
        </svg>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="GitHub" placement="top">
        <svg class="icon" aria-hidden="true" @click="github">
          <use xlink:href="#icon-github2"></use>
        </svg>
      </el-tooltip>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: true,
      formLabelWidth: '120px',
      isLogin: true,
      type: '',
      form: this.initForm()
    }
  },
  computed: {
    // 表单验证规则
    rules() {
      const validatePass = (rule, value, callback) => {
        if (value === '') return callback(new Error('请再次输入密码'))
        if (value !== this.form.password) return callback(new Error('两次密码输入不一致'))
        callback()
      }
      const rules = {
        username: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,  message: '请输入正确的邮箱格式', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/, message: '密码包含数字,英文,字符中的两种以上，长度6-20', trigger: 'blur' }
        ]
      }

      if (!this.isLogin) {
        rules.againPassword = [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ]
        rules.name = [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 3, max: 10, message: '昵称长度在 3 到 10 个字符', trigger: 'blur' }
        ]
        rules.code = [
          { required: true, message: '请输邮箱验证码', trigger: 'blur' },
          { min: 6, message: '验证码不正确', trigger: 'blur' }
        ]
      }

      return rules
    },
    // 登陆按钮激活状态
    isNoLogin() {
      return !(this.form.username && this.form.password)
    },
    // 注册按钮激活状态
    isNoRegister() {
      const { username, againPassword, password, code, name } = this.form
      return !(username && againPassword && password && code && name)
    }
  },
  mounted() {
    // 初始化腾讯验证
    const TencentCaptcha = window.TencentCaptcha
    this.instance = new TencentCaptcha('2057344292', res =>
      this.slidingCaptcha(res)
    )
  },
  methods: {
    // 初始化表单数据
    initForm() {
      return {
        username: '',
        password: '',
        againPassword: '',
        code: '',
        name: ''
      }
    },
    // 打开弹框
    open() {
      this.visible = true
    },
    // 关闭弹框
    close() {
      this.visible = false
    },
    // 关闭弹框后清理数据
    closed() {
      this.isLogin = true
      this.$refs.form.resetFields()
    },
    // 切换登陆与注册板块
    toggle() {
      this.isLogin = !this.isLogin
      this.$refs.form.resetFields()
    },
    slidingCaptcha(res) {
      if (res.ret !== 0) return false
      const params = {
        ticket: res.ticket,
        randstr: res.randstr
      }

      this.type === 'register'
      ? this.register({ ...params, ...this.form })
      : this.login({ ...params, username: this.form.username, password: this.form.password })
    },
    showCaptcha(type) {
      this.$refs.form.validate(valid => {
        if (!valid) return

        this.type = type
        this.instance.show()
      })
    },
    async login(params) {
      await this.$axios.get('/users/login')
      this.$message.success('登陆成功')
    },
    async register(params) {
      await this.$axios.post('/users/register', params)
      this.$message.success('注册成功')
    },
    github() {
      const clientId = 'd91167bb6099a92af885'
      const authorizeUri = 'https://github.com/login/oauth/authorize'
      const redirectUri = 'http://localhost:9090/users/github'

      window.location.href = `${authorizeUri}?client_id=${clientId}&redirect_uri=${redirectUri}`;
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

  .el-button--text{
    color: #C0C4CC;
  }

  .el-button.is-disabled{
    color: rgb(33, 91, 150);
    cursor: default;
  }

  .forgot-password {
    font-size: 12px;
    color: rgb(29, 22, 129);
  }


}
.icon {
  width: 24px;
  height: 24px;
  margin-right: 20px;
  cursor: pointer;
  outline: none;
}
.dialog-footer {
  display: flex;
  margin: 10px 0 20px;
  .el-button {
    flex: 1
  }

  .el-button.is-disabled{
    background: #C0C4CC;
    color: #666;
    cursor: default;
    border-color: #C0C4CC;
  }
}
.other {
  display: flex;
  align-items: center;
  color: #000000;
  padding-top: 22px;
}
</style>

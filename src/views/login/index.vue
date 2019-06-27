<template>
    <div class="login-wrap">
      <div class="form-wrap">
        <div class="form-head">
            <img src="./logo_index.png" alt="黑马头条号">
        </div>
        <el-form
        class="form-content"
        ref="form"
        :model="form"
        :rules="rules">
  <el-form-item  prop="mobile">
    <el-input v-model="form.mobile" placeholder="手机号"></el-input>
  </el-form-item>
  <el-form-item  prop="code">
    <el-col :span="14">
     <el-input v-model="form.code" placeholder="验证码"></el-input>
    </el-col>
        <el-col :offset="2" :span="8">
          <el-button @click="handleSendCode"
          :disabled="!!codeTimer"
          >{{ codeTimer ? `剩余${codeTimeSeconds}秒` : '获取验证码' }}</el-button>
        </el-col>
  </el-form-item>
  <el-form-item prop="agree">
   <el-checkbox class="agree-checkbox" v-model="form.agree"></el-checkbox>
   <span class="agree-text">我已阅读并同意<a href="#">用户协议</a>和 <a href="#">隐私条款</a></span>
  </el-form-item>
  <el-form-item>
    <el-button class="btn-login" type="primary" @click="handleLogin">登录</el-button>
  </el-form-item>
</el-form>
</div>
    </div>
</template>
<script>
import '@/vendor/gt'
import { saveUser } from '@/utils/auth'
const initCodeTimeSeconds = 60
export default {
  name: 'AppLogin',
  data () {
    return {
      form: {
        mobile: '',
        code: '',
        agree: ''
      },
      rules: {
        mobile: [
          { required: true, message: '请输入正确的手机号', trigger: 'blur' },
          { len: 11, message: '长度必须为11位', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入正确的验证码', trigger: 'blur' },
          { len: 6, message: '长度必须为6位', trigger: 'blur' }
        ],
        agree: [
          { required: true, message: '请选择用户协议' },
          { pattern: /true/, message: '请选择用户协议' }
        ]
      },
      codeTimer: null,
      codeTimeSeconds: initCodeTimeSeconds
    }
  },
  methods: {
    handleLogin () {
      this.$refs['form'].validate(valid => {
        if (!valid) {
          return
        }
        this.submitLogin()
      })
    },
    async handleSendCode () {
      const { mobile } = this.form
      const res = await this.$http({
        method: 'GET',
        url: `/captchas/${mobile}`
      })
        const { data } = res.data
        window.initGeetest({
          gt: data.gt,
          challenge: data.challenge,
          offline: !data.success,
          new_captcha: data.new_captcha,
          product: 'bind'
        }, captchaObj => {
          captchaObj.onReady(() => {
            captchaObj.verify()
          }).onSuccess(() => {
            const {
              geetest_challenge: challenge,
              geetest_seccode: seccode,
              geetest_validate: validate } =
              captchaObj.getValidate()
            axios({
              method: 'GET',
              url: `/sms/codes/${mobile}`,
              params: {
                challenge,
                validate,
                seccode
              }
            }).then(res => {
              this.codeCountDown()
            })
          }).onError(function () {
          })
        })
    },
    async submitLogin () {
      try {
      const res = await this.$http({
        method: 'POST',
        // url: 'http://toutiao.course.itcast.cn/mp/v1_0/authorizations',
        url: '/authorizations',
        data: this.form
      })
      const userInfo = res.data.data
          // window.localStorage.setItem('user_info', JSON.stringify(userInfo))
          saveUser(userInfo)
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          this.$router.push({
            name: 'home'
          })
      } catch (err) {
          this.$message.error('手机号或验证码错误!')
      }
    },
    codeCountDown () {
      this.codeTimer = window.setInterval(() => {
        this.codeTimeSeconds--
        if (this.codeTimeSeconds <= 0) {
          window.clearInterval(this.codeTimer)
          this.codeTimeSeconds = initCodeTimeSeconds
          this.codeTimer = null
        }
      }, 1000)
    }
  }
}
</script>
<style lang="less" scoped>
  .login-wrap {
      height: 100%;
      background-color:#3772AF;
      display:flex;
      justify-content:center;
      align-items:center;
      .form-head {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        img {
          width: 200px;
        }
      }
  }
        .form-wrap {
            width: 400px;
            height: 300px;
            background-color: #fff;
            padding:30px;
            border-radius: 10px;
            .btn-login {
              width: 100%;
            }
        }
</style>
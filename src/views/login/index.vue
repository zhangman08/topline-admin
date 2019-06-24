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
          <el-button @click="handleSendCode">获取验证码</el-button>
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
import axios from 'axios'
import '@/vendor/gt'
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
           { required: true, message:'请选择用户协议' },
           { pattern: /true/, message:'请选择用户协议' }
        ]
      }
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
    handleSendCode () {
      const { mobile } = this.form
      axios({
        method: 'GET',
        url: `http://ttapi.research.itcast.cn/mp/v1_0/captchas/${mobile}`
      }).then(res => {
        const { data } = res.data
        window.initGeetest({
          gt: data.gt,
          challenge: data.challenge,
          offline: !data.success,
          new_captcha: data.new_captcha,
          product: 'bind'
        }, function (captchaObj) {
          captchaObj.onReady(function () {
            captchaObj.verify()
          }).onSuccess(function () {
            const {
              geetest_challenge: challenge,
              geetest_seccode: seccode,
              geetest_validate: validate } =
              captchaObj.getValidate()
            axios({
              method: 'GET',
              url: `http://ttapi.research.itcast.cn/mp/v1_0/sms/codes/${mobile}`,
              params: {
                challenge,
                validate,
                seccode
              }
            }).then(res => {

            })
          }).onError(function () {
          })
        })
      })
    },
    submitLogin () {
      axios({
        method: 'POST',
        url: 'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
        data: this.form
      })
        .then(res => {
          console.log(res.data)
          this.$message({
            message: '登录成功',
            type: 'success'
          })
        })
        .catch((e) => {
          this.$message.error('手机号或验证码错误!')
        })
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
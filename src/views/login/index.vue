<template>
    <div class="login-wrap">
      <div class="form-wrap">
        <div class="form-head">
            <img src="./logo_index.png" alt="黑马头条号">
        </div>
        <el-form class="form-content" ref="form" :model="form">
  <el-form-item>
    <el-input v-model="form.mobile" placeholder="手机号"></el-input>
  </el-form-item>
  <el-form-item>
    <el-col :span="14">
     <el-input v-model="form.code" placeholder="验证码"></el-input>
    </el-col>
        <el-col :offset="2" :span="8">
          <el-button @click="handleSendCode">获取验证码</el-button>
        </el-col>
  </el-form-item>
  <el-form-item>
    <el-button class="btn-login" type="primary" @click="onSubmit">登录</el-button>
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
        code: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
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
            console.log(captchaObj.getValidate())
          }).onError(function () {
          })
        })
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
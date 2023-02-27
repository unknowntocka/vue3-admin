<script lang="ts" setup>
import { reactive, ref, watchEffect } from 'vue'
import { FormInstance, FormRules } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { Info } from '@icon-park/vue-next'


const userStore = useUserStore()

const formState = reactive({
  username: '',
  password: '',
  isAgreeProtocal: false
})

const pageState: { isDialogShow: boolean, redirect?: string } = reactive({
  isDialogShow: false,
  redirect: undefined
})

const route = useRoute()
const router = useRouter()

watchEffect(() => {
  const { redirect } = route.query
  pageState.redirect = redirect as string
})

const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入手机号' },
    { min: 8, max: 11, message: '请输入正确的手机号' }
  ],
  password: [
    { required: true, message: '请输入密码' },
  ]
})

const form = ref<FormInstance>()

const handleLogin = async() => {
  const hasValid = await form.value?.validate((valid) => {
    return valid
  })
  if (hasValid && !formState.isAgreeProtocal) {
    pageState.isDialogShow = true
    return
  }
  if (hasValid && formState.isAgreeProtocal) {
    await userStore.login(formState)
    if (pageState.redirect) {
      router.push(pageState.redirect)
    } else {
      router.push('/')
    }
  }
}

const handleProtocalAgree = () => {
  pageState.isDialogShow = false
  formState.isAgreeProtocal = true
}
</script>

<template>
  <div class="login-container">
    <div class="login-left">
      <div class="main-logo">
        <img src="@/icons/logo.svg" />
      </div>
      <div class="main-content">
        <div class="login-content-container">
          <div class="login-form">
            <div class="form-header">欢迎使用</div>
            <el-form
              :model="formState"
              :rules="rules"
              ref="form"
            >
              <el-form-item prop="username">
                <el-input
                  v-model="formState.username"
                  placeholder="请输入手机号"
                  :validate-event="false"
                ></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  v-model="formState.password"
                  placeholder="请输入密码"
                  type="password"
                  show-password
                  :validate-event="false"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleLogin">登录</el-button>
              </el-form-item>
              <el-form-item class="protocal">
                <el-checkbox v-model="formState.isAgreeProtocal" :validate-event="false" >
                  我已阅读并同意 <el-link type="primary">服务协议</el-link> 和 <el-link type="primary">隐私政策</el-link>
                </el-checkbox>
              </el-form-item>
            </el-form>
          </div>
          <div class="login-toggle">
            <div class="mode-switch-container"></div>
          </div>
        </div>
      </div>
      <el-dialog 
        v-model="pageState.isDialogShow"
        :close-on-click-modal="false"
        :show-close="false"
        width="490px">
        <div class="protocal-content-container">
          <info class="protocal-content__icon" theme="outline" size="24" fill="#4d83ff"/>
          <div>
            <div class="protocal-content__header">提示</div>
            <div class="protocal-content__inner">
              请先同意 <el-link type="primary">服务协议</el-link> 和 <el-link type="primary">隐私政策</el-link>
            </div>
          </div>
        </div>
        <template #footer>
          <el-button @click="pageState.isDialogShow = false">取消</el-button>
          <el-button type="primary" @click="handleProtocalAgree">同意</el-button>
        </template>
      </el-dialog>
    </div>
    <div class="login-right"></div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  display: flex;

  .login-left {
    flex: 1;
    position: relative;

    .main-logo {
      display: flex;
      align-items: center;
      padding-left: 35px;
      height: 80px;
    }

    .main-content {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 444px;
      height: 550px;
      border: 1px solid #dee0e3;
      border-radius: 25px;
      box-shadow: 0 4px 8px rgb(31 35 41 / 3%), 0 3px 6px -6px rgb(31 35 41 / 5%), 0 6px 18px 6px rgb(31 35 41 / 3%);
      transform: translate(-50%, -50%);

      .login-content-container {
        position: relative;
      }

      .login-form {
        padding: 40px;
        width: 444px;
        height: 550px;

        .form-header {
          margin-bottom: 15px;
          font-size: 20px;
          font-weight: 700;
        }

        :deep(.el-form) {
          .el-input__inner {
            height: 40px;
          }
        }

        .protocal {
          margin-top: 25px;
        }
      }

      .login-toggle {
        position: absolute;
        top: 4px;
        right: 4px;
        width: 400px;
        height: 80px;
      }
    }

    :deep(.el-overlay-dialog) {
      right: 500px;

      .el-dialog {
        left: 50%;
        margin: 0;
        margin-top: 30vh;
        transform: translateX(-50%);
        border-radius: 8px;

        .el-dialog__header {
          display: none;
        }

        .el-dialog__body {
          padding-bottom: 10px;
        }

        .protocal-content-container {
          display: flex;

          .protocal-content__icon {
            margin-right: 20px;
          }

          .protocal-content__header {
            margin-bottom: 10px;
            font-size: 16px;
            line-height: 24px;
          }
        }
      }
    }
  }

  .login-right {
    width: 500px;
    height: 100vh;
    background-color: #ccc;
  }
}
</style>

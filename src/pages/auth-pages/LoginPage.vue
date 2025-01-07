<template>
  <div class="login">
    <div class="login__container flex justify-between">
      <img
        src="../../assets/images/phones.png"
        alt="phones"
        class="w-96"
      >
      <div class="login__content text-center">
        <div class="login__main">
          <h1 class="login__logo text-4xl font-bold my-7">{{ mainStore.appName }}</h1>
          <LoginForm />
          <span class="login__or">OR</span>
          <router-link
           to="/auth/login"
           class="login__forgot-password"
          >Forgot password?</router-link>
        </div>
        <div class="login__sign-up">
          <p>Don't have an account?</p>
          <router-link to="/auth/sign-up">Sign up</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import LoginForm from '@/components/login/LoginForm.vue'
import { useMainStore } from '../../stores/MainStore'

const mainStore = useMainStore()
</script>

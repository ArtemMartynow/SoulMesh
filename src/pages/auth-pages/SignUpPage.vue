<template>
  <div class="sign-up">
    <div class="sign-up__content">
      <div
        class="successfully-register"
        v-if="isSuccessfullyRegister"
      >
        <h2>
          You have been successfully registered
        </h2>
        <button
          class="sign-up__btn"
          @click="routeLogin"
        >log in</button>
      </div>
      <template v-else>
        <div
          class="sign-up__main"
        >
          <h1 class="sign-up__logo text-4xl font-bold my-7">
            {{ $mainStore.appName }}
          </h1>
          <p>
            Sign up to see photos and videos from your friends
          </p>
          <SignUpFormVue
            @onSuccess="onSuccess()"
          />
        </div>
        <div
          class="sign-up__login"
        >
          <p>Have an account? </p>
          <router-link :to="{ name: 'Login' }">Log in</router-link>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import SignUpFormVue from '@/components/signUp/SignUpForm.vue'
import router from '@/router'
import { ref } from 'vue'

let isSuccessfullyRegister = ref(false)

function routeLogin() {
  router.push({name: 'Login'})
}

function onSuccess() {
  isSuccessfullyRegister.value = true
}
</script>

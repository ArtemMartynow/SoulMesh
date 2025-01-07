<template>
  <form class="login__form flex flex-wrap relative" @submit.prevent="postLogin()">
    <div
      class="login__success"
      v-if="loginSuccess === true"
    >
      <h2>success</h2>
    </div>
    <template v-for="(value, key) in form" :key="key">
      <div v-if="key === 'username'" class="flex flex-wrap w-full">
        <input
          type="text"
          :class="formErrors[key] || mainError ? 'login__inp_error' : 'login__inp'"
          placeholder="Username"
          v-model="form.username"
          @input="clearFormError(key)"
        >
        <span class='text-red-500 text-xs text-center w-full'>
          {{ formErrors[key] || mainError }}
        </span>
      </div>
      <div v-else class="relative w-full flex flex-wrap">
        <input 
          :type="passwordFieldType" 
          :class="formErrors[key] ? 'login__inp_error login__password' : 'login__inp login__password'"
          placeholder="Password"
          v-model="form.password"
          @input="clearFormError(key)"
        >
        <span class='text-red-500 text-xs text-center w-full'>
          {{ formErrors.password }}
        </span>
        <span class="show-password" @click="togglePasswordVisibility">
          {{ passwordFieldType === 'password' ? 'Show' : 'Hide' }}
        </span>
      </div>
    </template>
    <VButton
      class="auth__btn"
      :isLoading="isLoading"
    >
      Login
    </VButton>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import AuthApi from '@/api/auth'
import router from '@/router'
import VButton from '../VButton.vue'

let initialForm = {
  username: '',
  password: ''
}

let form = ref({...initialForm})
let formErrors = ref({...initialForm})
let loginSuccess = ref(false)
let mainError = ref('')
let passwordFieldType = ref('password')
let isLoading = false

function resetForm() {
  Object.keys(form.value).forEach(key => {
    form.value[key] = ''
  })
}

function resetFormErrors() {
  Object.keys(formErrors.value).forEach(key => {
    formErrors.value[key] = ''
  })
}

function togglePasswordVisibility() {
  passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
}

function clearFormError(field) {
  if (formErrors.value.hasOwnProperty(field)) {
    formErrors.value[field] = ''
  }
  mainError.value = ''
}

function postLogin() {
  if(isLoading === false) {
    resetFormErrors()
    isLoading = true
    AuthApi.login(form.value)
    .then(() => {
      resetForm()
      router.push({name: 'AppHomePage'})
      isLoading = false
    })
    .catch(errorInfo => {
      console.log(errorInfo)
      isLoading = false
      if (errorInfo.errors) {
        formErrors.value = errorInfo.errors
      } else {
        mainError.value = errorInfo.message
      }
    })
  } 
}
</script>

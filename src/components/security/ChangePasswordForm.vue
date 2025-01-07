<template>
  <form class="change-password__form" @submit.prevent="changePassword()">
    <template v-for="(value, key) in form" :key="key">
      <div class="mb-3" v-if="key === 'current_password'">
        <input 
          type="password"
          :class="formErrors[key] || mainError ? 'change-password__input_error' : 'change-password__input'" 
          :placeholder="key"
          v-model="form[key]" 
          @input="clearFormError(key)"  
        >
        <span class="text-red-500 text-xs" v-if="formErrors[key] || mainError">
          {{ formErrors[key] || mainError }}
        </span>
      </div>
      <div class="mb-3" v-else>
        <input 
          type="password"
          :class="formErrors[key] ? 'change-password__input_error' : 'change-password__input'" 
          :placeholder="key"
          v-model="form[key]" 
          @input="clearFormError(key)"  
        >
        <span class="text-red-500 text-xs" v-if="formErrors[key]">
          {{ formErrors[key] }}
        </span>
      </div>
    </template>
    <VButton
      class="change-password__form-btn"
      :isLoading="isLoading"
    >
      Change
    </VButton>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import ProfileApi from '@/api/profile'
import VButton from '../VButton.vue';

let initialForm = {
  current_password: '',
  new_password: '',
  repeat_password: ''
}

let form = ref({...initialForm})
let formErrors = ref({...initialForm})
let mainError = ref('')
let isLoading = false

function resetForm() {
  Object.keys(form.value).forEach(key => {
    form.value[key] = ''
  })
}

function resetFormErrors() {
  Object.keys(formErrors.value).forEach(key => {
    formErrors.value[key] = ''
    mainError.value = ''
  })
}

function clearFormError(field) {
  if (formErrors.value.hasOwnProperty(field)) {
    formErrors.value[field] = ''
    mainError.value = ''
  }
}

function changePassword() {
  resetFormErrors()
  isLoading = true
  ProfileApi.changePassword(form.value)
  .then(() => {
    resetForm()
    isLoading = false
  })
  .catch(error => {
    formErrors.value = error.errors
    mainError.value = formErrors.value.password
    console.log(error)
    isLoading = false
  })
}
</script>
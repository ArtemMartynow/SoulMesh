<template>
  <form class="sign-up__form flex flex-wrap relative" @submit.prevent="postRegister()">
    <template v-for="(value, key) in form" :key="key">
      <div 
        v-if="key !== 'password' && key !== 'birth_day' && key !== 'gender' && key !== 'short_description' && key !== 'avatar'" 
        class="w-full"
      >
        <input
          type="text"
          :class="formErrors[key] ? 'sign-up__input_error' : 'sign-up__inp'"
          :placeholder="key"
          v-model="form[key]"
          @input="clearFormError(key)"
        >
        <span class="text-red-500 text-xs" v-if="formErrors[key]">
          {{ formErrors[key] }}
        </span>
      </div>
      <div v-if="key === 'gender'" class="w-full">
        <VSelect 
          :class="form.gender !== '' ? 'sign-up__select_active' : 'sign-up__select'" 
          v-model="form.gender"
          :options="options"
          :noValue="genderNoValue"
        />
      </div>
      <div v-if="key === 'birth_day'" class="w-full">
         <VueDatePicker 
          :class="formErrors[key] ? 'sing-up__calendar_error' : 'sing-up__calendar'" 
          v-model="form.birth_day"
          @update:model-value="clearFormError(key)"
          :format="format"
          :max-date="new Date()"
        ></VueDatePicker>
        <span class="text-red-500 text-xs" v-if="formErrors[key]">
          {{ formErrors[key] }}
        </span>
      </div>
      <div v-if="key === 'password'" class="password-field w-full">
        <input
          :type="passwordFieldType"
          class="sign-up__inp"
          placeholder="Password"
          v-model="form.password"
          @input="clearFormError(key)"
        >
        <span class="show-password" @click="togglePasswordVisibility">
          {{ passwordFieldType === 'password' ? 'Show' : 'Hide' }}
        </span>
        <span class="text-red-500 text-xs" v-if="formErrors[key]">
          {{ formErrors[key] }}
        </span>
      </div>
    </template>
    <div class="w-full">
      <textarea
        class='sign-up__textarea'
        placeholder="short description"
        v-model="short_description"
      ></textarea>
    </div>
    <p>
      By signing up, you agree to our Terms,
      Privacy Policy and Cookies Policy.
    </p>
    <VButton
    class="auth__btn"
    :isLoading="isLoading"
    >
    Sign up
    </VButton>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import AuthApi from '@/api/auth'
import VButton from '../VButton.vue'
import VSelect from '../VSelect.vue'
import useDate from '../../composables/useDate'

let options = [
  {
    name: 'Gender',
    value: ''
  },
  {
    name: 'Male',
    value: 'male'
  },
  {
    name: 'Female',
    value: 'female'
  }
]
const parentSelectedOption = ref('')

const emit = defineEmits(['onSuccess'])

const initialFormFields = {
  username: '',
  first_name: '',
  last_name: '',
  password: '',
  country: '',
  city: '',
  gender: '',
  birth_day: '',
}

let formErrors = ref({ ...initialFormFields })
let passwordFieldType = ref('password')
let short_description = ref('')
let isLoading = false
let genderNoValue = ref('Gender')
const format = useDate.$formatDate

let form = ref({
  ...initialFormFields,
  short_description: short_description,
})

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

function clearFormError(field) {
  if (formErrors.value.hasOwnProperty(field)) {
    formErrors.value[field] = ''
  }
}

function togglePasswordVisibility() {
  passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
}

function postRegister() {
  if(isLoading === false) {
    resetFormErrors()
    isLoading = true
    AuthApi.register(form.value, short_description.value)
    .then((response) => {
      resetForm()
      emit('onSuccess')
      isLoading = false
    })
    .catch(error => {
      formErrors.value = error.errors
      console.log(error)
      isLoading = false
    })
  }
}
</script>
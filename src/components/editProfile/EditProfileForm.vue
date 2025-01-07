<template>
  <form class="edit-profile__form" @submit.prevent="changeInfoUser()">
    <template v-for="(value, key) in form" :key="key">
      <div 
        class="mb-3" 
        v-if="key !== 'gender' && 
        key !== 'birth_day' && 
        key !== 'short_description' &&
        key !== 'createdAt' &&
        key !== 'updatedAt' &&
        key !== 'avatar' &&
        key !== 'id' &&
        key !== 'password'"
      >
        <input 
          type="text"
          :class="formErrors[key] ? 'edit-profile__input_error' : 'edit-profile__input'" 
          :placeholder="key"
          v-model="form[key]" 
          @input="handleInputEvent(key)"  
        >
        <span class="text-red-500 text-xs" v-if="formErrors[key]">
          {{ formErrors[key] }}
        </span>
      </div>
      <div class="mb-3" v-else-if="key === 'gender'">
        <VSelect 
          :class="form.gender === '' ? 'edit-profile__select' : 'edit-profile__select_active'" 
          v-model="form.gender"
          :options="options"
          :noValue="genderNoValue"
          @click="isFormWasSended = true"
          />
      </div>
      <div class="mb-3" v-else-if="key === 'birth_day'">
        <VueDatePicker 
          :class="formErrors[key] ? 'calendar__error' : ''" 
          v-model="form.birth_day"
          @update:model-value="handleInputEvent(key)"
          :format="format"
          :max-date="new Date()"
        ></VueDatePicker>
        <span class="text-red-500 text-xs" v-if="formErrors[key]">
          {{ formErrors[key] }}
        </span>
      </div>
      <textarea
        class='edit-profile__textarea'
        placeholder="short description"
        v-model="form[key]"
        @input="isFormWasSended = true"
        v-else-if="key === 'short_description'"
      ></textarea>
    </template>
    <VButton
      :class="isFormWasSended === false ? 'settings-form__btn_no-active' : 'settings-form__btn'"
      :isLoading="isLoading"
    >
      Save
    </VButton>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import ProfileApi from '@/api/profile'
import VButton from '../VButton.vue'
import VSelect from '../VSelect.vue'
import useDate from '../../composables/useDate'
import { useProfileStore } from '@/stores/profileStore'

const profileStore = useProfileStore()

let options = [
  {
    name: 'gender',
    value: ''
  },
  {
    name: 'male',
    value: 'male'
  },
  {
    name: 'female',
    value: 'female'
  }
]

let genderNoValue = ref('')

let initialForm = {
  username: '',
  first_name: '',
  last_name: '',
  country: '',
  city: '',
  gender: '',
  birth_day: '',
}

let formErrors = ref({...initialForm})
let isLoading = ref(false)
let isFormWasSended = ref(false)
const format = useDate.$formatDate

let form = ref({
  ...profileStore.fullProfileInfo
})

if (profileStore.fullProfileInfo.gender !== 'male' && profileStore.fullProfileInfo.gender !== 'female') {
  genderNoValue.value = 'gender'
} else {
  genderNoValue.value = profileStore.fullProfileInfo.gender
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

function handleInputEvent(field) {
  clearFormError(field)
  isFormWasSended.value = true
}

function changeInfoUser() {
  if (isFormWasSended.value === true) {
    isFormWasSended.value = false
    resetFormErrors()
    isLoading.value = true
      ProfileApi.updateProfile(form.value)
      .catch(error => {
        formErrors.value = error.errors
        console.log(error)
      })
      .finally(() => {
        isLoading.value = false
      });
  }
}
</script>
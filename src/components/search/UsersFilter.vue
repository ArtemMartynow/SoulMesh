<template>
  <div :class="$searchStore.isOnFilterSidebar === false ? 'search-filter' : ' search-filter search-filter_active'">
    <h2 class="text-3xl">Filter</h2>
    <div class="search-filter__content">
      <span class="text-2xl">age</span>
      <div class="search-filter__age">
        <input 
          type="number" 
          class="search-filter__age-input"
          placeholder="from"
          v-model="ageFrom"
          min="0"
        >
        <span class="mx-1">-</span>
        <input 
          type="number" 
          class="search-filter__age-input"
          placeholder="to"
          v-model="ageTo"
          min="0"
        >
      </div>
      <span class="text-2xl">gender</span>
      <div class="search-filter__gender">
        <div>
          <label class="custom-checkbox">any
            <input type="checkbox" name="gender" v-model="isGender" value="">
            <span class="checkmark"></span>
          </label>
        </div>
        <div>
          <label class="custom-checkbox">male
            <input type="checkbox" name="male" v-model="isGender" value="male">
            <span class="checkmark"></span>
          </label>
        </div>
        <div>
          <label class="custom-checkbox">female
            <input type="checkbox" name="female" v-model="isGender" value="female">
            <span class="checkmark"></span>
          </label>
        </div>
      </div>
      <span class="text-2xl">with a photo</span>
      <div class="search-filter__avatar">
        <div>
          <label class="custom-checkbox">with a photo
            <input 
              type="checkbox" 
              name="with" 
              v-model="isWithPhoto"
              @click="isWithoutPhoto = false"  
            >
            <span class="checkmark"></span>
          </label>
        </div>
        <div>
          <label class="custom-checkbox">without a photo
            <input 
              type="checkbox" 
              name="without" 
              v-model="isWithoutPhoto"
              @click="isWithPhoto = false"  
            >
            <span class="checkmark"></span>
          </label>
        </div>
      </div>
    </div>
    <button class="search-filter__btn" @click="filterUsers">filter</button>
  </div>
</template>

<script setup>
import { ref } from "vue"
import useDate from '@/composables/useDate'
import { $notify } from '@/composables/useNotify.js'
import { useSearchStore } from '@/stores/searchStore'
import { useProfileStore } from '@/stores/profileStore'

const searchStore = useSearchStore()
const profileStore = useProfileStore()

const props = defineProps({
  users: Array,
})

const emitUsers = defineEmits(['usersAfterFilter'])
let isWithoutPhoto = ref(false)
let isWithPhoto = ref(false)
let isGender = ref([])
let ageTo = ref()
let ageFrom = ref()
let users = searchStore.users

const filterUsers = () => {
  if (ageTo.value < ageFrom.value || ageFrom.value > ageTo.value) {
    $notify('error', 'Please select the correct age range: from minimum age to maximum age years.')
    return
  }
  users = users.filter((user) => {
    return user.id != profileStore.fullProfileInfo.id
  })
  for (const value in isGender.value) {
    if (isGender.value[value] === '') {
      isGender.value.push(null)
    }
    if (isGender.value[value] !== '') {
      isGender.value = isGender.value.filter((n) => {return n != null})
    }
  }
  let newUsers = [...users]
  if (isGender.value.length > 0) {newUsers = newUsers.filter(user => isGender.value.includes(user.gender))}
  if (isWithoutPhoto.value) {newUsers = newUsers.filter(user => user.avatar === null)}
  if (isWithPhoto.value) {newUsers = newUsers.filter(user => user.avatar !== null)}
  if (ageFrom.value) {newUsers = newUsers.filter(user => useDate.calcUserYears(user.birth_day) >= ageFrom.value)}
  if (ageTo.value) {newUsers = newUsers.filter(user => useDate.calcUserYears(user.birth_day) <= ageTo.value)}
  emitUsers('usersAfterFilter', newUsers)
}
</script>
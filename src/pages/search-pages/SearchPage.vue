<template>
  <div class="search" v-if="$searchStore.isGetUsers === false">
    <div class="search__content relative">
      <h2 class="text-3xl">Search</h2>
      <input type="text" class="search__inp" placeholder="Search" v-model="searchInput">
      <img 
        src="../../assets/images/bars-solid.svg" 
        alt="filter-sidebar" 
        :class="
          $searchStore.isOnFilterSidebar === false ? 
          'absolute top-6 right-3 w-6 search__filter-sidebar z-10 cursor-pointer' : 
          ' fixed top-6 w-6 search__filter-sidebar_active z-10 cursor-pointer'
        "
        @click="$searchStore.onFilterSidebar"
      >
      <div class="users" v-for="user in newUsersList" :key="user">
        <UserCard :user="user" />
      </div>
    </div>
    <UsersFilter @usersAfterFilter="(newUsers) => users = newUsers" :users="users"/>
  </div>
  <img 
    v-else
    src="../../assets/images/circle-notch-solid-green.svg" 
    alt="loading" 
    class="animate-spin w-10 absolute left-1/2 -ml-2.5 top-1/2 -mt-2.5"
  >
</template>

<script setup>
import UserCard from '@/components/search/UserCard.vue'
import UsersFilter from '@/components/search/UsersFilter.vue'
import SearchApi from '@/api/search'
import { computed, ref } from 'vue'
import { useSearchStore } from '@/stores/searchStore'
import { useProfileStore } from '@/stores/profileStore'

const searchStore = useSearchStore()
const profileStore = useProfileStore()
let searchInput = ref('')

SearchApi.getUsers().then(() => {
  users.value = searchStore.users
  users.value = users.value.filter((user) => {
    return user.id != profileStore.fullProfileInfo.id
  })
})
let users = ref([])
let newUsersList = computed(() => {
  return users.value.filter(
    (user) => user.username.indexOf(searchInput.value) !== -1 || 
    user.first_name.indexOf(searchInput.value) !== -1 || 
    user.last_name.indexOf(searchInput.value) !== -1
    )
})
</script>
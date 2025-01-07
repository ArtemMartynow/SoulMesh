<template>
  <div class="my-friends" v-if="isLoading === true">
    <template v-if="$friendsStore.myFriends.length !== 0">
      <input type="text" class="search__inp" placeholder="Search" v-model="searchInput">
      <template v-for="friend in newFriendsList" :key="friend.id">
        <FriendCard :friend="friend" />
      </template>
    </template>
    <span class="text-4xl mt-7" v-else>No friends</span>
  </div>
  <img 
    v-else
    src="../../assets/images/circle-notch-solid-green.svg" 
    alt="loading" 
    class="animate-spin w-10 absolute left-1/2 -ml-2.5 top-1/2 -mt-2.5"
  >
</template>

<script setup>
import FriendCard from '@/components/friendship/FriendCard.vue'
import FriendsApi from '@/api/friends'
import { ref, computed } from 'vue'
import { useFriendsStore } from '@/stores/friendsStore'

const friendsStore = useFriendsStore()

let searchInput = ref('')
let friends = ref([])
let isLoading = ref(false)
let newFriendsList = computed(() => {
  return friends.value.filter(
    (friend) => friend.username.indexOf(searchInput.value) !== -1 || 
    friend.first_name.indexOf(searchInput.value) !== -1 || 
    friend.last_name.indexOf(searchInput.value) !== -1
    )
})
FriendsApi.getMyFriends()
  .then(() => {
    friends.value = friendsStore.myFriends
    isLoading.value = true
  })
</script>
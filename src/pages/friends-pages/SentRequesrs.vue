<template>
  <div class="my-friends" v-if="isLoading === true">
    <template v-if="$friendsStore.sentRequests.length !== 0">
      <template v-for="friend in $friendsStore.sentRequests" :key="friend.id">
        <FriendCard 
          :friend="friend.Addressee" 
          listUsers="Addressee"  
          :userId="friend.id"
        />
      </template>
    </template>
    <span class="text-4xl mt-7" v-else>No sent requests</span>
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
import { ref } from 'vue'

let isLoading = ref(false)

FriendsApi.getSentRequests()
  .then(() => {
    isLoading.value = true
  })
</script>
<template>
  <div class="user-card">
    <router-link :to="{name: 'userProfile', params: {userId: user.id}}">
      <div class="user-card__avatar">
        <UserAvatar 
          :avatar="user.avatar" 
        />
      </div>
      <div class="info ml-2">
        <h3 class="info__username font-bold">{{ user.username }}</h3>
        <span class="info__first-name">{{ user.first_name }}</span>
        <span class="info__last-name ml-1">{{ user.last_name }}</span>
        <span class="info__age ml-1" v-show="userAge !== null">, {{ useDate.calcUserYears(userAge) }} years</span>
      </div>
    </router-link>
    <button 
      class="add-friend"
      @click="addFriend(user.id)"
      v-if="isFriend === false && hasPendingRequest === false"  
    >
      <span>Add to friends</span>
    </button>
    <span 
      v-else-if="hasPendingRequest === true"
     class="your-friend"
    >
      <router-link :to="{name: 'userProfile', params: {userId: user.id}}">
        sent request
      </router-link>
    </span>
    <span 
      v-else-if="isFriend === true"
      class="your-friend"
    >
      <router-link :to="{name: 'userProfile', params: {userId: user.id}}">
        friend
      </router-link>
    </span>
  </div>
</template>

<script setup>
import useDate from '@/composables/useDate'
import FriendsApi from '@/api/friends'
import UserAvatar from '../UserAvatar.vue';
import { ref } from 'vue'

const props = defineProps({
  user: Object
})
let userAge = ref(props.user.birth_day)
let hasPendingRequest = ref(props.user.hasPendingRequest)
let isFriend = ref(props.user.isFriend)

const addFriend = (id) => {
  let userId = {
    "addressee_id": id
  }
  console.log(userId);
  FriendsApi.sendFriendRequest(userId)
    .then(() => {
      hasPendingRequest.value = true
    })
}

useDate.calcUserYears(userAge)
</script>
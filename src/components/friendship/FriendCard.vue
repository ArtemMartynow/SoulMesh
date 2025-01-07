<template>
  <div class="friend-card">
    <router-link :to="{name: 'userProfile', params: {userId: friend.id}}">
      <UserAvatar 
        :avatar="friend.avatar" 
      />
      <FriendInfo 
        :username="friend.username" 
        :firstName="friend.first_name" 
        :lastName="friend.last_name" 
        :birthDay="friend.birth_day" 
      />
    </router-link>
    <button 
      class="unfriend" 
      @click="unfriend(props.userId)"
      v-if="listUsers ==='Requester'" 
    >
      <span>Unfriend</span>
    </button>
    <button 
      class="add-friend" 
      @click="acceptFriend(props.userId)"
      v-if="listUsers ==='Requester'"  
    >
      <span>Add to friends</span>
    </button>
    <button 
      class="cancel-requast" 
      @click="unfriend(props.userId)"
      v-if="listUsers ==='Addressee'"  
    >
      <span>Cancel</span>
    </button>
  </div>
</template>

<script setup>
import FriendsApi from '@/api/friends'
import UserAvatar from '../UserAvatar.vue'
import FriendInfo from './FriendInfo.vue'

const props = defineProps({
  friend: Object,
  listUsers: String,
  userId: Number
})

const acceptFriend = (id) => {
  let userId = {
    "request_id": id
  }
  FriendsApi.acceptRequest(userId)
  .then(() => {
    FriendsApi.getReceivedRequests()
    FriendsApi.getFriendsCount()
  })
}

const unfriend = (id) => {
  let userId = {
    "request_id": id
  }
  console.log(userId);
  FriendsApi.unfriendRequest(userId)
  .then(() => {
    FriendsApi.getSentRequests()
    FriendsApi.getReceivedRequests()
    FriendsApi.getFriendsCount()
  })
}
</script>
<template>
  <div class="new-message-modal">
    <div class="new-message-modal__window">
      <div class="new-message-modal__header">
        <h2>New message</h2>
        <img 
          src="../../assets/images/plus-close-solid.svg" 
          alt="close"
          @click="$emit('cancel', false)" 
        >
      </div>
      <div class="new-message-modal__search">
        <span>To:</span>
        <input 
          type="text" 
          placeholder="Search..." 
          v-model="searchInput"
        >
      </div>
      <div 
        class="new-message-modal__users" 
        v-if="isLoading === false"
      >
        <UserNewMessageCard 
          v-for="user in newUsersList"
          :key="user.id"  
          :user="user"
          :lastMessage="user.first_name + user.last_name"
          :hasUnreadMessages="false"
          @click="setChat(user)"
        />
      </div>
      <img 
        v-else
        src="../../assets/images/circle-notch-solid-green.svg" 
        alt="loading" 
        class="animate-spin w-10 absolute left-1/2 -ml-2.5 top-1/2 -mt-2.5"
      >
    </div>
    <div class="modal__overplay"></div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import UserNewMessageCard from './UserNewMessageCard.vue'
import FriendsApi from '@/api/friends'
import ChatApi from '@/api/chat'
import { useProfileStore } from '@/stores/profileStore'
import { useChatStore } from '@/stores/chatStore'
import { useFriendsStore } from '@/stores/friendsStore'

const profileStore = useProfileStore()
const chatStore = useChatStore()
const friendsStore = useFriendsStore()

let searchInput = ref('')
let users = ref([])
let isLoading = ref(true)
let newUsersList = computed(() => {
  return users.value.filter(
    (user) => user.username.indexOf(searchInput.value) !== -1 || 
    user.first_name.indexOf(searchInput.value) !== -1 || 
    user.last_name.indexOf(searchInput.value) !== -1
    )
})
const emitSetChat = defineEmits(['cancel'])

const setChat = (user) => {
  chatStore.setSelectedUserChat(user)
  ChatApi.getChat(user.id)
  emitSetChat('cancel', false)
}

FriendsApi.getMyFriends().then(() => {
  users.value = friendsStore.myFriends
  users.value = users.value.filter((user) => {
    return user.id != profileStore.fullProfileInfo.id
  })
  isLoading.value = false
})
</script>
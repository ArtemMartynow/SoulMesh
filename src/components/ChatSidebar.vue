<template>
  <div :class="$chatStore.isSelectedUserChatEmpty ? 'chat-sidebar' : 'chat-sidebar__selected-chat'">
    <div class="chat-sidebar__info">
      <h2>{{ $profileStore.profileInfo.username }}</h2>
      <img 
        src="../assets/images/pen-to-square-regular.svg" 
        alt="write"
        @click="isNewMessage = true"
      >
    </div>
    <div class="chat-sidebar__content">
      <UserChatCard 
        v-for="chat in $chatStore.chats"
        :key="chat.id"
        :user="getChatPartner(chat)"
        :lastMessage="chat.text"
        :lastMessageCreated="chat.createdAt"
        :hasUnreadMessages="chat.read"
        :senderId="chat.sender_id"
        @click="setChat(getChatPartner(chat), chat)"
      />
    </div>
    <NewMessageModal 
      v-if="isNewMessage === true" 
      @cancel="(n) => isNewMessage = n"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NewMessageModal from '../components/chat/NewMessageModal.vue'
import UserChatCard from '../components/chat/UserChatCard.vue'
import ChatApi from '@/api/chat'
import { useProfileStore } from '@/stores/profileStore'
import { useChatStore } from '@/stores/chatStore'

const profileStore = useProfileStore()
const chatStore = useChatStore()
let currentUserId = profileStore.profileInfo.id
let isNewMessage = ref(false)

const getChatPartner = (chat) => {
  return chat.sender.id === currentUserId ? chat.receiver : chat.sender
}

const setChat = (user, chat) => {
  chatStore.setSelectedUserChat(user)
  ChatApi.getChat(user.id)
  
  if (!chat.read && chat.sender_id !== currentUserId) {
    chatStore.reduceUnreadMessages()
    chat.read = true
  }
}
</script>
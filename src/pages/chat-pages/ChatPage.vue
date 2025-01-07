<template>
  <div 
    :class="$chatStore.isSelectedUserChatEmpty ? 'chat' : 'chat__selected-chat'"
  >
    <div
      class="chat__new-message"
      v-if="$chatStore.isSelectedUserChatEmpty"  
    >
      <img src="../../assets/images/message-regular.svg" alt="new-message">
      <h2>Your messages</h2>
      <p>Send a message to start a chat.</p>
      <button @click="isNewMessage = true">Send message</button>
    </div>
    <div v-else class="chat-content">
      <div class="chat-content__header flex items-center p-3">
        <router-link 
          :to="{name: 'userProfile', params: {userId: $chatStore.selectedUserChat.id}}"
          class="flex items-center"  
        >
          <UserAvatar :avatar="$chatStore.selectedUserChat.avatar"/>
          <h2 class="font-semibold ml-2">{{ fullName($chatStore.selectedUserChat) }}</h2>
        </router-link>
      </div>
      <div class="chat-content__chat" ref="chatContainer">
        <Message 
          v-for="message in $chatStore.chatMessages"
          :key="message.createdAt"
          :avatar="$chatStore.selectedUserChat.avatar"
          :message="message"
          :lastMessageId="lastMessageId"
        />
      </div>
      <div class="chat-content__send-message relative">
        <input type="text" placeholder="Message..." v-model="message" @keyup.enter="sendMessage()">
        <button 
          v-if="message.length > 0"
          @click="sendMessage()"
        >Send</button>
      </div>
    </div>
    <NewMessageModal 
      v-if="isNewMessage === true" 
      @cancel="(n) => isNewMessage = n"
    />
  </div>
</template>

<script setup>
import NewMessageModal from '../../components/chat/NewMessageModal.vue'
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import UserAvatar from '@/components/UserAvatar.vue'
import { fullName } from '@/helpers/customFunctions'
import ChatApi from '@/api/chat'
import Message from '@/components/chat/Message.vue'
import { useChatStore } from '@/stores/chatStore'
import { useProfileStore } from '@/stores/profileStore'

const chatStore = useChatStore()
const profileStore = useProfileStore()

let message = ref('')
const lastMessageId = computed(() => {
  return chatStore.chatMessages.length > 0 ? chatStore.chatMessages[chatStore.chatMessages.length - 1].id : null
})
let chatContainer = ref(null)
let isNewMessage = ref(false)

const sendMessage = () => {
  if (message.value !== '') {
    ChatApi.sendMessage({
      receiver_id: chatStore.selectedUserChat.id,
      text: message.value
    })
    .then(() => {
      message.value = ''
    })
  }
}

const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

watch(() => chatStore.chatMessages, () => {
  nextTick(() => {
    scrollToBottom()
  })
}, { deep: true })

let getUnreadMessagesCount = () => {
  for (let i = 0; i < chatStore.chats.length; i++) {
    let chat = chatStore.chats[i]
    let currentUserId = profileStore.fullProfileInfo.id
    if (!chat.read && chat.sender_id !== currentUserId) {
      chatStore.addUnreadMessage()
    }
  }
}

onMounted(() => {
  chatStore.clearUnreadMessage()
  getUnreadMessagesCount()
})

onBeforeUnmount(() => {
  chatStore.cleanSelectedUserChat()
})
</script>
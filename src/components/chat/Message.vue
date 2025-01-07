<template>
  <div 
    class="chat-content__message_user"
    v-if="props.message.sender_id !== $profileStore.fullProfileInfo.id"  
  >
    <router-link 
      :to="{
        name: 'userProfile', 
        params: {userId: $chatStore.selectedUserChat.id}
      }"
    >
      <UserAvatar
       :avatar="props.avatar"
      />
    </router-link>
    <p>{{ props.message.text }}</p>
    <span class="w-full text-left text-sm">
      {{ formatPostDate(props.message.createdAt) }}
      {{ formatTimeDate(props.message.createdAt) }}
    </span>
    <img 
      src="../../assets/images/eye-regular.svg" 
      alt="eye"
      class="seen-eye"
    >
  </div>
  <div v-else class="chat-content__message">
    <p>
      {{ message.text }}
      <img 
        src="../../assets/images/trash-can-solid.svg" 
        alt="delete"
        class="chat-content__message_delete"  
        @click="isDeleteMessage = true"
      >
    </p>
    <span class="w-full text-right text-sm">
      {{ formatPostDate(props.message.createdAt) }}
      {{ formatTimeDate(props.message.createdAt) }}
    </span>
    <img 
      src="../../assets/images/eye-regular.svg" 
      alt="eye"
      class="seen-eye"
      v-if="message.read" 
    >
    <img 
      src="../../assets/images/eye-slash-regular.svg" 
      alt="eye"
      class="seen-eye"
      v-else
    >
  </div>
  <ConfirmationModal 
    v-if="isDeleteMessage === true"
    title="Delete the message?"
    message="This will cause this message to be deleted."
    buttonText="Delete"
    buttonTextColor="text-red-600"
    @confirmAction="deleteMessage(props.message.id)"
    @cancel="(n) => isDeleteMessage = n"
  />
</template>

<script setup>
import { computed, ref } from 'vue'
import UserAvatar from '../UserAvatar.vue'
import ChatApi from '@/api/chat'
import ConfirmationModal from '../ConfirmationModal.vue'
import { formatPostDate } from '@/helpers/customFunctions'
import { formatTimeDate } from '@/helpers/customFunctions'
import { useProfileStore } from '@/stores/profileStore'
import { useChatStore } from '@/stores/chatStore'

const profileStore = useProfileStore()
const chatStore = useChatStore()

const props = defineProps({
  avatar: String,
  message: Object,
  lastMessageId: Number,
})

let isDeleteMessage = ref(false)
const isMyMessage = computed(() => props.message.sender_id === profileStore.fullProfileInfo.id)

const deleteMessage = (id) => {
  ChatApi.deleteMessage(id)
  .then(() => {
    chatStore.deleteMessage(id)
  })
  isDeleteMessage.value = false
}

if (!isMyMessage.value && props.lastMessageId === props.message.id && !props.message.read) {
  ChatApi.markMessageRead(props.lastMessageId)
}
</script>
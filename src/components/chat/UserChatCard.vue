<template>
  <div 
    class="new-message-modal__user" 
    @click="handleClick"
  >
    <UserAvatar :avatar="props.user.avatar" />
    <div class="new-message-modal__user_info">
      <h2>{{ fullName(props.user) }}</h2>
      <span>{{ truncatedMessage }}</span>
      <span v-if="props.lastMessageCreated !== undefined">
        {{ formatPostDate(props.lastMessageCreated) }}
        {{ formatTimeDate(props.lastMessageCreated) }}
      </span>
    </div>
    <span 
      class="chat-content__message_unread"
      v-if="props.hasUnreadMessages === false && $profileStore.profileInfo.id !== props.senderId" 
    ></span>
  </div>
</template>

<script setup>
import { fullName } from '@/helpers/customFunctions'
import { computed } from 'vue'
import { formatPostDate } from '@/helpers/customFunctions'
import { formatTimeDate } from '@/helpers/customFunctions'
import UserAvatar from '../UserAvatar.vue'
import { useProfileStore } from '@/stores/profileStore'
import { useChatStore } from '@/stores/chatStore'

const profileStore = useProfileStore()
const chatStore = useChatStore()

const props = defineProps({
  user: Object,
  lastMessage: String,
  lastMessageCreated: String,
  hasUnreadMessages: Boolean,
  senderId: Number
})

let lastMessageLength = computed(() => props.lastMessage.length)

const truncatedMessage = computed(() => {
  return lastMessageLength.value > 10 ? props.lastMessage.substring(0, 10) + '...' : props.lastMessage
})

const handleClick = () => {
  if (!props.hasUnreadMessages && profileStore.profileInfo.id !== props.senderId) {
    chatStore.markMessageAsRead(props.user.id)
  }
}
</script>
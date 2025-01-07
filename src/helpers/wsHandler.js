import StorageHelper from '@/helpers/localStorageHelper'
import ChatApi from '@/api/chat'
import { $notify } from '@/composables/useNotify.js'
import { useChatStore } from '@/stores/chatStore'
import { useProfileStore } from '@/stores/profileStore'
import { ref } from 'vue'

let socket = ref(null)

const getUnreadMessagesCount = () => {
  const chatStore = useChatStore()
  const profileStore = useProfileStore()

  for (let i = 0; i < chatStore.chats.length; i++) {
    let chat = chatStore.chats[i]
    let currentUserId = profileStore.fullProfileInfo.id
    if (!chat.read && chat.sender_id !== currentUserId) {
      chatStore.addUnreadMessage()
    }
  }
}

export const initWebSocket = () => {
  const chatStore = useChatStore()

  const token = StorageHelper.get('social_app_auth_token')
  socket = new WebSocket(`${import.meta.env.VITE_WS_URL}?authorization=${token}`)

  socket.addEventListener('message', (event) => {
    const receivedMessage = JSON.parse(event.data)
    const messageData = receivedMessage.data
    if (receivedMessage.type === 'new_message') {
      if (chatStore.selectedUserChat.id === messageData.sender_id) {
        chatStore.addMessage(messageData)
        ChatApi.markMessageRead(messageData.id)
      }
      if (chatStore.selectedUserChat.id !== messageData.sender_id) {
        chatStore.clearUnreadMessage()
        let newArr = chatStore.chats

        const index = newArr.findIndex(item => item.sender_id === messageData.sender_id)
        if (index !== -1) {
          newArr[index] = messageData
          chatStore.setChat(newArr)
          getUnreadMessagesCount()
        }
      
        $notify('success', `New Message from ${messageData.sender.username}`)
      }
    } else {
      console.log('New unhandled message')
    }
  })
}

export const closeWebSocket = () => {
  if (socket) {
    socket.close()
    socket.addEventListener('close', (event) => {
      console.log('WebSocket закрыт', event)
    })
    socket = null
  }
}
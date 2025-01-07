import { defineStore } from 'pinia';

export const useChatStore = defineStore('chatStore', {
  state: () => ({
    selectedUserChat: {},
    chats: [],
    chatMessages: [],
    unreadMessages: 0
  }),
  getters: {
    isSelectedUserChatEmpty: state => {
      return Object.keys(state.selectedUserChat).length === 0
    }
  },
  actions: {
    setSelectedUserChat(user) {
      this.selectedUserChat = user
    },
    cleanSelectedUserChat() {
      this.selectedUserChat = {}
    },
    setChats(chats) {
      this.chats = chats
    },
    setChat(chat) {
      this.chatMessages = chat
    },
    addUnreadMessage() {
      this.unreadMessages += 1
    },
    clearUnreadMessage() {
      this.unreadMessages = 0
    },
    addMessage(message) {
      this.chatMessages.push(message)
    },
    deleteMessage(id) {
      this.chatMessages = this.chatMessages.filter((message) => message.id !== id)
    },
    markMessageAsRead(chatId) {
      const chat = this.chats.find(c => c.id === chatId)
      if (chat) {
        chat.read = true
      }
    },
    reduceUnreadMessages() {
      this.unreadMessages -= 1
    }
  }
})

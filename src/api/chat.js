import ApiBase from '@/api/base'
import { useChatStore } from '@/stores/chatStore'
import { $notify } from '@/composables/useNotify.js'

class ChatApi {
  static async getChats () {
    try {
      let url = ApiBase.baseApiUrl() + '/messages/last-messages'
      let response = await http('get', url, null,
        ApiBase.authHeaders()
      )
      const chatStore = useChatStore()
      chatStore.setChats(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  static async sendMessage (form) {
    try {
      let url = ApiBase.baseApiUrl() + '/messages/send'
      let response = await http('post', url, form,
        ApiBase.authHeaders()
      )
      const chatStore = useChatStore()
      chatStore.addMessage(response.data)
    } catch (error) {
      console.error(error)
      $notify('error', 'message not sent')
    }
  }

  static async getChat (id) {
    try {
      let url = ApiBase.baseApiUrl() + '/messages/between/' + id
      let response = await http('get', url, null,
        ApiBase.authHeaders()
      )
      const chatStore = useChatStore()
      chatStore.setChat(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  static async markMessageRead (id) {
    try {
      let url = ApiBase.baseApiUrl() + '/messages/mark-as-read/' + id
      let response = await http('post', url, null,
        ApiBase.authHeaders()
      )
    } catch (error) {
      console.error(error)
    }
  }

  static async deleteMessage (id) {
    try {
      let url = ApiBase.baseApiUrl() + '/messages/' + id
      let response = await http('delete', url, null,
        ApiBase.authHeaders()
      )
    } catch (error) {
      $notify('error', 'message has not been deleted')
      throw error
    }
  }
}

export default ChatApi

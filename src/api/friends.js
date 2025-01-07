import ApiBase from '@/api/base'
import { useFriendsStore } from '@/stores/friendsStore'
import { $notify } from '@/composables/useNotify.js'

class FriendsApi {

  static async getMyFriends () {
    const friendsStore = useFriendsStore()
    let url = ApiBase.baseApiUrl() + '/friendship/my-friends'
    let response = await http('get', url, null, ApiBase.authHeaders())
    friendsStore.setMyFriends(response.data)
    return response.data
  }
  
  static async getReceivedRequests () {
    const friendsStore = useFriendsStore()
    let url = ApiBase.baseApiUrl() + '/friendship/my-received-requests'
    let response = await http('get', url, null, ApiBase.authHeaders())
    friendsStore.setReceivedRequests(response.data)
    return response.data
  }
  
  static async getSentRequests () {
    const friendsStore = useFriendsStore()
    let url = ApiBase.baseApiUrl() + '/friendship/my-sent-requests'
    let response = await http('get', url, null, ApiBase.authHeaders())
    friendsStore.setSentRequests(response.data)
    return response.data
  }
  
  static async sendFriendRequest (id) {
    let url = ApiBase.baseApiUrl() + '/friendship/send-friend-request'
    let response = await http('post', url, id, ApiBase.authHeaders())
    $notify('success', 'You send friend request')
    return response.data
  }

  static async acceptRequest (id) {
    let url = ApiBase.baseApiUrl() + '/friendship/accept-request'
    let response = await http('post', url, id, ApiBase.authHeaders())
    $notify('success', 'Friend request accept')
    return response.data
  }

  static async unfriendRequest (id) {
    let url = ApiBase.baseApiUrl() + '/friendship/cancel-request'
    let response = await http('delete', url, id, ApiBase.authHeaders())
    $notify('success', 'Unfriend')
    return response.data
  }
  
  static async getFriendsCount () {
    const friendsStore = useFriendsStore()
    let url = ApiBase.baseApiUrl() + '/friendship/friendship-counts'
    let response = await http('get', url, null, ApiBase.authHeaders())
    friendsStore.setFriendsCount(response.data)
    return response.data
  }
}

export default FriendsApi
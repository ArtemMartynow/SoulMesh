import { defineStore } from 'pinia';

export const useFriendsStore = defineStore('friendsStore', {
  state: () => ({
    myFriends: [],
    receivedRequests: [],
    sentRequests: [],
    friendsCount: []
  }),
  actions: {
    setMyFriends(info) {
      this.myFriends = info
    },
    setReceivedRequests(info) {
      this.receivedRequests = info
    },
    setSentRequests(info) {
      this.sentRequests = info
    },
    setFriendsCount(info) {
      this.friendsCount = info
    }
  }
})

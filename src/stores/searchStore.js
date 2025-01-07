import { defineStore } from 'pinia';

export const useSearchStore = defineStore('searchStore', {
  state: () => ({
    users: [],
    isGetUsers: true,
    selectedUser: {},
    isOnFilterSidebar: false,
  }),
  actions: {
    setUsers(info) {
      this.users = info
    },
    usersObtained() {
      this.isGetUsers = false
    },
    setUser(info) {
      this.selectedUser = info
    },
    onFilterSidebar() {
      if (this.isOnFilterSidebar === false) {
        this.isOnFilterSidebar = true
      } else {
        this.isOnFilterSidebar = false
      }
    },
    sentRequest() {
      this.selectedUser.hasPendingRequest = true
    }
  }
})
<template>
  <aside class="slidebar">
    <router-link to="/profile/app-home-page" class="logo">
      <img src="../assets//images/Logo.png" alt="logo">
    </router-link>
    <nav>
      <ul>
        <li>
          <router-link 
            :to="{name: 'AppHomePage'}" 
            class="flex items-center"
          >
            <img src="../assets/images/house-solid.svg" alt="house">
            <span>Home</span> 
          </router-link>
        </li>
        <li>
          <router-link 
            :to="{name: 'Search'}" 
            class="flex items-center" 
          >
            <img src="../assets/images/magnifying-glass-solid.svg" alt="search">
            <span>Search</span>
          </router-link>
        </li>
        <li>
          <router-link 
            :to="{name: 'MyFriends'}" 
            class="flex items-center flex-wrap slidebar-friends"  
          >
            <img src="../assets/images/user-group-solid.svg" alt="search">
            <span class="mr-1">My friends</span>
            <div class="friedns-request">
              <span 
                v-if="$friendsStore.friendsCount.friendsCount" 
                class="mx-1"
              >
                {{ $friendsStore.friendsCount.friendsCount }}
              </span>
              <span 
                v-if="$friendsStore.friendsCount.receivedRequestsCount" 
              >
                + {{ $friendsStore.friendsCount.receivedRequestsCount }}
              </span>
            </div>
          </router-link>
        </li>
        <li>
          <router-link 
            :to="{name: 'Chat'}" 
            class="flex items-center flex-wrap"  
            @click="$chatStore.cleanSelectedUserChat()"
          >
            <img src="../assets/images/message-regular.svg" alt="messages">
            <span>Messages</span>
            <div class="message-count">
              <span class="mx-1">{{ $chatStore.unreadMessages }}</span>
            </div> 
          </router-link>
        </li>
        <li @click="$postsStore.openCreatePost" class="flex items-center">
          <img src="../assets/images/square-plus-regular.svg" alt="user">
            <span>Create</span> 
        </li>
        <li>
          <router-link 
            :to="{name: 'Profile'}"
            class="flex items-center"
          >
          <UserAvatar 
            userType="user" 
            :avatar="$profileStore.profileInfo.avatar"   
          />
            <span>Profile</span> 
          </router-link>
        </li>
      </ul>
    </nav>
    <router-link 
      :to="{name: 'EditProfile'}" 
      class="sidebar__settings"
      @click="$chatStore.cleanSelectedUserChat()"
    >
      <img src="../assets/images/gear-solid.svg" alt="settings">
      <span>Settings</span>
    </router-link>
    <router-link 
      :to="{name: 'Chat'}" 
      class="sidebar__log-out"
      @click="logOut()"
    >
      <img src="../assets/images/arrow-right-from-bracket-solid.svg" alt="logOut">
      <span>Log out</span>
    </router-link>
  </aside>
</template>

<script setup>
import UserAvatar from './UserAvatar.vue'
import ChatApi from '@/api/chat'
import { onMounted } from 'vue'
import { closeWebSocket } from '@/helpers/wsHandler'
import { useChatStore } from '@/stores/chatStore'
import { useProfileStore } from '@/stores/profileStore'

const chatStore = useChatStore()
const profileStore = useProfileStore()

let getUnreadMessagesCount = () => {
  for (let i = 0; i < chatStore.chats.length; i++) {
    let chat = chatStore.chats[i]
    let currentUserId = profileStore.fullProfileInfo.id
    if (!chat.read && chat.sender_id !== currentUserId) {
      chatStore.addUnreadMessage()
    }
  }
}

const logOut = () => {
  closeWebSocket()
  profileStore.logout()
}

onMounted(() => {
  ChatApi.getChats()
  .then(() => {
    chatStore.clearUnreadMessage()
    getUnreadMessagesCount()
  })
})
</script>
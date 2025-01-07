<template>
  <div class="profile" v-if="isLoading === false">
    <div class="profile__header user-header flex justify-between">
      <UserAvatar 
        :avatar="$searchStore.selectedUser.avatar" 
      />
      <div class="profile__info flex flex-wrap justify-between items-center">
        <h2 class="text-2xl">{{ $searchStore.selectedUser.username }}</h2>
        <router-link 
          :to="{name: 'Chat'}"
          class="profile__send-message"
          @click="setChat($searchStore.selectedUser)"
        >Message</router-link>
        <button 
          class="profile__add-friend"
          @click="addFriend($searchStore.selectedUser.id)" 
          v-if="!$searchStore.selectedUser.isFriend && !$searchStore.selectedUser.hasPendingRequest"
        >
          <span>Add to friends</span>
        </button>
        <span 
          v-else-if="$searchStore.selectedUser.isFriend"
          class="profile__your-friend"  
        >
          Your friend
        </span>
        <span 
          v-else-if="$searchStore.selectedUser.hasPendingRequest"
          class="profile__your-friend"  
        >
          request sent
        </span>
        <div class="profile__statistics mt-5">
          <span class="mr-3">{{ $postsStore.userPosts.length }} publications</span>
          <span class="mr-3">{{ $searchStore.selectedUser.total_friends }} followers</span>
        </div>
        <div class="profile__full-name mt-5">
          <span>{{ fullName($searchStore.selectedUser) }}</span>
        </div>
      </div>
    </div>
    <div class="profile__content">
      <h1 v-if="$postsStore.userPosts.length === 0">No posts yet</h1>
      <div class="posts" v-else>
        <div 
          class="post" 
          v-for="posts in $postsStore.userPosts" 
          :key="posts"
          @click="lookPost(posts)"
        >
          <img 
            :src="$mainStore.host + posts.posters[0].image_path" 
            alt="post"
          >
          <img 
            src="../../assets/images/images-regular.svg" 
            alt="images"
            class="post__multiple-images"  
            v-if="posts.posters.length > 1"
          >
          <span class="likes-comments-count">
            <img 
              src="../../assets/images/heart-solid-white.svg" 
              alt="likes"
              class="mr-1"  
            > 
            {{ posts.likesCount }}
            <img 
              src="../../assets/images/comment-solid-white.svg" 
              alt="comments"
              class="mr-1 ml-2"  
            > 
            {{ posts.comments.length }}
          </span>
        </div>
      </div>
    </div>
  </div>
  <img 
    v-else
    src="../../assets/images/circle-notch-solid-green.svg" 
    alt="loading" 
    class="animate-spin w-10 absolute left-1/2 -ml-2.5 top-1/2 -mt-2.5"
  >
  <LookPost v-show="$postsStore.isLookPost === true" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import UserAvatar from '@/components/UserAvatar.vue'
import SearchApi from '@/api/search'
import ProfileApi from '@/api/profile'
import FriendsApi from '@/api/friends'
import { fullName } from '@/helpers/customFunctions'
import LookPost from '@/components/posts/LookPost.vue'
import ChatApi from '@/api/chat'
import { usePostsStore } from "@/stores/postsStore"
import { useSearchStore } from '@/stores/searchStore'
import { useChatStore } from '@/stores/chatStore'

const chatStore = useChatStore()
const postsStore = usePostsStore()
const searchStore = useSearchStore()
const route = useRoute()

let isLoading = ref(true)

const lookPost = (posts) => {
  postsStore.setViewedPost(posts)
  postsStore.openLookPost()
}

const addFriend = (id) => {
  let userId = {
    "addressee_id": id
  }
  console.log(userId);
  FriendsApi.sendFriendRequest(userId)
  searchStore.sentRequest()
}

const setChat = (user) => {
  chatStore.setSelectedUserChat(user)
  ChatApi.getChat(user.id)
}

onMounted(() => {
  const userId = route.params.userId
  SearchApi.getUser(userId)
  ProfileApi.getUserPosts(userId)
  .then(() => {
    isLoading.value = false
  })
})
</script>
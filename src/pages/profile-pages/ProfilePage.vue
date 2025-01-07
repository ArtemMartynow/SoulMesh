<template>
  <div class="profile" v-if="isLoading === false">
    <div class="profile__header flex justify-between">
      <UserAvatar
        :avatar="$profileStore.profileInfo.avatar"   
      />
      <div class="profile__info flex flex-wrap justify-between">
        <h2 class="text-2xl">{{ $profileStore.fullProfileInfo.username }}</h2>
        <router-link 
          :to="{name: 'EditProfile'}"
          class="profile__btn"  
        >
          edit profile
        </router-link>
        <router-link 
          :to="{name: 'EditProfile'}" 
          class="profile__settings"
        >
          <img src="../../assets/images/gear-solid.svg" alt="settings">
        </router-link>
        <router-link 
          :to="{name: 'HomePage'}" 
          class="profile__log-out"
          @click="$profileStore.logout"
        >
          <img src="../../assets/images/arrow-right-from-bracket-solid.svg" alt="logOut">
        </router-link>
        <div class="profile__statistics mt-5">
          <span class="mr-3">{{ $postsStore.myPosts.length }} publications</span>
          <span class="mr-3">{{ $friendsStore.friendsCount.friendsCount }} followers</span>
          <span>{{ $friendsStore.friendsCount.sentRequestsCount }} subscribers</span>
        </div>
        <div class="profile__full-name mt-5">
          <span>{{ fullName($profileStore.fullProfileInfo) }}</span>
        </div>
      </div>
    </div>
    <div class="profile__content">
      <h1 v-if="$postsStore.myPosts.length === 0">No posts yet</h1>
      <div class="posts" v-else>
        <div 
          class="post" 
          v-for="posts in $postsStore.myPosts" 
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
import ProfileApi from '@/api/profile'
import LookPost from '@/components/posts/LookPost.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import FriendsApi from '@/api/friends'
import { fullName } from '@/helpers/customFunctions'
import { ref } from 'vue'
import { usePostsStore } from '@/stores/postsStore'

let postsStore = usePostsStore()

let isLoading = ref(true)

ProfileApi.getPosts()
FriendsApi.getFriendsCount()
.then(() => {
  isLoading.value = false
})

const lookPost = (posts) => {
  postsStore.setViewedPost(posts)
  postsStore.openLookPost()
}
</script>

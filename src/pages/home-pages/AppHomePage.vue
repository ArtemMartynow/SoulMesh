<template>
  <div class="app-home">
    <div 
      class="profile-info flex items-center cursor-pointer" 
      @click="routeProfile"
    >
      <UserAvatar 
        :avatar="$profileStore.profileInfo.avatar"   
      />
      <div class="info ml-2">
        <h3 class="info__username font-bold">{{ $profileStore.fullProfileInfo.username }}</h3>
        <span class="info__first-name">{{ fullName($profileStore.fullProfileInfo) }}</span>
      </div>
    </div>
    <div class="tape">
      <div class="tape__posts">
        <template v-for="post in $postsStore.tape" :key="post.id">
          <TapePost :post="post" />
        </template>
      </div>
    </div>
  </div>
  <LookPost v-show="$postsStore.isLookPost === true" />
</template>

<script setup>
import router from '@/router'
import UserAvatar from '@/components/UserAvatar.vue'
import { fullName } from '@/helpers/customFunctions'
import TapePost from '@/components/tape/TapePost.vue'
import LookPost from '@/components/posts/LookPost.vue'
import ProfileApi from '@/api/profile'

function routeProfile() {
  router.push({name: 'Profile'})
}
ProfileApi.getTape()
</script>
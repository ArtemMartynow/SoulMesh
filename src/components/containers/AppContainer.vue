<template>
  <div class="flex" v-if="$profileStore.isGetProfile === true">
      <Sidebar />
      <router-view />
      <CreatePost />
  </div>
  <img 
    v-else
    src="../../assets/images/circle-notch-solid-green.svg" 
    alt="loading" 
    class="animate-spin w-10 absolute left-1/2 -ml-2.5 top-1/2 -mt-2.5"
  >
</template>

<script setup>
import Sidebar from '../Sidebar.vue'
import CreatePost from '@/components/posts/CreatePost.vue'
import ProfileApi from '@/api/profile'
import FriendsApi from '@/api/friends'
import { onMounted } from 'vue'
import { initWebSocket } from '@/helpers/wsHandler'

onMounted(() => {
  ProfileApi.getProfile(),
  FriendsApi.getFriendsCount()

  initWebSocket()
})
</script>
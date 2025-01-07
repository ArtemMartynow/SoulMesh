<template>
  <div class="user-avatar">
    <img 
      class="w-14 h-14 rounded-full object-cover" 
      src="../assets/images/user-avatar.png" 
      alt="user"
      v-if="isDefaultAvatar"
    >
    <img 
      class="w-14 h-14 rounded-full object-cover" 
      :src="avatarUrl" 
      alt="user"
      v-else
    >
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useMainStore } from '../stores/MainStore'

let mainStore = useMainStore()

const props = defineProps({
  avatar: String,
})

const isDefaultAvatar = computed(() => {
  if (props.avatar === null) {
    return true
  } else {
    return false
  }
})

const avatarUrl = computed(() => {
    return `${mainStore.host}${props.avatar}`
})
</script>
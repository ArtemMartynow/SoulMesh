<template>
  <div class="flex w-full flex-wrap">
    <FriendshipTab />
    <router-view></router-view>
  </div>
</template>

<script>
import FriendshipTab from '../FriendshipTab.vue'

export default {
  name: 'Friendship',
  components: {
    FriendshipTab
  },
}
</script>
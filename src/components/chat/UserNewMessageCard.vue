<template>
  <div class="new-message-modal__user">
    <UserAvatar :avatar="props.user.avatar" />
    <div class="new-message-modal__user_info">
      <h2>{{ props.user.username }}</h2>
      <span>{{ fullName(props.user) }}</span>
    </div>
  </div>
</template>

<script setup>
import { fullName } from '@/helpers/customFunctions'
import UserAvatar from '../UserAvatar.vue'

const props = defineProps({
  user: Object,
})
</script>
<template>
  <div class="flex w-full z-10">
    <ChatSidebar />
    <router-view />
  </div>
</template>

<script setup>
import ChatSidebar from '../ChatSidebar.vue'
</script>
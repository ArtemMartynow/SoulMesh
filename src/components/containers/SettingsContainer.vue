<template>
  <div class="flex w-full">
    <SettingsSidebar />
    <router-view></router-view>
  </div>
</template>

<script>
import SettingsSidebar from '@/components/SettingsSidebar.vue'

export default {
  name: 'Settings',
  components: {
    SettingsSidebar
  },
}
</script>
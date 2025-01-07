<template>
  <aside class="settings-slidebar">
    <h2 class="text-3xl">Settings</h2>
    <nav>
      <ul>
        <li>
          <router-link 
            :to="{name: 'EditProfile'}" 
            class="flex items-center settings-slidebar__link"
          >
            <img src="../assets/images/user-regular.svg" alt="user">
            <span>Edit profile</span> 
          </router-link>
        </li>
        <li>
          <router-link 
            :to="{name: 'Security'}" 
            class="flex items-center settings-slidebar__link"
          >
            <img src="../assets/images/lock-solid.svg" alt="notification">
            <span>Security</span> 
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'SettingsSidebar'
}
</script>
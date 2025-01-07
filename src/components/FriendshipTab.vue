<template>
  <nav class="friendship-sidebar">
    <ul>
      <li>
        <router-link 
          :to="{name: 'MyFriends'}" 
          class="flex justify-center"
          exactActiveClass="flex justify-center active-link"
        >
        My friends {{ $friendsStore.friendsCount.friendsCount }}
        </router-link>
      </li>
      <li class="friendship-sidebar__center-link">
        <router-link 
          :to="{name: 'ReceivedRequests'}" 
          class="flex justify-center"
          exactActiveClass="flex justify-center active-link"
        >
          Received requests {{ $friendsStore.friendsCount.receivedRequestsCount }}
        </router-link>
      </li>
      <li>
        <router-link 
          :to="{name: 'SentRequesrs'}" 
          class="flex justify-center"
          exactActiveClass="flex justify-center active-link"
        >
          Sent requests {{ $friendsStore.friendsCount.sentRequestsCount }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'FriendshipTab'
}
</script>
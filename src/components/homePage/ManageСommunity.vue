<template>
  <div class="manage-community margins" id="manage-community">
    <div class="title">
      <h2>
        Manage your entire community <br> 
        in a single system
      </h2>
      <p>
        Who is Nextcent suitable for?
      </p>
    </div>
    <CommunityCards />
  </div>
</template>

<script>
import CommunityCards from './CommunityCards.vue';

export default {
  name: 'ManageCommunity',
  components: {
    CommunityCards
  }
}
</script>
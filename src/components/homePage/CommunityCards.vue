<template>
  <div 
    class="manage-community__cards flex justify-between flex-wrap mt-4">
    <div 
      class="manage-community__card"
      v-for="icon in cards"
      :key="icon"  
    >
      <div class="relative w-16 h-14 mx-auto">
        <img 
          src="../../assets/images/Rectangle_157.png" 
          alt="icon"
          class="absolute bottom-0 right-0"
        >
        <img 
          :src="icon.src" 
          alt="icon"
          class="absolute"
        >
      </div>
      <h2 class="text-3xl w-60 mx-auto font-bold mt-4 mb-2">
        {{ icon.title }}
      </h2>
      <p class="text-sm">
        Our membership management software provides full 
        automation of membership renewals and payments
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommunityCards',
  data: () => ({
    cards: [
      {
        src: '/src/assets/images/Icon.png', 
        title: 'Membership Organisations', 
      },
      {
        src: '/src/assets/images/Icon_(3).png', 
        title: 'National Associations', 
      },
      {
        src: '/src/assets/images/Icon_(1).png', 
        title: 'Clubs And Groups', 
      }
    ]
  }),
}
</script>
<template>
  <div class="achievements margins" id="achievements">
    <div class="achievements__content">
      <h2 class="text-4xl font-semibold">
        Helping a local <br> 
        <span>business reinvent itself</span>
      </h2>
      <p>
        We reached here with our hard work and dedication
      </p>
    </div>
    <div class="achievements__calculations">
      <div 
        class="achievements__statistics"
        v-for="el in achievements"  
        :key="el"
      >
        <img :src="el.img" alt="icon">
        <div>
          <h3 class="text-xl font-bold">
            {{ el.number }}
          </h3>
          <p>
            {{ el.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Achievements',
  data: () => ({
    achievements: [
      {
        img: '/src/assets/images/Icon_(2).png',
        number: '2,245,341',
        name: 'Members'
      },
      {
        img: '/src/assets/images/Icon_(6).png',
        number: '46,328',
        name: 'Clubs'
      },
      {
        img: '/src/assets/images/Icon_(5).png',
        number: '828,867',
        name: 'Event Bookings'
      },
      {
        img: '/src/assets/images/Icon_(4).png',
        number: '1,926,436',
        name: 'Payments'
      }
    ]
  }),
}
</script>
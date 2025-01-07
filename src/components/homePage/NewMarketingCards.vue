<template>
  <div class="new-marketing__cards flex justify-between flex-wrap mt-4">
    <div 
      class="new-marketing__card"
      v-for="card in cards"
      :key="card"  
    >
      <img :src="card.img" alt="image">
      <div class="new-marketing__card-content">
        <p class="text-xl">
          {{ card.text }}
        </p>
        <a href="#">Readmore <img src="../../assets/images/right.png" alt="arrow"></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewMarketingCards',
  data: () => ({
    cards: [
      {
        img: '/src/assets/images/image_18.png',
        text: 'Creating Streamlined Safeguarding Processes with OneRen'
      },
      {
        img: '/src/assets/images/image_19.png',
        text: 'What are your safeguarding responsibilities and how can you manage them?'
      },
      {
        img: '/src/assets/images/image_20.png',
        text: 'Revamping the Membership Model with Triathlon Australia'
      }
    ]
  })
}
</script>
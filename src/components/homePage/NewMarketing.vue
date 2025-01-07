<template>
  <div class="new-marketing margins">
    <div class="title">
      <h2>
        Caring is the new marketing
      </h2>
      <p class="new-marketing__subtitle">
        The Nexcent blog is the best place to read about the 
        latest membership insights, trends and more. See who's 
        joining the community, read about how our community are 
        increasing their membership income and lot's more.
      </p>
    </div>
    <NewMarketingCards />
  </div>
</template>

<script>
import NewMarketingCards from './NewMarketingCards.vue';

export default {
  name: 'NewMarketing',
  components: {
    NewMarketingCards
  }
}
</script>
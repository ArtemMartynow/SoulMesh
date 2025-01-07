<template>
  <div class="faq">
    <div class="faq__container">
      <img
        class="w-3/6 h-full faq__image" 
        src="../../assets/images/Image.png" 
        alt="image"
      >
      <Questions />
    </div>
  </div>
</template>

<script>
import Questions from '@/components/faq/Questions.vue';

export default {
  name: 'Faq',
  components: {
    Questions
  }
}
</script>
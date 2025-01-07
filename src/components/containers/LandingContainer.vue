<template>
  <div class="overflow-y-scroll h-screen">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>
  
<script>
import Header from '@/components/AppHeader.vue';
import Footer from '@/components/AppFooter.vue';

export default {
  name: 'LandingContainer',
  components: {
    Header,
    Footer
  }
}
</script>
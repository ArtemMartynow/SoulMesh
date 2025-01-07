<template>
  <PreviewContainer />
  <OurClients />
  <ManageСommunity />
  <Pixelgrade />
  <Achievements />
  <Calender />
  <Customer />
  <NewMarketing />
  <DemoGame />
</template>

<script setup>
import PreviewContainer from '@/components/homePage/PreviewContainer.vue';
import OurClients from '@/components/homePage/OurClients.vue';
import ManageСommunity from '@/components/homePage/ManageСommunity.vue';
import Pixelgrade from '@/components/homePage/Pixelgrade.vue';
import Achievements from '@/components/homePage/Achievements.vue';
import Calender from '@/components/homePage/Calendar.vue';
import Customer from '@/components/homePage/Customer.vue';
import NewMarketing from '@/components/homePage/NewMarketing.vue';
import DemoGame from '@/components/homePage/DemoGame.vue';
import { useLandingPageStore } from '@/stores/landingPageStore.js';

const landingPageStore = useLandingPageStore()

window.addEventListener('scroll', () => {
  if(window.scrollY >= 0) {
    landingPageStore.scroll = 1
  }
  if(window.scrollY >= 700) {
    landingPageStore.scroll = 2
  }
  if(window.scrollY >= 1080) {
    landingPageStore.scroll = 3
  }
  if(window.scrollY >= 2040) {
    landingPageStore.scroll = 4
  }
  if(window.scrollY >= 2860) {
    landingPageStore.scroll = 5
  }
  if(landingPageStore.faq === true) {
    landingPageStore.scroll = 6
  }
})
</script>@/stores/landingPageStore.js

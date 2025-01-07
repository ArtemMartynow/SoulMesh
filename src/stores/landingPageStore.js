import { defineStore } from 'pinia';

export const useLandingPageStore = defineStore('landingPageStore', {
  state: () => ({
    scroll: 0,
    isFaqPageEnabled: false
  }),
  actions: {
    scrollToTop() {
      window.scrollTo(0,0)
    }
  }
})

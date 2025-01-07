<template>
  <header>
    <router-link
      to="/"
      @click="scrollToHome"
    >
      <img src="../assets/images/Logo.png" alt="logo">
    </router-link>
    <nav class="header__nav">
      <router-link
        v-for="nav in navigation"
        :key="nav.id"
        :to="nav.link"
        @click="scroll(nav.scroll, nav.id, nav.isFaq)"
        :class="landingPageStore.scroll == nav.id ? 'active' : ''"
      >
        {{ nav.name }}
      </router-link>
    </nav>
    <div class="header__registration-login">
      <router-link
        to="/auth/login"
        @click="landingPageStore.scrollToTop"
        class="header__login"
      >Login</router-link>
      <router-link
        to="/auth/sign-up"
        @click="landingPageStore.scrollToTop"
        class="btn header__sign-up"
        >Sign up</router-link>
    </div>
  </header>
</template>

<script setup>
import { useLandingPageStore } from '@/stores/landingPageStore'

const landingPageStore = useLandingPageStore()

let navigation = [
  {
    name: 'Home',
    link: '/',
    id: 1,
    scroll: 0,
    isFaq: false
  },
  {
    name: 'Service',
    link: '/',
    id: 2,
    scroll: 700,
    isFaq: false
  },
  {
    name: 'Feature',
    link: '/',
    id: 3,
    scroll: 1080,
    isFaq: false
  },
  {
    name: 'Product',
    link: '/',
    id: 4,
    scroll: 2040,
    isFaq: false
  },
  {
    name: 'Testimonial',
    link: '/',
    id: 5,
    scroll: 2860,
    isFaq: false
  },
  {
    name: 'FAQ',
    link: '/faq',
    id: 6,
    scroll: 0,
    isFaq: true
  }
]

function scrollToHome() {
  window.scrollTo(0,0)
  landingPageStore.scroll = 1
  landingPageStore.faq = false
}

function scroll(scroll, id, isFaq) {
  window.scrollTo(0,0)
  setTimeout(() => {
    window.scrollTo(scroll,scroll)
  }, 1)
  landingPageStore.isFaqPageEnabled = isFaq
  landingPageStore.scroll = id
}
</script>

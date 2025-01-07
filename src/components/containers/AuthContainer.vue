<template>
  <div class="overflow-y-scroll h-screen">
    <header class="relative">
      <router-link to="/" class="mx-auto"><img  src="../../assets/images/Logo.png" alt="logo"></router-link>
    </header>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'AuthContainer'
}
</script>
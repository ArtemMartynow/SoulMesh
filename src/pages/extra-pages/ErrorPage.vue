<template>
  <div class="error-page">
    <div class="error-page__content">
      <h1><span>404</span> error</h1>
      <router-link :to="{name: 'AppHomePage'}">Back</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
}
</script>
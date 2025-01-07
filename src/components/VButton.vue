<template>
  <button>
    <span v-if="isLoading !== true">
      <slot ></slot>
    </span>
    <img 
      v-else
      src="../assets/images/circle-notch-solid.svg" 
      alt="loading" 
      class="animate-spin w-6 absolute left-1/2 -ml-2.5 top-1/2 -mt-2.5"
    >
  </button>
</template>

<script>
export default {
  name: 'VButton',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
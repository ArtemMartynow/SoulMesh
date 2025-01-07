<template>
  <div class="info ml-2">
    <h3 class="info__username font-bold">{{ username }}</h3>
    <span class="info__first-name">{{ firstName }}</span>
    <span class="info__last-name ml-1">{{ lastName }}</span>
    <span class="info__last-name ml-1" v-show="birthDay !== null">
      , {{ calcUserYears(birthDay) }} years
    </span>
  </div>
</template>

<script setup>
import useDate from '@/composables/useDate'

const props = defineProps({
  username: String,
  firstName: String,
  lastName: String,
  birthDay: String
})

const calcUserYears = useDate.calcUserYears
</script>
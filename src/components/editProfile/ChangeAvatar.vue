<template>
  <form class="change-photo">
    <div class="photo flex">
      <label for="photo">
        <img
          src="../../assets/images/user-avatar.png" 
          alt="avatar"
          class="h-14 w-14 mr-4 cursor-pointer rounded-full object-cover" 
          v-if="newAvatar === '0'"
        >
        <img
          :src="$profileStore.fullProfileInfo.avatar" 
          alt="avatar"
          class="h-14 w-14 mr-4 cursor-pointer rounded-full object-cover" 
          v-if="newAvatar === '' && newAvatar !== '0'"
        >
        <img
          :src="$mainStore.host + newAvatar" 
          alt="avatar"
          class="h-14 w-14 mr-4 cursor-pointer rounded-full" 
          v-if="newAvatar !== '' && newAvatar !== '0'"
          @error="newAvatar = '0'"
        >
      </label>
      <div class="user-info">
        <h2 class="user-info__username font-semibold text-lg">
          {{ $profileStore.fullProfileInfo.username }}
        </h2>
        <div class="user-info__fullname text-slate-700">
          <span class="user-info__last-name">
            {{ fullName($profileStore.fullProfileInfo) }}
          </span>
        </div>
      </div>
    </div>
    <div class="change-photo__btn">
      <input 
        type="file" 
        id="photo" 
        class="hidden" 
        @change="change"
        accept="image/*"   
      >
      <label for="photo">Change photo</label>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import ProfileApi from '@/api/profile'
import { $notify } from '@/composables/useNotify.js'
import { fullName } from '@/helpers/customFunctions'
import { useProfileStore } from '@/stores/profileStore'
import { useMainStore } from '@/stores/mainStore'

const profileStore = useProfileStore()
const mainStore = useMainStore()

let photo = ref(null)
let newAvatar = ref('')

if (
    profileStore.fullProfileInfo.avatar === mainStore.host + null ||
    profileStore.fullProfileInfo.avatar === mainStore.host + undefined
  ) {
  newAvatar.value = '0'
}

function change(e) {
  photo.value = e.target.files[0]
  let form = new FormData()
  form.append('avatar', photo.value)
  ProfileApi.updateProfileAvatar(form)
  .then((response) => {
    newAvatar.value = response.user.avatar
    profileStore.fullProfileInfo.avatar = mainStore.host + newAvatar.value
  })
  .catch(error => {
    console.log(error)
    $notify('error', error.errors.image)
  })
}
</script>
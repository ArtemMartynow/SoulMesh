<template>
  <div class="edit-profile">
    <div class="edit-profile__container">
      <h1 class="text-3xl font-medium">Edit profile</h1>
      <ChangeAvatar />
      <div class="about-me">
        <h2 class="text-lg font-semibold">About me</h2>
        <EditProfileForm />
      </div>
    </div>
  </div>
</template>

<script>
import EditProfileForm from '@/components/editProfile/EditProfileForm.vue'
import ChangeAvatar from '@/components/editProfile/ChangeAvatar.vue'

export default {
  name: 'EditProfile',
  components: {
    EditProfileForm,
    ChangeAvatar
  }
}
</script>
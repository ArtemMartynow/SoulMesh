<template>
  <div class="security">
    <div class="security__container">
      <h1 class="text-3xl font-medium">Security</h1>
      <div class="change-password">
        <h2 class="text-lg font-semibold">Change password</h2>
        <ChangePasswordForm />
      </div>
    </div>
  </div>
</template>

<script>
import ChangePasswordForm from '@/components/security/ChangePasswordForm.vue';

export default {
  name: 'Security',
  components: {
    ChangePasswordForm
  }
}
</script>
<template>
  <div class="confirmation-modal">
    <div class="confirmation-modal__window">
      <h2 class="text-2xl mt-5">{{ title }}</h2>
      <p class="text-sm mb-7">{{ message }}</p>
      <button 
        :class="props.buttonTextColor" 
        @click="confirmAction"
      >{{ buttonText }}</button>
      <button @click="$emit('cancel', false)">Cancel</button>
    </div>
    <div class="modal__overplay"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  buttonText: {
    type: String,
    required: true
  },
  buttonTextColor: {
    type: String,
    required: true
  }
})

const emitAction = defineEmits(['cancel', 'confirmAction'])

const confirmAction = () => {
  emitAction('confirmAction', confirmAction)
}
</script>
<template>
  <div class="select" ref="dropDown">
    <div 
      class="select__option"
      @click="isDropDownVisible = true"
    >
      {{ mappedSelectedOption }}
    </div>
    <div 
      class="option__wrapper"
      v-if="isDropDownVisible"
    >
      <div 
        class="option"
        v-for="(option, index) in props.options"
        :key="index"  
        @click="toggleOptionSelect(option)"
      >
        {{ option.name || option }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeMount } from 'vue'

const dropDown = ref(null)

const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  noValue: String,
  modelValue: {
    default: null
  },
})

const mainEmit = defineEmits(['update:modelValue'])

const selectedOption = ref(null)
const isDropDownVisible = ref(false)

const mappedSelectedOption = computed(() => {
  return (selectedOption.value?.name || props.noValue)
})

const toggleOptionSelect = (option) => {
  selectedOption.value = option
  mainEmit('update:modelValue', option.value)
  isDropDownVisible.value = false
}

const closeDropDown = () => {
  isDropDownVisible.value = false
}

onMounted(() => {
  window.addEventListener('click', closeDropDown.bind(), true)
})

onBeforeMount(() => {
  window.removeEventListener('click', closeDropDown)
})
</script>
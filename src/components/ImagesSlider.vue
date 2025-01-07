<template>
  <div 
    class="look-post__images"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"   
  >
    <template 
      v-for="(image, index) in props.images" 
      :key="index"
    >
      <img 
        :src="$mainStore.host + image.image_path" 
        alt="image" 
        :style="index === 0 ? {marginLeft: slide + '%'} : ''"
      >
    </template>
    <div
      class="look-post__images_dots"
      v-if="imagesLength > 1"
    >
      <span
        class="look-post__images_dot"
        v-for="(images,index) in props.images"
        :key="index"
        :class="{ active: index === selectedImage - 1 }"
      ></span>
    </div>
    <div 
      class="modal__window_arrows"
    >
      <div 
        :class="isFirstSlide ? 'arrow-active' : 'arrow'"
        @click="prevImage"
      ><span></span></div>
      <div 
        :class="isLastSlide ? 'arrow-active rotate-180' : 'arrow rotate-180'"
        @click="nextImage"
      ><span></span></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue"

const props = defineProps({
  images: {
    type: Array,
    required: true,
    default: () => []
  }
})

const imagesLength = computed(() => props.images.length)

let slide = ref(0)
let selectedImage = ref(1)
let isFirstSlide = computed(() => selectedImage.value === 1)
let isLastSlide = computed(() => selectedImage.value === imagesLength.value)
const scrollImageWidth = 100
let startX = 0
let currentX = 0

const resetImages = () => {
  selectedImage.value = 1
  slide.value = 0
}

watch(() => props.images, () => {
  resetImages()
})

const prevImage = () => {
  if (selectedImage.value > 1) {
    slide.value += scrollImageWidth
    selectedImage.value -= 1
  }
}

const nextImage = () => {
  if (selectedImage.value < imagesLength.value) {
    slide.value -= scrollImageWidth
    selectedImage.value += 1
  }
}

const handleTouchStart = (event) => {
  startX = event.touches[0].clientX
}

const handleTouchMove = (event) => {
  currentX = event.touches[0].clientX
}

const handleTouchEnd = () => {
  const deltaX = currentX - startX
  if (deltaX > 50) {
    prevImage()
  } else if (deltaX < -50) {
    nextImage()
  }
  startX = 0
  currentX = 0
}
</script>

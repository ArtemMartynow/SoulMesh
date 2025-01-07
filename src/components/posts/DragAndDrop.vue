<template>
    <div 
    class="modal__window-content" 
    @dragover.prevent="onDragOver" 
    @dragleave.prevent="onDragLeave" 
    @drop.prevent="onDrop"
  >
    <div v-if="!isDragging">
      <img 
        src="../../assets/images/add-post.png" 
        alt="image"
      >
      <p>Drag photos and videos here</p>
      <div class="add-post__btn">
        <input 
          type="file" 
          id="photo" 
          class="hidden" 
          @change="onFileSelect" 
          accept="image/*"   
          multiple
        >
        <label for="photo">Select from computer</label>
      </div>
    </div>
    <div class="mt-48 text-3xl" v-else>
      <span>Drop images here</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

const props = defineProps({
  images: Array,
  formFiles: Array
})
const emitFile = defineEmits(['updatePublicationStage'])

const isDragging = ref(false)
const onDragOver = (event) => {
  isDragging.value = true
  event.dataTransfer.dropEffect = 'copy'
}

const onDragLeave = () => {
  isDragging.value = false
}

const onDrop = (event) => {
  isDragging.value = false
  const files = event.dataTransfer.files
  if (files.length === 0) return
  for (let i = 0; i < files.length; i++) {
    if (files[i].type.split('/')[0] !== 'image') continue
    if (!props.images.some((e) => e.name === files[i].name)) {
      props.images.push({ name: files[i].name, url: URL.createObjectURL(files[i]) })
    }
  }
  emitFile('updatePublicationStage', 2)
}

const onFileSelect = (event) => {
  const files = event.target.files
  if (files.length === 0) return
  for (let i = 0; i < files.length; i++) {
    if (files[i].type.split('/')[0] !== 'image') continue
    if (!props.images.some((e) => e.name === files[i].name)) {
      props.images.push({ url: URL.createObjectURL(files[i]) })
      props.formFiles.push(files[i])
    }
  }
  emitFile('updatePublicationStage', 2)
}
</script>
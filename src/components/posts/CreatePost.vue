<template>
  <form 
    v-if="$postsStore.isCreatePost === true" 
    class="modal open"
  >
    <div class="modal__window" v-if="publicationStage === 1">
      <h1 class="text-xl">Create post</h1>
      <DragAndDrop
        :images="images" 
        :formFiles="formFiles"
        @updatePublicationStage="(stage) => publicationStage = stage"
      />
    </div>
    <div 
      class="modal__window" 
      v-else-if="publicationStage === 2"
    >
      <div class="modal__window-header flex justify-between">
        <img 
          src="../../assets/images/Right.png" 
          alt="arrow"
          class="rotate-180 cursor-pointer h-8"
          @click="resetImages"
        >
        <span @click="publicationStage = 3">Next</span>
      </div>
      <div class="modal__window-content-second-stage">
        <div class="images" :style="{marginLeft: slideWidth + 'px'}">
          <div class="images__image" v-for="(image, index) in images" :key="index">
            <img :src="image.url" alt="image">
          </div>
        </div>
        <div 
          class="modal__window_arrows"
          v-show="images.length >= 2"  
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
        <div class="mini-image-list">
          <div :class="!isShowSelectedImages ? 'hidden' : 'selected-images__all-images'">
            <div 
              class="selected-images__all-image" 
              v-for="(image, index) in images" 
              :key="index" :class="{ active: index === selectedImage - 1 }"
            >
              <div class="selected-images__all-image_close">
                <img 
                  src="../../assets/images/plus-solid.svg" 
                  alt="close" 
                  @click="isDeleteImage = true"
                >
                <ConfirmationModal 
                  v-if="isDeleteImage === true" 
                  :title="'Discard photo?'"
                  :message="'This will remove the photo from your post.'"
                  :buttonText="'Discard'"
                  :buttonTextColor="'text-red-600'"
                  @confirmAction="deleteImage(index)"
                  @cancel="(n) => isDeleteImage = n"
                />
              </div>
              <img @click="scrollSelectedImage(index)" :src="image.url" alt="image">
            </div>
            <div class="show-images__add-image">
              <input 
                type="file" 
                id="add-image" 
                class="hidden" 
                @change="addNewFile" 
                accept="image/*"   
                multiple
              >
              <label for="add-image">
                <img src="../../assets/images/plus-solid.svg" alt="plus">
              </label>
            </div>
          </div>
        </div>
        <div class="select-images" @click="showSelectedImages">
          <img src="../../assets/images/images-regular.svg" alt="icon">
        </div>
        <div class="modal__window-dots" v-if="images.length > 1">
          <span
            class="modal__window-dots_dot"
            v-show="images.length >= 2"
            v-for="index in images.length"
            :key="index"
            :class="{ active: index === selectedImage }"
            @click="circleScroll(index)"
          ></span>
        </div>
      </div>
    </div>
    <div 
      class="modal__window-third-stage" 
      v-else-if="publicationStage === 3"
    >
      <div class="modal__window-header flex justify-between">
        <img 
          src="../../assets/images/Right.png" 
          alt="arrow"
          class="rotate-180 cursor-pointer h-8"
          @click="publicationStage = 2"
        >
        <span>Create new post</span>
        <span @click="isSharePost = true">Share</span>
      </div>
      <div class="modal__window-content-third-stage">
        <div class="images" :style="{marginLeft: slideWidth + 'px'}">
          <div class="images__image" v-for="(image, index) in images" :key="index">
            <img :src="image.url" alt="image">
          </div>
        </div>
        <div 
          class="modal__window_arrows"
          v-show="images.length >= 2"  
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
        <div class="modal__window-dots" v-if="images.length > 1">
          <span
            class="modal__window-dots_dot"
            v-show="images.length >= 2"
            v-for="index in images.length"
            :key="index"
            :class="{ active: index === selectedImage }"
            @click="circleScroll(index)"
          ></span>
        </div>
      </div>
      <div :class="commentError === '' ? 'modal__window-description' : 'modal__window-description_error'">
        <div class="modal__window-description_user-info">
          <div class="modal__window-description_photo">
            <UserAvatar 
              :avatar="$profileStore.profileInfo.avatar"   
            />
          </div>
          <h2 class="modal__window-description_username font-semibold text-lg">
            {{ $profileStore.fullProfileInfo.username }}
          </h2>
        </div>
        <span>{{ commentError }}</span>
        <textarea 
          v-model="postDescription"  
          placeholder="Write a caption" 
          maxlength="200"
          @input="clearCommentError()"
        ></textarea>
      </div>
    </div>
    <div class="modal__overplay" @click="$postsStore.closeCreatePost(resetImages)"></div>
  </form>
  <ConfirmationModal 
    v-if="isSharePost === true"
    :title="'Share this post?'"
    :message="'Share.'"
    :buttonText="'Share'"
    :buttonTextColor="'text-lime-600'"
    @confirmAction="addPost()"
    @cancel="(n) => isSharePost = n"
  />
</template>

<script setup>
import { ref, computed } from "vue"
import ConfirmationModal from "../ConfirmationModal.vue"
import UserAvatar from '@/components/UserAvatar.vue'
import ProfileApi from '@/api/profile'
import DragAndDrop from "./DragAndDrop.vue"
import { usePostsStore } from "@/stores/postsStore"

let postsStore = usePostsStore()
 
let publicationStage = ref(1) 
let images = ref([])
let imagesLength = computed(() => images.value.length)
let slideWidth = ref(0)
let selectedImage = ref(1)
let isFirstSlide = computed(() => selectedImage.value === 1)
let isLastSlide = computed(() => selectedImage.value === imagesLength.value)
let isShowSelectedImages = ref(false)
let postDescription = ref('')
let formFiles = ref([])
const scrollImageWidth = 400
let isDeleteImage = ref(false)
let isSharePost = ref(false)
let commentError = ref('')

const resetImages = () => {
  publicationStage.value = 1
  images.value = []
  selectedImage.value = 1
  slideWidth.value = 0
}

const addNewFile = (event) => {
  const files = event.target.files
  if (files.length === 0) return
  for (let i = 0; i < files.length; i++) {
    if (files[i].type.split('/')[0] !== 'image') continue
    if (!images.value.some((e) => e.name === files[i].name)) {
      images.value.push({ url: URL.createObjectURL(files[i]) })
      formFiles.value.push(files[i])
      selectedImage.value = images.value.length
      slideWidth.value = (selectedImage.value - 1) * -scrollImageWidth
      imagesLength.value = images.value.length
    }
  }
}

const deleteImage = (index) => {
  images.value.splice(index, 1)
  if (images.value.length === 0) publicationStage.value = 1
  if (images.value.length < selectedImage.value) {
    slideWidth.value += scrollImageWidth
    selectedImage.value += -1
  }
  formFiles.value.splice(index, 1)
  isDeleteImage.value = false
}

const prevImage = () => {
  if (selectedImage.value === 1) return
  slideWidth.value += scrollImageWidth
  selectedImage.value -= 1
}

const nextImage = () => {
  if (selectedImage.value === imagesLength.value) return
  slideWidth.value += -scrollImageWidth
  selectedImage.value += 1
}

const scrollSelectedImage = (index) => {
  slideWidth.value = 0
  selectedImage.value = index + 1
  if (selectedImage.value === 1) {
    slideWidth.value = 0
  } else {
    slideWidth.value = selectedImage.value * -scrollImageWidth + scrollImageWidth
  }
}

const circleScroll = (index) => {
  scrollSelectedImage(index - 1)
}

const showSelectedImages = () => {
  if (isShowSelectedImages.value === true) return isShowSelectedImages.value = false
  if (isShowSelectedImages.value === false) return isShowSelectedImages.value = true
}

const addPost = () => {
  let form = new FormData()
  for (let i = 0; i < formFiles.value.length; i++) {
    form.append('posters', formFiles.value[i])
  }
  form.append('content', postDescription.value)
  ProfileApi.addPost(form)
  .then(() => {
    postDescription.value = ''
    formFiles.value = []
    isSharePost = false
    resetImages()
    ProfileApi.getPosts()
    postsStore.closeCreatePost()
  })
  .catch(error => {
    console.log(error)
    isSharePost.value = false
    commentError.value = error.errors.content
  })
}

const clearCommentError = () => {
  commentError.value = ''
}
</script>

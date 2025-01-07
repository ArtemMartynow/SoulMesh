<template>
  <div class="tape__post" v-if="props.post.user.id !== $profileStore.profileInfo.id">
    <div class="tape__user-avatar">
      <router-link :to="{name: 'userProfile', params: {userId: props.post.user.id}}">
        <UserAvatar 
          :avatar="props.post.user.avatar" 
        />
        <span class="font-semibold">
          {{ props.post.user.username }}
        </span>
      </router-link>
      <span class="mx-1">•</span>
      <span>
        {{ formatPostDate(props.post.createdAt) }}
        {{ formatTimeDate(props.post.createdAt) }}
      </span> 
    </div>
    <ImagesSlider 
      :images="props.post.posters" 
    />
    <div class="tape__likes-comments">
      <img 
        src="../../assets/images/heart-regular.svg" 
        alt="like"
        @click="likePost(props.post.id)"  
        v-if="props.post.likedByMe === 0"
      >
      <img 
        src="../../assets/images/heart-solid.svg" 
        alt="like"
        @click="likePost(props.post.id)"
        v-else
      >
      <img 
        src="../../assets/images/comment-regular.svg" 
        alt="comments"
        @click="lookPost(props.post)"
      >
    </div>
    <div class="tape__likes-count">
      <span class="font-semibold">{{ props.post.likesCount }} likes</span>
      <span class="font-semibold ml-1">{{ props.post.comments.length }} comments</span>
    </div>
    <div class="tape__author-comment">
      <p v-if="showFullComment">
        <span class="font-semibold mr-2">{{ props.post.user.username }}</span>
        {{ props.post.content }}
      </p>
      <p v-else>
        <span class="font-semibold mr-2">{{ props.post.user.username }}</span>
        {{ truncatedComment }}
        <span v-if="isCommentTruncated" @click="toggleComment" class="tape__author-comment_more">...more</span>
      </p>
    </div>
    <div class="tape__add-comments">
      <textarea 
        v-model="comment" 
        placeholder="Add a comment…"
      ></textarea>
      <button @click="addComment(props.post.id)">Post</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { formatPostDate } from '@/helpers/customFunctions'
import { formatTimeDate } from '@/helpers/customFunctions'
import ImagesSlider from '../ImagesSlider.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import ProfileApi from '@/api/profile'
import { usePostsStore } from '@/stores/postsStore'
import { useSearchStore } from '@/stores/searchStore'
import { useProfileStore } from '@/stores/profileStore'

let postsStore = usePostsStore()
let searchStore = useSearchStore()
let profileStore = useProfileStore()

const props = defineProps({
  post: Object
})

const showFullComment = ref(false)
const commentLimit = 80
let comment = ref('')

const isCommentTruncated = computed(() => {
  return props.post.content.length > commentLimit
})

const truncatedComment = computed(() => {
  return isCommentTruncated.value ? props.post.content.substring(0, commentLimit) : props.post.content
})

const toggleComment = () => {
  showFullComment.value = !showFullComment.value
}

const likePost = (id) => {
  let form = {
    post_id: id
  }
  postsStore.setViewedPost(props.post)
  if (props.post.likedByMe === 0) {
    ProfileApi.addLike(form)
    .then(() => {
      postsStore.toggleLikeByMe(1)
      postsStore.toggleLike(1)
    })
  } else {
    ProfileApi.deleteLike(form)
    .then(() => {
      postsStore.toggleLikeByMe(0)
      postsStore.toggleLike(0)
    })
  }
}

const lookPost = (posts) => {
  postsStore.setViewedPost(posts)
  postsStore.openLookPost()
  searchStore.setUser(posts.user)
}

const addComment = (id) => {
  let form = {
    post_id: id,
    text: comment.value
  }
  ProfileApi.addComment(form)
  .then((response) => {
    comment.value = ''
    let newComment = {
      author: {
        avatar: profileStore.profileInfo.avatar,
        id: response.new_comment.user_id,
        username: profileStore.fullProfileInfo.username
      },
      createdAt: response.new_comment.createdAt,
      id: response.new_comment.id,
      text: response.new_comment.text
    }
    postsStore.addComment(newComment)
  })
}
</script>
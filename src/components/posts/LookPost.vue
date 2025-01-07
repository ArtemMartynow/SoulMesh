<template>
  <div class="look-post">
    <div :class="isShowComments ? 'look-post__window_show-comments' : 'look-post__window'">
      <ImagesSlider
        :images="$postsStore.viewedPost.posters"  
      />
      <div class="look-post__comments">
        <div class="look-post__info-user">
          <div class="flex items-center">
            <router-link 
              :to="{
                name: 'userProfile', 
                params: {userId: $postsStore.viewedPost.user_id}
              }"
              @click="closePost()"  
            >
              <UserAvatar 
                :avatar="$profileStore.profileInfo.avatar"   
                v-if="$postsStore.viewedPost.user_id === $profileStore.fullProfileInfo.id" 
              />
              <UserAvatar 
                :avatar="$searchStore.selectedUser.avatar" 
                v-else 
              />
            </router-link>
            <h3 
              v-if="$postsStore.viewedPost.user_id === $profileStore.fullProfileInfo.id"
            >
              {{ $profileStore.fullProfileInfo.username }}
            </h3>
            <h3 v-else>{{ $searchStore.selectedUser.username }}</h3>
          </div>
          <img
            src="../../assets/images/trash-can-solid.svg" 
            alt="delete"
            v-if="$profileStore.fullProfileInfo.id === $postsStore.viewedPost.user_id"  
            @click="isDeletePost = true"
          >
        </div>
        <div class="look-post__user-comments">
          <div 
            class="look-post__user-comment justify-between" 
            v-for="comment in $postsStore.viewedPost.comments" 
            :key="comment"
          >
            <div class="flex text-left">
              <router-link 
                :to="comment.author.id === $profileStore.profileInfo.id 
                  ? { name: 'Profile' }
                  : { name: 'userProfile', params: { userId: comment.author.id } }"
                @click="closePost()"
              >
                <UserAvatar 
                  :avatar="comment.author.avatar"   
                />
              </router-link>
              <div>
                <h3>
                  <span class="font-bold mr-1">
                    {{ comment.author.username }}
                  </span>  
                  {{ comment.text }}
                </h3>
                <span class="ml-2.5 font-bold text-sm">{{ formatPostDate(comment.createdAt) }} {{ formatTimeDate(comment.createdAt) }}</span>
              </div>
            </div>
            <img 
              src="../../assets/images/trash-can-solid.svg" 
              alt="delete"
              v-if="$profileStore.profileInfo.id === comment.author.id"  
              @click="confirmDeleteComment(comment.id)"  
            >
          </div>
        </div>
        <div class="look-post__footer">
          <div class="look-post__likes-comments">
            <div class="flex">
              <img 
                  src="../../assets/images/heart-regular.svg" 
                  alt="like"
                  @click="likePost($postsStore.viewedPost.id)"  
                  v-if="$postsStore.viewedPost.likedByMe === 0"
                >
                <img 
                  src="../../assets/images/heart-solid.svg" 
                  alt="like"
                  @click="likePost($postsStore.viewedPost.id)"
                  v-else  
                >
                <img 
                  src="../../assets/images/comment-regular.svg" 
                  alt="comment"
                  class="look-post__likes-comments_comment" 
                  @click="showComments" 
                >
            </div>
            <span
              @mouseover="isHovered = true" 
              @mouseout="isHovered = false"  
            >
              {{ isHovered && formatPostDate($postsStore.viewedPost.createdAt) === 'today' ? $postsStore.viewedPost.createdAt.slice(11, 16) : formatPostDate($postsStore.viewedPost.createdAt) }}
            </span>
          </div>
          <div class="look-post__likes-count">
            <span class="font-semibold">{{ $postsStore.viewedPost.likesCount }} likes</span>
          </div>
          <div class="look-post__all-comments">
            <textarea v-model="comment" placeholder="Add a comment…"></textarea>
            <button 
              @click="addComment($postsStore.viewedPost.id)"
              :disabled='!comment'  
            >Post</button>
          </div>
        </div>
      </div>
    </div>
    <img 
      src="../../assets/images/plus-close-solid.svg" 
      alt="close" 
      class="close-post"
      @click="closePost()"
    >
    <div class="look-post__overplay" @click="closePost()"></div>
    <ConfirmationModal 
      v-if="isDeletePost === true" 
      :title="'Delete photo?'"
      :message="'That will delete this post.'"
      :buttonText="'Delete'"
      :buttonTextColor="'text-red-600'"
      @confirmAction="deletePost()"
      @cancel="(n) => isDeletePost = n"
      class="z-10"
    />
    <ConfirmationModal 
      v-if="isDeleteComment === true" 
      :title="'Delete the comment?'"
      :message="'This will cause this comment to be deleted.'"
      :buttonText="'Delete'"
      :buttonTextColor="'text-red-600'"
      @confirmAction="deleteComment(commentId)"
      @cancel="(n) => isDeleteComment = n"
      class="z-10"
    />
  </div>
</template>

<script setup>
import { ref } from "vue"
import UserAvatar from '@/components/UserAvatar.vue'
import ImagesSlider from "../ImagesSlider.vue"
import ConfirmationModal from "../ConfirmationModal.vue"
import ProfileApi from "@/api/profile"
import { formatPostDate } from '@/helpers/customFunctions'
import { formatTimeDate } from '@/helpers/customFunctions'
import { usePostsStore } from "@/stores/postsStore"
import { useProfileStore } from '@/stores/profileStore'

let postsStore = usePostsStore()
let profileStore = useProfileStore()

let isDeletePost = ref(false)
let isHovered = ref(false)
let comment = ref('')
let isShowComments = ref(false)
let isDeleteComment = ref(false)
let commentId = ref(0)

const deletePost = () => {
  ProfileApi.deletePost(postsStore.viewedPost.id)
  .then(() => {
    isDeletePost.value = false
    postsStore.closeLookPost()
    ProfileApi.getPosts()
  })
}

const closePost = () => {
  postsStore.closeLookPost()
  isShowComments.value = false
}

const likePost = (id) => {
  let form = {
    post_id: id
  }
  if (postsStore.viewedPost.likedByMe === 0) {
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

const addComment = (id) => {
  let form = {
    post_id: id,
    text: comment.value
  }
  ProfileApi.addComment(form)
  .then((response) => {
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
    comment.value = ''
    if (window.innerWidth < 685) {
      isShowComments.value = true
    }

  })
}

const deleteComment = (id) => {
  let form = {
    comment_id: id
  }
  ProfileApi.deleteComment(form)
  isDeleteComment.value = false
  postsStore.deleteComment(id)
}

const confirmDeleteComment = (id) => {
  isDeleteComment.value = true
  commentId.value = id
}

const showComments = () => {
  isShowComments.value = !isShowComments.value
}
</script>
import { defineStore } from 'pinia'

export const usePostsStore = defineStore('postsStore', {
	state: () => ({
    isCreatePost: false,
    myPosts: {},
    userPosts: [],
    isLookPost: false,
    viewedPost: {},
    tape: []
	}),
	actions: {
    openCreatePost() {
      this.isCreatePost = true
    },
    closeCreatePost() {
      this.isCreatePost = false
    },
    setMyPosts (posts) {
			this.myPosts = posts
		},
    setUserPosts (posts) {
			this.userPosts = posts
		},
    openLookPost() {
      this.isLookPost = true
    },
    closeLookPost() {
      this.isLookPost = false
    },
    setViewedPost (post) {
      this.viewedPost = post
    },
    setTape(posts) {
      this.tape = posts
    },
    toggleLike(symbol) {
      if (symbol === 1) {
        this.viewedPost.likesCount++
      } else {
        this.viewedPost.likesCount--
      }
    },
    toggleLikeByMe(symbol) {
      if (symbol === 1) {
        this.viewedPost.likedByMe++
      } else {
        this.viewedPost.likedByMe--
      }
    },
    deleteComment(id) {
      this.viewedPost.comments = this.viewedPost.comments.filter(
        comment => comment.id !== id
      )
    },
    addComment(comment) {
      this.viewedPost.comments.push(comment)
    }
  }
})
import ApiBase from '@/api/base'
import { $notify } from '@/composables/useNotify.js'
import { useProfileStore } from '@/stores/profileStore'
import { usePostsStore } from '@/stores/postsStore'

class ProfileApi {
  static async getProfile () {
    try {
      let url = ApiBase.baseApiUrl() + '/auth/my-user'
      let response = await http('get', url, null,
        ApiBase.authHeaders()
      )

      const profileStore = useProfileStore()
      profileStore.setProfileInfo(response.data)
      profileStore.getProfile()
    } catch (error) {
      console.error('Get profile error: ', error)
    }
  }

  static async updateProfile (form) {
    let url = ApiBase.baseApiUrl() + '/users/update-my-profile'
    let response = await http('put', url, form, ApiBase.authHeaders())
    $notify('success', 'Data successfully changed')
    const profileStore = useProfileStore()
    profileStore.setProfileInfo(response.data)
    return response.data
  }

  static async updateProfileAvatar (form) {
    let url = ApiBase.baseApiUrl() + '/users/change-avatar'
    let response = await http('post', url, form, ApiBase.authHeaders())
    console.log(response.data);
    $notify('success', 'Avatar successfully changed')
    return response.data
  }

  static async changePassword (form) {
    let url = ApiBase.baseApiUrl() + '/users/change-password'
    let response = await http('post', url, form, ApiBase.authHeaders())
    $notify('success', 'Password successfully changed')
    return response.data
  }

  static async getPosts () {
    try {
      let url = ApiBase.baseApiUrl() + '/posts/my-posts'
      let response = await http('get', url, null,
        ApiBase.authHeaders()
      )

      const postsStore = usePostsStore()
      postsStore.setMyPosts(response.data)
    } catch (error) {
      console.error('Get posts error: ', error)
    }
  }

  static async getUserPosts (id) {
    try {
      let url = ApiBase.baseApiUrl() + '/posts/user-posts/' + id
      let response = await http('get', url, null,
        ApiBase.authHeaders()
      )

      const postsStore = usePostsStore()
      postsStore.setUserPosts(response.data)
    } catch (error) {
      console.error('Get profile error: ', error)
      router.push({name: 'ErrorPage'})
    }
  }

  static async addPost (form) {
    let url = ApiBase.baseApiUrl() + '/posts/create-post'
    let response = await http('post', url, form, ApiBase.authHeaders())
    console.log(response.data);
    $notify('success', 'You create post')
    return response.data
  }

  static async deletePost (id) {
    let url = ApiBase.baseApiUrl() + '/posts/delete-post/' + id
    let response = await http('delete', url, null, ApiBase.authHeaders())
    console.log(response.data);
    $notify('success', 'You delete post')
    return response.data
  }

  static async getTape () {
    try {
      let url = ApiBase.baseApiUrl() + '/posts/all-posts'
      let response = await http('get', url, null,
        ApiBase.authHeaders()
      )

      const postsStore = usePostsStore()
      postsStore.setTape(response.data)
    } catch (error) {
      console.error('Get posts error: ', error)
    }
  }

  static async addLike (form) {
    let url = ApiBase.baseApiUrl() + '/like'
    let response = await http('post', url, form, ApiBase.authHeaders())
    return response.data
  }

  static async deleteLike (form) {
    let url = ApiBase.baseApiUrl() + '/like'
    let response = await http('delete', url, form, ApiBase.authHeaders())
    return response.data
  }

  static async addComment (form) {
    let url = ApiBase.baseApiUrl() + '/comments'
    let response = await http('post', url, form, ApiBase.authHeaders())
    $notify('success', 'You added a comment')
    return response.data
  }

  static async deleteComment (form) {
    let url = ApiBase.baseApiUrl() + '/comments'
    let response = await http('delete', url, form, ApiBase.authHeaders())
    $notify('success', 'You deleted a comment')
    return response.data
  }
}

export default ProfileApi
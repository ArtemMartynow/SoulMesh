import ApiBase from '@/api/base'
import { AUTH_TOKEN_KEY } from '@/helpers/constants.js'
import StorageHelper from '@/helpers/localStorageHelper'
import { $notify } from '@/composables/useNotify.js'

class AuthApi {
  static async register (form) {
    let url = ApiBase.baseApiUrl() + '/auth/register'
    let response = await http('post', url, form)
    $notify('success', 'You have been successfully registered')
    return response.data
  }

  static async login (form) {
    try {
      let url = ApiBase.baseApiUrl() + '/auth/login'
      let response = await http('post', url, form)

      if (response.data.token) {
        StorageHelper.set(AUTH_TOKEN_KEY, response.data.token)
      }
      $notify('success', 'You have been successfully signed in')
      return response.data.data
    } catch (error) {
      throw error
    }
  }
}

export default AuthApi

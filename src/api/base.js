import { AUTH_TOKEN_KEY } from '@/helpers/constants.js'
import StorageHelper from '@/helpers/localStorageHelper.js'
import router from '@/router/index.js'
import { $notify } from '@/composables/useNotify.js'

class ApiBase {
  static baseApiUrl () {
		return import.meta.env.VITE_API_URL
	}

  static authHeaders() {
    let headers = {}
    if (StorageHelper.get(AUTH_TOKEN_KEY)) {
      headers.Authorization = 'Bearer ' + StorageHelper.get(AUTH_TOKEN_KEY)
    }
    return { ...headers }
  }

  static unAuthorizeUser (redirectTo = {name: 'Login'}) {
    StorageHelper.remove(AUTH_TOKEN_KEY)
    $notify('success', 'You log out')
		router.push(redirectTo)
	}
}

export default ApiBase

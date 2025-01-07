import StorageHelper from '@/helpers/localStorageHelper.js'
import { AUTH_TOKEN_KEY } from '@/helpers/constants.js'

export default function auth ({ next }) {
  if (!StorageHelper.get(AUTH_TOKEN_KEY)) {
    return next({
      name: 'Login'
    })
  }

  return next()
}

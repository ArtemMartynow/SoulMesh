import StorageHelper from '@/helpers/localStorageHelper'
import { AUTH_TOKEN_KEY } from '@/helpers/constants.js'

export default function ifNotAuth ({ next }) {
  if (StorageHelper.get(AUTH_TOKEN_KEY)) {
    return next({
      name: 'Profile'
    })
  }

  return next()
}
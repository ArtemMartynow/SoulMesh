import { defineStore } from 'pinia'
import { AUTH_TOKEN_KEY } from '@/helpers/constants.js'
import StorageHelper from '@/helpers/localStorageHelper'
import router from '../router/index'
import { $notify } from '@/composables/useNotify.js'
import ApiBase from '@/api/base'

export const useProfileStore = defineStore('profileStore', {
	state: () => ({
		profileInfo: {},
    isGetProfile: false,
    defaultAvatar: false,
    host: ApiBase.baseApiUrl()
	}),
  getters: {
    isUserAuth: state => {
      return !!state.profileInfo.id
    },
    fullProfileInfo: state => {
      return {
        ...state.profileInfo,
        avatar: ApiBase.baseApiUrl() + state.profileInfo.avatar
      }
    },
  },
	actions: {
		setProfileInfo (info) {
			this.profileInfo = info
		},
    logout () {
      this.profileInfo = {}
      $notify('success', 'You log out')
      StorageHelper.remove(AUTH_TOKEN_KEY)
      router.push({ name: 'Login' })
    },
    getProfile() {
      this.isGetProfile = true
    },
	}
})

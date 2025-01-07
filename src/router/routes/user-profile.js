import userProfile from '../../pages/profile-pages/UserProfilePage.vue'
import auth from '@/middleware/auth'

export default {
  path: '/search/user-profile/:userId?',
  name: 'userProfile',
  component: userProfile,
  meta: {
    middleware: [auth]
  }
}
import Profile from '../../pages/profile-pages/ProfilePage.vue'
import auth from '@/middleware/auth'

export default {
  path: '/profile',
  name: 'Profile',
  component: Profile,
  meta: {
    middleware: [auth]
  }
}
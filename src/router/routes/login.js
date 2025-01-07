import Login from '../../pages/auth-pages/LoginPage.vue'
import ifNotAuth from '@/middleware/ifNotAuth'

export default {
  path: '/auth/login',
  name: 'Login',
  component: Login,
  meta: {
    middleware: [ ifNotAuth ]
  }
}
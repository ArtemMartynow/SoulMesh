import SignUp from '../../pages/auth-pages/SignUpPage.vue' 
import ifNotAuth from '@/middleware/ifNotAuth'

export default {
  path: '/auth/sign-up',
  name: 'SignUp',
  component: SignUp,
  meta: {
    middleware: [ ifNotAuth ]
  }
}

import Search from '../../pages/search-pages/SearchPage.vue'
import auth from '@/middleware/auth'

export default {
  path: '/search',
  name: 'Search',
  component: Search,
  meta: {
    middleware: [auth]
  }
}
import ApiBase from '@/api/base'
import { useSearchStore } from '@/stores/searchStore'
import router from '@/router'

class SearchApi {
  static async getUsers () {
    try {
      let url = ApiBase.baseApiUrl() + '/users'
      let response = await http('get', url, null,
        ApiBase.authHeaders()
      )
      
      const searchStore = useSearchStore()
      searchStore.setUsers(response.data)
      searchStore.usersObtained()
    } catch (error) {
      console.error('Get profile error: ', error)
    }
  }

  static async getUser (id) {
    const searchStore = useSearchStore()
    try {
      let url = ApiBase.baseApiUrl() + '/users/' + id
      let response = await http('get', url, null,
        ApiBase.authHeaders()
      )
      
      searchStore.setUser(response.data)
    } catch (error) {
      console.error('Get profile error: ', error)
      router.push({name: 'ErrorPage'})
    }
  }
}

export default SearchApi
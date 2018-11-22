import Cookies from 'js-cookie'
import UserRole from '../../Domain/UserRole'

export default class CookieUserRole {
  setUserRole(role) {
    Cookies.set('userrole', role)
  }

  getUserRole() {
    return new UserRole(Cookies.get('userrole'))
  }
}

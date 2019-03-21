import UserRole from '../../Domain/UserRole'

export default class UserRoleGateway {
  setUserRole(role) {
    this.role = role;
  }

  getUserRole() {
    return new UserRole(this.role)
  }
}

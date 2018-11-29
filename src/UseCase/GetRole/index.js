export default class GetRole {
  constructor(cookieUserRole) {
    this.cookieUserRole = cookieUserRole
  }

  execute() {
    let role = this.cookieUserRole.getUserRole().userRole;
    return {role};
  }
}
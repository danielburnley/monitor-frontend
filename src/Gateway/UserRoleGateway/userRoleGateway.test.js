import UserRoleGateway from '.';

describe('UserRoleGateway', () => {
  describe('Example 1', () => {
    it('Gets a saved user role', async () => {
      let cookieUserRole = new UserRoleGateway();
      cookieUserRole.setUserRole('1')
      expect(cookieUserRole.getUserRole().userRole).toEqual('1')
    });
  });

  describe('Example 2', () => {
    it('Gets a saved user role', async () => {
      let cookieUserRole = new UserRoleGateway()
      cookieUserRole.setUserRole('2')
      expect(cookieUserRole.getUserRole().userRole).toEqual('2')
    })
  })
})

import CookieUserRole from '.';
import Cookies from 'js-cookie';

describe('CookieUserRole', () => {
  let cookies = new Cookies();
  describe('Example 1', () => {
    it('Gets a saved user role', async () => {
      let cookieUserRole = new CookieUserRole(cookies);
      cookieUserRole.setUserRole('1')
      expect(cookieUserRole.getUserRole().userRole).toEqual('1')
    });
  });

  describe('Example 2', () => {
    it('Gets a saved user role', async () => {
      let cookieUserRole = new CookieUserRole(cookies)
      cookieUserRole.setUserRole('2')
      expect(cookieUserRole.getUserRole().userRole).toEqual('2')
    })
  })
})


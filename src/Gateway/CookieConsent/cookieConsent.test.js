import CookieConsentGateway from '.';
import Cookies from 'js-cookie';

describe('CookieConsentGateway', () => {
  let cookies = new Cookies();

  it('defaults to false', () => {
    let cookieConsent = new CookieConsentGateway(cookies);
    Cookies.remove('consent');
    expect(cookieConsent.getConsent().consent).toEqual(false);
  });

  describe('gets a saved consent', () => {
    it('example 1', async () => {
      let cookieConsent = new CookieConsentGateway(cookies);
      cookieConsent.setConsent(true);
      expect(cookieConsent.getConsent().consent).toEqual(true);
    });

    it('example 2', async () => {
      let cookieConsent = new CookieConsentGateway(cookies);
      cookieConsent.setConsent(false);
      expect(cookieConsent.getConsent().consent).toEqual(false);
    });
  });
});

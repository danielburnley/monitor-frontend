import CookiePreferences from '../../Domain/CookiePreferences';
import Cookies from 'js-cookie';

export default class CookieConsentGateway {
  setConsent(value) {
    Cookies.set('consent', value, {expires: 365});
  }

  getConsent() {
    return new CookiePreferences(Cookies.get('consent') === 'true');
  }
}

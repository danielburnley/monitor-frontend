export default class GetCookieConsent {
  constructor(cookiePreferences) {
    this.cookiePreferences = cookiePreferences;
  }

  async execute(presenter) {
    if (!(await this.cookiePreferences.getConsent()).consent) {
      this.cookiePreferences.setConsent(true);
      presenter.show();
    }
  }
}

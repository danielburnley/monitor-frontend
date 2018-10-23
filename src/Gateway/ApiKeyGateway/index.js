import fetch from 'isomorphic-fetch';
import ApiKey from '../../Domain/ApiKey';
import runtimeEnv from '@mars/heroku-js-runtime-env';

export default class ApiKeyGateway {
  constructor(cookies) {
    this.cookies = cookies;
  }

  setApiKey(apikey) {
    this.cookies.set('apikey', apikey);
  }

  getApiKey() {
    return new ApiKey(this.cookies.get('apikey'));
  }
}

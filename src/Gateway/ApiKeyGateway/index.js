import fetch from 'isomorphic-fetch';
import Return from '../../Domain/Return';
import runtimeEnv from '@mars/heroku-js-runtime-env';
import Cookies from 'universal-cookie';

export default class ApiKeyGateway {
  constructor(cookies) {
    this.cookies = cookies;
  }

  getApiKey() {
    return this.cookies.get('apikey');
  }
}

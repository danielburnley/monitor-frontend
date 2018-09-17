import fetch from 'isomorphic-fetch';
import Return from '../../Domain/Return';
import runtimeEnv from '@mars/heroku-js-runtime-env';

export default class ApiKeyGateway {
  getApiKey() {
    return window.apiKey;
  }
}

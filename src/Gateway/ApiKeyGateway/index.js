import ApiKey from '../../Domain/ApiKey';
import Cookies from 'js-cookie';

export default class ApiKeyGateway {
  setApiKey(apikey) {
    Cookies.set('apikey', apikey);
  }

  getApiKey() {
    return new ApiKey(Cookies.get('apikey'));
  }
}

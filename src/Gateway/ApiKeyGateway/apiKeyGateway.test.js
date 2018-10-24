import ApiKeyGateway from '.';
import Cookies from 'js-cookie';

describe('Api Key Gateway', () => {
  let cookies = new Cookies();
  describe('example 1', () => {
    it('gets a saved api key', async () => {
      let apiKeyGateway = new ApiKeyGateway(cookies);
      apiKeyGateway.setApiKey('14159265358');
      expect(apiKeyGateway.getApiKey().apiKey).toEqual('14159265358');
    });
  });

  describe('example 2', () => {
    it('gets a saved api key', async () => {
      let apiKeyGateway = new ApiKeyGateway(cookies);
      apiKeyGateway.setApiKey('28318530717');
      expect(apiKeyGateway.getApiKey().apiKey).toEqual('28318530717');
    });
  });
});

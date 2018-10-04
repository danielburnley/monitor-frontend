import nock from 'nock';
import ApiKeyGateway from '.';
import Cookies from 'universal-cookie';

describe('Api Key Gateway', () => {
  let cookies = new Cookies();
  it('example 1', async () => {
    let apiKeyGateway = new ApiKeyGateway(cookies);
    cookies.set('apikey','14159265358');
    expect(apiKeyGateway.getApiKey()).toEqual('14159265358');
  });

  it('example 2', async () => {
    let apiKeyGateway = new ApiKeyGateway(cookies);
    cookies.set('apikey','28318530717');
    expect(apiKeyGateway.getApiKey()).toEqual('28318530717');
  });
});

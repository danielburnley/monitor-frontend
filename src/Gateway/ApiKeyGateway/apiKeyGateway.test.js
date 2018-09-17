import nock from 'nock';
import ApiKeyGateway from '.';
import Project from '../../Domain/Project';

describe('Api Key Gateway', () => {
  it('example 1', async () => {
    let apiKeyGateway = new ApiKeyGateway();
    window.apiKey = '14159265358';
    expect(apiKeyGateway.getApiKey()).toEqual('14159265358');
  });

  it('example 2', async () => {
    let apiKeyGateway = new ApiKeyGateway();
    window.apiKey = '28318530717';
    expect(apiKeyGateway.getApiKey()).toEqual('28318530717');
  });
});

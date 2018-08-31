import Project from '../../Domain/Project'
import fetch from 'isomorphic-fetch'
import runtimeEnv from '@mars/heroku-js-runtime-env';

export default class ProjectGateway {
  async findById(id) {
    let env = runtimeEnv()
    let rawResponse = await fetch(
      `${env.REACT_APP_HIF_API_URL}project/find?id=${id}`,
      {
        headers: {'Content-Type': 'application/json',
          'API_KEY': window.apiKey},
      },
    );
    if (rawResponse.ok) {
      let projectResponse = await rawResponse.json();
      let foundProject = new Project(projectResponse.data, projectResponse.schema);
      return {success: true, foundProject};
    } else {
      return {success: false};
    }
  }
}

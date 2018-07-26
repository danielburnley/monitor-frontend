import fetch from 'isomorphic-fetch'

export default class ProjectGateway {
  async findById(id) {
    let rawResponse = await fetch(
      `${process.env.REACT_APP_HIF_API_URL}project/find?id=${id}`,
      {
        headers: {'Content-Type': 'application/json'},
      },
    );
    if (rawResponse.ok) {
      let foundProject = await rawResponse.json();
      return {success: true, foundProject};
    } else {
      return {success: false};
    }
  }
}

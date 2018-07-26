import fetch from 'isomorphic-fetch';

export default class ReturnGateway {
  async findById(id) {
    let rawResponse = await fetch(
      `${process.env.REACT_APP_HIF_API_URL}return/${id}`,
      {
        headers: {'Content-Type': 'application/json'},
      },
    );
    if (rawResponse.ok) {
      let foundReturn = await rawResponse.json();
      return {success: true, foundReturn};
    } else {
      return {success: false};
    }
  }
}

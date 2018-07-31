import fetch from "isomorphic-fetch";

export default class ReturnGateway {
  async findById(id) {
    let rawResponse = await fetch(
      `${process.env.REACT_APP_HIF_API_URL}return/get?id=${id}`,
      {
        headers: { "Content-Type": "application/json" }
      }
    );
    if (rawResponse.ok) {
      let foundReturn = await rawResponse.json();
      return { success: true, foundReturn };
    } else {
      return { success: false };
    }
  }
  async submit(id, data) {
    let rawResponse = await fetch(
      `${process.env.REACT_APP_HIF_API_URL}return/create`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project_id: id, data })
      }
    );

    if (rawResponse.ok) {
      let jsonResponse = await rawResponse.json();
      return { success: true, returnId: jsonResponse.id };
    } else {
      return { success: false };
    }
  }
}

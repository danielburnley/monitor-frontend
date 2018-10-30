export default class DocumentGateway {
  constructor(documentObject) {
    this.document = documentObject;
  }

  getDocument() {
    return this.document;
  }
}

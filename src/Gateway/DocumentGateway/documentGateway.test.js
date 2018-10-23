import DocumentGateway from ".";
describe("DocumentGateway", () => {
  it("Returns the document", () => {
    let documentDummy = jest.fn();
    let gateway = new DocumentGateway(documentDummy);

    expect(gateway.getDocument()).toEqual(documentDummy);
  });
});

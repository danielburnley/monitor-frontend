import GenerateInfrastructureUISchema from ".";

describe("GenerateInfrastructureUISchema", () => {
  it("Returns empty ui:options", () => {
    let useCase = new GenerateInfrastructureUISchema();
    let response = useCase.execute();
    expect(response).toEqual({
      "ui:options": {
        addable: true,
        removable: true
      }
    });
  });
});

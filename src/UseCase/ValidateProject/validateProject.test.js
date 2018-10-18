import ValidateProject from ".";

describe("ValidateProject", () => {
  let validationGatewaySpy, presenterSpy, useCase;

  const getUseCase = (valid, invalidPaths, prettyInvalidPaths) => {
    validationGatewaySpy = {
      validate: jest.fn(() => ({
        invalidPaths: invalidPaths,
        prettyInvalidPaths: prettyInvalidPaths,
        valid: valid
      }))
    };

    return new ValidateProject(validationGatewaySpy);
  };

  beforeEach(() => {
    presenterSpy = {
      invalidateFields: jest.fn()
    };
  });

  describe("Example 1", () => {
    describe("Given valid data", async () => {
      it("calls the validation gateway", async () => {
        let data = {
          cats: "meow"
        };
        let project_id = 3;
        let type = "animal";
        let valid = true;
        let invalidPaths = [];
        let prettyInvalidPaths = [];
        useCase = getUseCase(valid, invalidPaths, prettyInvalidPaths);
        await useCase.execute(presenterSpy, project_id, type, data);
        expect(validationGatewaySpy.validate).toBeCalledWith(project_id, type,  data);
      });

      it("returns undefined if valid is true", async () => {
        let data = {
          cats: "meow"
        };
        let type = "animal";
        let project_id = 4;
        let valid = true;
        let invalidPaths = [];
        let prettyInvalidPaths = [];
        useCase = getUseCase(valid, invalidPaths, prettyInvalidPaths);
        let response = await useCase.execute(presenterSpy, project_id, type, data);
        expect(response).toEqual(undefined);
      });

      it("does not call the presenter if valid is true", async () => {
        let data = {
          cats: "meow"
        };
        let type = "animal";
        let project_id = 5;
        let valid = true;
        let invalidPaths = [];
        let prettyInvalidPaths = [];
        useCase = getUseCase(valid, invalidPaths, prettyInvalidPaths);
        await useCase.execute(presenterSpy, project_id, type, data);
        expect(presenterSpy.invalidateFields).not.toHaveBeenCalled();
      });
    });

    describe("Given invalid data", async () => {
      it("calls the presenter if valid is false with invalid paths", async () => {
        let data = {
          cats: "meow"
        };
        let type = "animal";
        let valid = false;
        let project_id = 9;
        let invalidPaths = ["cats"];
        let prettyInvalidPaths = ["Cats"];
        useCase = getUseCase(valid, invalidPaths, prettyInvalidPaths);
        await useCase.execute(presenterSpy, project_id, type, data);
        expect(presenterSpy.invalidateFields).toBeCalledWith(
          prettyInvalidPaths
        );
      });
    });
  });

  describe("Example 2", () => {
    describe("Given valid data", () => {
      it("calls the validation gateway", async () => {
        let data = {
          dogs: "woof"
        };
        let type = "canine";
        let valid = true;
        let project_id =2;
        let invalidPaths = [];
        let prettyInvalidPaths = [];
        useCase = getUseCase(valid, invalidPaths, prettyInvalidPaths);
        await useCase.execute(presenterSpy, project_id, type, data);
        expect(validationGatewaySpy.validate).toBeCalledWith(project_id, type, data);
      });

      it("returns undefined if valid is true", async () => {
        let data = {
          dogs: "woof"
        };
        let type = "canine";
        let valid = true;
        let project_id = 6;
        let invalidPaths = [];
        let prettyInvalidPaths = [];
        useCase = getUseCase(valid, invalidPaths, prettyInvalidPaths);
        let response = await useCase.execute(presenterSpy, project_id, type, data);
        expect(response).toEqual(undefined);
      });
    });

    describe("Given invalid data", () => {
      it("calls the presenter if valid is false with invalid paths", async () => {
        let data = {
          dogs: "woof"
        };
        let type = "canine";
        let project_id = 8;
        let valid = false;
        let invalidPaths = ["dogs"];
        let prettyInvalidPaths = ["Dogs"];
        useCase = getUseCase(valid, invalidPaths, prettyInvalidPaths);
        await useCase.execute(presenterSpy, project_id, type, data);
        expect(presenterSpy.invalidateFields).toBeCalledWith(
          prettyInvalidPaths
        );
      });
    });
  });
});

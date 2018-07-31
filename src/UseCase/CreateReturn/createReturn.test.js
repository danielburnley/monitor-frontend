import CreateReturn from ".";

describe("CreateReturn", () => {
  let submitGatewaySpy, presenterSpy;

  function getUseCase(successfulSubmission, returnId = undefined) {
    submitGatewaySpy = {
      submit: jest.fn(() => ({ success: successfulSubmission, returnId }))
    };

    return new CreateReturn(submitGatewaySpy);
  }

  beforeEach(() => {
    presenterSpy = {
      submissionSuccessful: jest.fn(),
      submissionUnsuccessful: jest.fn()
    };
  });

  describe("Example one", () => {
    let useCase;

    describe("With successful submission", () => {
      beforeEach(async () => {
        useCase = getUseCase(true, 1);
        await useCase.execute(presenterSpy, {
          projectId: 1,
          data: { cats: "meow" }
        });
      });

      it("Passes the data to the gateway", () => {
        expect(submitGatewaySpy.submit).toBeCalledWith(1, { cats: "meow" });
      });

      it("Calls submission successful with the id on the presenter when the submission suceeded", () => {
        expect(presenterSpy.submissionSuccessful).toBeCalledWith(1);
      });
    });

    describe("With unsuccessful submission", () => {
      it("Presenter recieves submission unsuccessful", async () => {
        useCase = getUseCase(false);
        await useCase.execute(presenterSpy, { data: { cats: "meow" } });
        expect(presenterSpy.submissionUnsuccessful).toBeCalled();
      });
    });
  });

  describe("Example two", () => {
    let useCase;

    describe("With successful submission", () => {
      beforeEach(async () => {
        useCase = getUseCase(true, 2);
        await useCase.execute(presenterSpy, {
          projectId: 2,
          data: { dogs: "woof" }
        });
      });

      it("Passes the data to the gateway", async () => {
        expect(submitGatewaySpy.submit).toBeCalledWith(2, { dogs: "woof" });
      });

      it("Calls submission successful with the id on the presenter when the submission suceeded", () => {
        expect(presenterSpy.submissionSuccessful).toBeCalledWith(2);
      });
    });

    describe("With unsuccessful submission", () => {
      it("Presenter recieves submission unsuccessful", async () => {
        useCase = getUseCase(false);
        await useCase.execute(presenterSpy, { data: { dogs: "woof" } });
        expect(presenterSpy.submissionUnsuccessful).toBeCalled();
      });
    });
  });
});

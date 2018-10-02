import SubmitReturn from ".";

describe("SubmitReturn", () => {
  let submitGatewaySpy, presenterSpy;

  function getUseCase(successfulSubmission, returnId = undefined) {
    submitGatewaySpy = {
      submit: jest.fn(() => ({ success: successfulSubmission, returnId }))
    };

    return new SubmitReturn(submitGatewaySpy);
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
          returnId: 1,
          data: { cats: "meow" },
          schema: { ducks: "quack"}
        });
      });

      it("Passes the data to the gateway", () => {
        expect(submitGatewaySpy.submit).toBeCalledWith(1, 1, { cats: "meow" });
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
          projectId: 1415,
          returnId: 2,
          data: { dogs: "woof" },
          schema: { cow: "moo"}
        });
      });

      it("Passes the data to the gateway", async () => {
        expect(submitGatewaySpy.submit).toBeCalledWith(1415, 2, { dogs: "woof" });
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

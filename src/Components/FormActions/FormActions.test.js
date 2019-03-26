import React from "react";
import FormActions from ".";
import { shallow, mount } from "enzyme";

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 100));
}

async function updateFormField(input, value) {
  input.simulate("change", { target: { value } });
  await wait();
}

async function saveSubmitted(form) {
  form.find('[data-test="save-submitted-button"]').simulate("click");
  await wait();
}

async function save(form) {
  form.find('[data-test="save-button"]').simulate("click");
  await wait();
}

function create(form) {
  form.find('[data-test="create-button"]').simulate("click");
}

function submit(form) {
  form.find('[data-test="submit-button"]').simulate("click");
}

describe("<FormActions>", () => {
  let formSchema = {
    title: "Cat Return",
    type: "object",
    properties: {
      cats: {
        type: "object",
        title: "Cats",
        properties: {
          details: {
            type: "object",
            title: "Details",
            properties: {
              noise: { type: "string", title: "Noise" }
            }
          }
        }
      }
    }
  };
  let initialData = { cats: { details: { noise: "Meow" } } };
  let validateSpyInvalid = {execute: jest.fn((presenter, id, data, type) => (presenter.invalidateFields([['Cat House', 'Cat House']])))}
  let validateSpyValid = {execute: jest.fn()}

  let updateSpy = { execute: jest.fn((presenter, id, returnId, data) => presenter.updateSuccessful() )}
  let updateSubmittedSpy = { execute: jest.fn((presenter, id, returnId, data) => presenter.updateSubmittedSuccessful() )}
  let failingUpdateSubmittedSpy = { execute: jest.fn((presenter, id, returnId, data) => presenter.updateSubmittedUnsuccessful() )}
  let unresolvingUpdateSubmittedStub = { execute: jest.fn((presenter, id, returnId, data) => {} )}
  let submitSpy = { execute: jest.fn((presenter, id, returnId, data) => presenter.submissionSuccessful() )}
  let createSpy = { execute: jest.fn((presenter, id, returnId, data) => presenter.creationSuccessful(7) )}


  it("Passes the documentGateway to the parentForm", () => {
    let documentGatewayDummy = jest.fn();
    let wrapper = shallow(
      <FormActions
        formType="return"
        documentGateway={documentGatewayDummy}
        data={initialData}
        schema={formSchema}
        match={{params: {projectId: 1}}}
        status="Draft"
        getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
      />
    );

    expect(
      wrapper.find({ "data-test": "return-form" }).props().documentGateway
    ).toEqual(documentGatewayDummy);
  });

  describe("Passes the formContext to the parentForm", () => {
    it("Example 1", () => {
      let documentGatewayDummy = jest.fn();
      let wrapper = shallow(
        <FormActions
          formType="return"
          documentGateway={documentGatewayDummy}
          getInfrastructures={"Infrastruces to pick"}
          match={{params: {projectId: 3}}}
          data={initialData}
          schema={formSchema}
          status="Draft"
          getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
        />
      );

      expect(
        wrapper.find({ "data-test": "return-form" }).props().formContext
      ).toEqual({projectId: 3, getInfrastructures: "Infrastruces to pick", returnStatus: "Draft"});
    });

    it("Example 2", () => {
      let documentGatewayDummy = jest.fn();
      let wrapper = shallow(
        <FormActions
          formType="return"
          documentGateway={documentGatewayDummy}
          getInfrastructures="More infrastructures"
          data={initialData}
          schema={formSchema}
          match={{params: {projectId: 6}}}
          status="Draft"
          getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
        />
      );

      expect(
        wrapper.find({ "data-test": "return-form" }).props().formContext
      ).toEqual({projectId: 6, getInfrastructures: "More infrastructures", returnStatus: "Draft"});
    });
  });

  it("Displays the create button if the is new", () => {
    let wrapper = mount(
      <FormActions
        formType="return"
        match={{params: {projectId: 1}}}
        data={initialData}
        schema={formSchema}
        status="New"
        getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
      />
    );

    let actions = wrapper.find('[data-test="create-button"]');

    expect(actions.length).toEqual(1);
  });

  it("Only shows the back to overview button if the form is submitted", () => {
    let wrapper = mount(
      <FormActions
        formType="return"
        match={{params: {projectId: 1}}}
        data={initialData}
        schema={formSchema}
        status="Submitted"
        getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
      />
    );

    let actions = wrapper.find("[data-test='back-to-overview']");

    expect(actions.length).toEqual(1);
  });

  describe("Submitted", () => {
    describe("As a Homes England user", () => {
      describe("With a specified updateSubmitted use case", () => {
        it("Shows the save submitted button", () => {
          let wrap = shallow(
            <FormActions
              formType="return"
              data={initialData}
              schema={formSchema}
              validate = {validateSpyValid}
              updateSubmitted={updateSubmittedSpy}
              submit={submitSpy}
              match={{params: {projectId: 1, returnId: 3}}}
              status="Submitted"
              type="ac"
              getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
              />
          );

          expect(wrap.find("[data-test='save-submitted-button']").length).toEqual(1);
        });

        it("Allows the user to save", () => {
          let wrap = shallow(
            <FormActions
              formType="return"
              data={initialData}
              schema={formSchema}
              validate = {validateSpyValid}
              updateSubmitted={updateSubmittedSpy}
              submit={submitSpy}
              match={{params: {projectId: 1, returnId: 3}}}
              status="Submitted"
              type="ac"
              getRole={{execute: jest.fn(() => ({role: "Homes England"}))}}
              />
          );

          saveSubmitted(wrap);
          expect(updateSubmittedSpy.execute).toHaveBeenCalledWith(expect.anything(), {projectId: 1, id: 3, data: {cats: { details: { noise: "Meow" } }}});
        });

        it("Displays the save button after saving", async () => {
          let wrap = shallow(
            <FormActions
              formType="return"
              data={initialData}
              schema={formSchema}
              validate = {validateSpyValid}
              updateSubmitted={updateSubmittedSpy}
              submit={submitSpy}
              match={{params: {projectId: 1, returnId: 3}}}
              status="Submitted"
              type="ac"
              getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
              />
          );

          await saveSubmitted(wrap);
          await wrap.update();
          expect(wrap.find("[data-test='save-submitted-button']").length).toEqual(1);
        });

        it("Displays the failure message & button after saving", async () => {
          let wrap = shallow(
            <FormActions
              formType="return"
              data={initialData}
              schema={formSchema}
              validate = {validateSpyValid}
              updateSubmitted={failingUpdateSubmittedSpy}
              submit={submitSpy}
              match={{params: {projectId: 1, returnId: 3}}}
              status="Submitted"
              type="ac"
              getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
            />
          );

          await saveSubmitted(wrap);
          await wrap.update();
          expect(wrap.find("[data-test='save-submitted-button-error']").length).toEqual(1);
          expect(wrap.find("[data-test='save-submitted-button']").length).toEqual(1);
        });

        it("Displays the disabled save submit button when saving", () => {
          let wrap = mount(
            <FormActions
              formType="return"
              data={initialData}
              schema={formSchema}
              validate = {validateSpyValid}
              updateSubmitted={unresolvingUpdateSubmittedStub}
              submit={submitSpy}
              match={{params: {projectId: 1, returnId: 3}}}
              status="Submitted"
              type="ac"
              getRole={{execute: jest.fn(() => ({role: "Homes England"}))}}
            />
          );

          saveSubmitted(wrap);
          expect(wrap.find("[data-test='disabled-save-submitted-button']").length).toEqual(1);
        });
      });

      describe("Without a specified updateSubmitted use case", () => {
        let wrap = shallow(
          <FormActions
            formType="return"
            data={initialData}
            schema={formSchema}
            validate = {validateSpyValid}
            submit={submitSpy}
            match={{params: {projectId: 1, returnId: 3}}}
            status="Submitted"
            type="ac"
            getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
          />
        );
        expect(wrap.find("[data-test='save-submitted-button']").length).toEqual(0);
      });
    });

    describe("As a Local Authority user", () => {
      it ("Doesn't display the save submitted button", () => {
        let wrap = shallow(
          <FormActions
            formType="return"
            data={initialData}
            schema={formSchema}
            validate = {validateSpyValid}
            updateSubmitted={updateSubmittedSpy}
            submit={submitSpy}
            match={{params: {projectId: 1, returnId: 3}}}
            status="Submitted"
            type="ac"
            getRole={{execute: jest.fn(()=> ({role: "Local Authority"}))}}
          />
        );
        expect(wrap.find("[data-test='save-submitted-button']").length).toEqual(0);
      });
    });
  });

  describe("Submitting", () => {
    it("Calls the validate use case with the form data when submitted", () => {
      let wrapper = shallow(
        <FormActions
          formType="return"
          data={initialData}
          schema={formSchema}
          validate = {validateSpyValid}
          update={updateSpy}
          submit={submitSpy}
          match={{params: {projectId: 1, returnId: 3}}}
          status="Draft"
          type="ac"
          getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
        />
      );

      submit(wrapper);
      expect(validateSpyValid.execute).toHaveBeenCalledWith(
        expect.anything(),
        1,
        {cats: { details: { noise: "Meow" } }},
        "ac"
      );
    });

    describe("If valid", () => {
      let wrap

      beforeEach(() => {
        wrap = mount(<FormActions
          formType="return"
          data={initialData}
          schema={formSchema}
          validate = {validateSpyValid}
          update={updateSpy}
          submit={submitSpy}
          match={{params: {projectId: 1, returnId: 3}}}
          status="Draft"
          type="ac"
          getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
        />)
      });

      it("Calls the update use case with the form data", () => {
        let wrapper = shallow(
          <FormActions
            formType="return"
            data={initialData}
            schema={formSchema}
            validate = {validateSpyValid}
            update={updateSpy}
            submit={submitSpy}
            match={{params: {projectId: 1, returnId: 3}}}
            status="Draft"
            type="ac"
            getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
          />
        );

        submit(wrapper);
        expect(updateSpy.execute).toHaveBeenCalledWith(
          expect.anything(),
          {
            projectId: 1,
            data: {cats: { details: { noise: "Meow" } }},
            id: 3
          }
        );
      });

      it("Calls the submit use case with the id", () => {
        let wrapper = shallow(
          <FormActions
            formType="return"
            data={initialData}
            schema={formSchema}
            validate = {validateSpyValid}
            update={updateSpy}
            submit={submitSpy}
            match={{params: {projectId: 1, returnId: 3}}}
            status="Draft"
            type="ac"
            getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
          />
        );

        submit(wrapper);
        expect(submitSpy.execute).toHaveBeenCalledWith(
          expect.anything(),
          {projectId: 1,
          data: {cats: { details: { noise: "Meow" } }},
          id: 3}
        );
      });

      describe('showing submission', () => {
        it('example 1', async () => {
          let input = wrap.find("[type='text'] input").first();
          await updateFormField(input, "cat");
          await submit(wrap);
          await wait();
          wrap.update();
          expect(wrap.find("[data-test='validationError']").length).toEqual(0);
          expect(wrap.find("[data-test='submitSuccess']").length).toEqual(1);
          expect(wrap.find("[data-test='return']").length).toEqual(0);
          expect(wrap.find("[data-test='saveSuccess']").length).toEqual(0);
        });
      });
    });

    describe("If not valid", () => {
      it('prevents submission', async () => {
        let wrap = mount(<FormActions
          formType="return"
          data={initialData}
          schema={formSchema}
          validate = {validateSpyInvalid}
          update={updateSpy}
          submit={submitSpy}
          match={{params: {projectId: 1, returnId: 3}}}
          status="Draft"
          type="ac"
          getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
        />)

        let input = wrap.find("[type='text'] input").first();
        await updateFormField(input, "");
        await submit(wrap);
        await wait();
        expect(wrap.find("[data-test='validationError']").length).toEqual(1);
        expect(wrap.find("[data-test='saveSuccess']").length).toEqual(0);
        expect(wrap.find("[data-test='validationError']").text()).toEqual("Error: This return could not be submitted because the following fields were missing: Cat House → Cat House");
      });
    });

    describe("Only showing submit button to certain users", () => {
      describe("When role is Local Authority", () => {
        let getRoleUseCaseSpy, documentGatewayDummy, wrapper
        beforeEach(()=> {
           getRoleUseCaseSpy = {execute: jest.fn(()=> ({role: "Local Authority"}))}
           documentGatewayDummy = jest.fn();
           wrapper = shallow(
            <FormActions
              formType="return"
              documentGateway={documentGatewayDummy}
              data={initialData}
              schema={formSchema}
              validate = {validateSpyValid}
              update={updateSpy}
              submit={submitSpy}
              match={{params: {projectId: 1, returnId: 3}}}
              status="Draft"
              type="ac"
              getRole={getRoleUseCaseSpy}
            />
          );
        })
        it("calls the get role use case", () => {
          wrapper.update()
          expect(getRoleUseCaseSpy.execute).toBeCalled()
        })
        it("Hides the submit button", () => {
          wrapper.update();

          expect(wrapper.find('[data-test="disabled-submit-button"]').length).toEqual(0)
          expect(wrapper.find('[data-test="submit-button"]').length).toEqual(0)

          expect(wrapper.find('[data-test="disabled-save-button"]').length).toEqual(0)
          expect(wrapper.find('[data-test="save-button"]').length).toEqual(1)
        });

        it("Hides the disabled submit button", () => {
          wrapper = shallow(
            <FormActions
              formType="return"
              documentGateway={documentGatewayDummy}
              data={initialData}
              schema={formSchema}
              match={{params: {projectId: 1}}}
              status="Updating"
              getRole={getRoleUseCaseSpy}
            />
          );

          wrapper.update();

          expect(wrapper.find('[data-test="disabled-submit-button"]').length).toEqual(0)
          expect(wrapper.find('[data-test="submit-button"]').length).toEqual(0)

          expect(wrapper.find('[data-test="disabled-save-button"]').length).toEqual(1)
          expect(wrapper.find('[data-test="save-button"]').length).toEqual(0)
        });
      })
    });

    it('it disables the save and submit buttons until it finishes submitting', async () => {
      let unresolvingUpdateStub = {execute: jest.fn(() => (async (presenter, request) => {await new Promise(resolve => setTimeout(resolve, 163456834159265358));}))};
      let wrap = mount(<FormActions
        formType="return"
        data={initialData}
        schema={formSchema}
        validate = {validateSpyValid}
        update={unresolvingUpdateStub}
        submit={submitSpy}
        match={{params: {projectId: 1, returnId: 3}}}
        status="Draft"
        type="ac"
        getRole={{execute: jest.fn(() => "Homes England")}}
      />);

      let input = wrap.find("[type='text'] input").first();
      await updateFormField(input, "Meow");
      await submit(wrap);

      expect(wrap.find("[data-test='save-button']").length).toEqual(0);
      expect(wrap.find("[data-test='submit-button']").length).toEqual(0);
      expect(wrap.find("[data-test='submitted-button-error']").length).toEqual(0);

      expect(wrap.find("[data-test='disabled-save-button']").length).toEqual(1);
      expect(wrap.find("[data-test='disabled-submit-button']").length).toEqual(1);
    });

    it('reenables the save and submit buttons if the submission failed', async () => {
      let unsuccessfulSubmitSpy = { execute: jest.fn((presenter, id, returnId, data) => presenter.submissionUnsuccessful() )}
      let wrap = mount(<FormActions
        formType="return"
        data={initialData}
        schema={formSchema}
        validate={validateSpyValid}
        update={updateSpy}
        submit={unsuccessfulSubmitSpy}
        match={{params: {projectId: 1, returnId: 3}}}
        status="Draft"
        type="ac"
        getRole={{execute: jest.fn(() => "Homes England")}}
      />);

      await submit(wrap);
      await wait();
      await wrap.update();

      expect(wrap.find("[data-test='save-button']").length).toEqual(1);
      expect(wrap.find("[data-test='submit-button']").length).toEqual(1);

      expect(wrap.find("[data-test='disabled-save-button']").length).toEqual(0);
      expect(wrap.find("[data-test='disabled-submit-button']").length).toEqual(0);

      expect(wrap.find("[data-test='submitted-button-error']").length).toEqual(1);
    });
  });

  describe("Saving", () => {
    describe("New status", () => {
      it("Calls the create usecase when saving the draft", () => {
        let wrapper = shallow(
          <FormActions
            formType="return"
            history={[]}
            data={initialData}
            schema={formSchema}
            create={createSpy}
            validate = {validateSpyValid}
            update={updateSpy}
            submit={submitSpy}
            match={{params: {projectId: 1}}}
            status="New"
            type="ac"
            getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
          />
        );

        create(wrapper);
        expect(createSpy.execute).toHaveBeenCalledWith(
          expect.anything(),
          {
          projectId: 1,
          data: {cats: { details: { noise: "Meow" } }}
        });
      });
    });

    describe("Draft status", () => {
      it("Calls the update  use case when saving the draft", () => {
        let wrapper = shallow(
          <FormActions
            formType="return"
            data={initialData}
            schema={formSchema}
            validate = {validateSpyValid}
            update={updateSpy}
            type="ac"
            match={{params: {projectId: 1, returnId: 3}}}
            status="Draft"
            getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
          />
        );

        save(wrapper);
        expect(updateSpy.execute).toHaveBeenCalledWith(expect.anything(),{
          projectId: 1,
          id: 3,
          data: {cats: { details: { noise: "Meow" } }}
        });
      });

      it("Calls the update usecase with the updated formData when edited", async () => {
        let wrapper = mount(
          <FormActions
            formType="return"
            data={initialData}
            schema={formSchema}
            validate = {validateSpyValid}
            update={updateSpy}
            type="ac"
            match={{params: {projectId: 1, returnId: 3}}}
            status="Draft"
            getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
          />
        );
        let input = wrapper.find('input[type="text"]');
        await updateFormField(input, "New Meow");
        save(wrapper);
        expect(updateSpy.execute).toHaveBeenCalledWith(expect.anything(), {
          projectId: 1,
          id: 3,
          data: {cats: { details: { noise: "New Meow" } }}
        });
      });
    });

    it('disables the save button until it finishes saving', async () => {
      let wrap = mount(
        <FormActions
          formType="return"
          data={initialData}
          schema={formSchema}
          validate = {validateSpyValid}
          update={{execute: jest.fn()}}
          type="ac"
          match={{params: {projectId: 1, returnId: 3}}}
          status="Draft"
          getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
        />
      );

      let input = wrap.find("[type='text'] input").first();
      await updateFormField(input, "Meow");
      await save(wrap);
      await wait();

      expect(wrap.find("[data-test='save-button']").length).toEqual(0);
      expect(wrap.find("[data-test='submit-button']").length).toEqual(0);

      expect(wrap.find("[data-test='disabled-save-button']").length).toEqual(1);
      expect(wrap.find("[data-test='disabled-submit-button']").length).toEqual(1);

      expect(wrap.find("[data-test='save-button-error']").length).toEqual(0);
    });

    it('reenables the save button if saving fails', async () => {
      let unsuccessfulUpdateSpy = { execute: jest.fn((presenter, id, returnId, data) => presenter.updateUnsuccessful() )}
      let wrap = mount(
        <FormActions
          formType="return"
          data={initialData}
          schema={formSchema}
          validate = {validateSpyValid}
          update={unsuccessfulUpdateSpy}
          type="ac"
          match={{params: {projectId: 1, returnId: 3}}}
          status="Draft"
          getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
        />
      );

      await save(wrap);
      await wait();
      await wrap.update();

      expect(wrap.find("[data-test='save-button']").length).toEqual(1);
      expect(wrap.find("[data-test='submit-button']").length).toEqual(1);

      expect(wrap.find("[data-test='disabled-save-button']").length).toEqual(0);
      expect(wrap.find("[data-test='disabled-submit-button']").length).toEqual(0);

      expect(wrap.find("[data-test='save-button-error']").length).toEqual(1);
    });

    describe('an invalid response', () => {
      it('shows a success message with a validation warning', async () => {
        let wrap = mount(
          <FormActions
            formType="return"
            data={initialData}
            schema={formSchema}
            validate = {validateSpyInvalid}
            update={updateSpy}
            type="ac"
            match={{params: {projectId: 1, returnId: 1}}}
            status="Draft"
            getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
            history={[]}
          />);

        await save(wrap);
        await wrap.update();
        await wait();
        expect(validateSpyInvalid.execute).toHaveBeenCalledWith(expect.anything(), 1, initialData, 'ac');
        expect(wrap.find("[data-test='saveSuccess']").length).toEqual(1);
        expect(wrap.find("[data-test='validationWarning']").length).toEqual(1);
        expect(wrap.find("[data-test='validationWarning']").text()).toEqual("Warning: You will not be able to submit this return until the following fields are filled in: Cat House → Cat House");
      });
    });

    describe("A valid response", () => {
      it('shows a success message', async () => {
        let wrap = mount(
          <FormActions
            formType="return"
            data={initialData}
            schema={formSchema}
            validate = {validateSpyValid}
            update={updateSpy}
            type="ac"
            match={{params: {projectId: 1, returnId: 1}}}
            status="Draft"
            getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
            history={[]}
          />);

        let input = wrap.find("[type='text'] input").first();
        await updateFormField(input, "Meow");
        await save(wrap);
        await wait();
        expect(validateSpyValid.execute).toHaveBeenCalledWith(expect.anything(), 1, initialData, 'ac');
        expect(wrap.find("[data-test='validationError']").length).toEqual(0);
        expect(wrap.find("[data-test='saveSuccess']").length).toEqual(1);
        expect(wrap.find("[data-test='submitSuccess']").length).toEqual(0);
      });
    });

    it('hides the success message after data entry resumes', async () => {
      let wrap = mount(
        <FormActions
          formType="return"
          data={initialData}
          schema={formSchema}
          validate = {validateSpyValid}
          update={updateSpy}
          type="ac"
          match={{params: {projectId: 1, returnId: 1}}}
          status="Draft"
          getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
          history={[]}
        />);

      let input = wrap.find("input[type='text']").first();
      await updateFormField(input, "Meow");
      await save(wrap);
      await updateFormField(input, "Cats");
      wrap.update();

      expect(wrap.find("[data-test='saveSuccess']").length).toEqual(0);
      expect(wrap.find("[data-test='validationWarning']").length).toEqual(0);
    });
  });

  describe("Editing", () => {
    it("does not show any messages", async () => {
      let wrap = mount(<FormActions
        formType="return"
              data={initialData}
              schema={formSchema}
              type="ac"
              validate={validateSpyValid}
              match={{ params: { projectId: 1, returnId: 1 } }}
              history={[]}
              create={createSpy}
              submit={submitSpy}
              update={updateSpy}
              getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
            />);
      await wait();

      expect(wrap.find("[data-test='validationError']").length).toEqual(0);
      expect(wrap.find("[data-test='saveSuccess']").length).toEqual(0);
      expect(wrap.find("[data-test='submitSuccess']").length).toEqual(0);
    });
  });
});

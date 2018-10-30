import React from "react";
import ReturnForm from ".";
import { shallow, mount } from "enzyme";

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 100));
}

async function updateFormField(input, value) {
  input.simulate("change", { target: { value } });
  await wait();
}

function saveReturn(form) {
  form.find('[data-test="save-return-button"]').simulate("click");
}

function createReturn(form) {
  form.find('[data-test="create-return-button"]').simulate("click");
}

function submitReturn(form) {
  form.find('[data-test="submit-return-button"]').simulate("click");
}

describe("<ReturnForm>", () => {
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

  it("Passes the documentGateway to the parentForm", () => {
    let documentGatewayDummy = jest.fn();
    let wrapper = shallow(
      <ReturnForm
        documentGateway={documentGatewayDummy}
        data={initialData}
        schema={formSchema}
        onSubmit={() => {}}
        status="Draft"
      />
    );

    expect(
      wrapper.find({ "data-test": "return-form" }).props().documentGateway
    ).toEqual(documentGatewayDummy);
  });

  it("Calls the onsubmit function with the form data when submitted", () => {
    let submitSpy = jest.fn();
    let wrapper = shallow(
      <ReturnForm
        data={initialData}
        schema={formSchema}
        onSubmit={submitSpy}
        status="Draft"
      />
    );

    submitReturn(wrapper);
    expect(submitSpy).toHaveBeenCalledWith({
      cats: { details: { noise: "Meow" } }
    });
  });

  it("Calls the onCreate function when saving the draft", () => {
    let createSpy = jest.fn();
    let wrapper = shallow(
      <ReturnForm
        data={initialData}
        schema={formSchema}
        onCreate={createSpy}
        status="New"
      />
    );

    createReturn(wrapper);
    expect(createSpy).toHaveBeenCalledWith({
      cats: { details: { noise: "Meow" } }
    });
  });

  it("Calls the onSave function when saving the draft", () => {
    let saveSpy = jest.fn();
    let wrapper = shallow(
      <ReturnForm
        data={initialData}
        schema={formSchema}
        onSave={saveSpy}
        status="Draft"
      />
    );

    saveReturn(wrapper);
    expect(saveSpy).toHaveBeenCalledWith({
      cats: { details: { noise: "Meow" } }
    });
  });

  it("Calls the onChange function when changing", async () => {
    let saveSpy = jest.fn();
    let changeSpy = jest.fn();

    let wrapper = mount(
      <ReturnForm
        data={initialData}
        schema={formSchema}
        onSave={saveSpy}
        onChange={changeSpy}
        status="Draft"
      />
    );
    await wait();
    await updateFormField(wrapper.find('input[type="text"]'), "Cats");
    expect(changeSpy).toHaveBeenCalledWith({
      cats: { details: { noise: "Cats" } }
    });
  });

  it("Calls the onSave function with the updated formData when edited", async () => {
    let saveSpy = jest.fn();
    let wrapper = mount(
      <ReturnForm data={initialData} schema={formSchema} onSave={saveSpy} />
    );
    let input = wrapper.find('input[type="text"]');
    await updateFormField(input, "New Meow");
    saveReturn(wrapper);
    expect(saveSpy).toHaveBeenCalledWith({
      cats: { details: { noise: "New Meow" } }
    });
  });

  it("Displays no buttons if the return is submitted", () => {
    let wrapper = mount(
      <ReturnForm data={initialData} schema={formSchema} status="Submitted" />
    );

    let actions = wrapper.find("button");

    expect(actions.length).toEqual(0);
  });

  it("Displays the create button if the return is new", () => {
    let wrapper = mount(
      <ReturnForm data={initialData} schema={formSchema} status="New" />
    );

    let actions = wrapper.find('[data-test="create-return-button"]');

    expect(actions.length).toEqual(1);
  });
});

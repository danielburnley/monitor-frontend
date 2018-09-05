import React from "react";
import ParentForm from ".";
import ArraySubform from "../ArraySubform";
import { mount, shallow } from "enzyme";

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 100));
}

async function updateFormField(input, value) {
  input.simulate("change", { target: { value } });
  await wait();
}

function submitReturn(form) {
  form.find('[data-test="submit-return-button"]').simulate("click");
}

describe("<ParentForm>", () => {
  let onChangeSpy;

  beforeEach(() => {
    onChangeSpy = jest.fn();
  });

  it("takes formData", async () => {
    let wrap = mount(
      <ParentForm
        onChange={onChangeSpy}
        formData={{ cat: { noise: "Meow" } }}
        schema={{
          type: "object",
          properties: {
            cat: {
              title: "cat",
              type: "object",
              properties: {
                noise: { type: "string", title: "noise" }
              }
            }
          }
        }}
      />
    );

    let input = wrap.find("input").first();
    await updateFormField(input, "Meowwwww");
    expect(wrap.state("formData")).toEqual({ cat: { noise: "Meowwwww" } }, 1);
  });

  it("compiles a form from the children", async () => {
    let wrap = mount(
      <ParentForm
        onChange={onChangeSpy}
        schema={{
          type: "object",
          properties: {
            cat: {
              type: "object",
              properties: {
                name: {
                  type: "string"
                }
              }
            },
            dog: {
              type: "object",
              properties: {
                name: {
                  type: "string"
                }
              }
            }
          }
        }}
      />
    );
    let input = wrap.find('[data-test="cat_subform"] input');
    await updateFormField(input, "Tabby");
    expect(wrap.state("formData")).toEqual({ cat: { name: "Tabby" } }, 1);
  });

  it("triggers the onChange prop it is given", async () => {
    let wrap = mount(
      <ParentForm
        onChange={onChangeSpy}
        schema={{
          type: "object",
          properties: {
            cat: {
              type: "object",
              properties: {
                name: {
                  type: "string"
                }
              }
            },
            dog: {
              type: "object",
              properties: {
                name: {
                  type: "string"
                }
              }
            }
          }
        }}
      />
    );

    let input = wrap.find(".form-control").first();

    await updateFormField(input, "Tabby");

    expect(onChangeSpy).toHaveBeenCalledWith({
      formData: { cat: { name: "Tabby" } }
    });
  });

  it("displays buttons to change the current view", async () => {
    let wrap = mount(
      <ParentForm
        onChange={onChangeSpy}
        schema={{
          type: "object",
          properties: {
            cat: {
              type: "object",
              properties: {
                name: {
                  type: "string"
                }
              }
            },
            dog: {
              type: "object",
              properties: {
                name: {
                  type: "string"
                }
              }
            }
          }
        }}
      />
    );

    let cat_label = wrap.find("#cat");
    cat_label.simulate("change", { target: { checked: true } });
    wrap.update();
    expect(wrap.find('[data-test="cat_subform"]').length).toEqual(1);
    expect(wrap.find('[data-test="dog_subform"]').length).toEqual(0);
  });

  it("displays no submit buttons", async () => {
    let wrap = mount(
      <ParentForm
        schema={{
          type: "object",
          properties: {
            cat: {
              type: "object",
              properties: {
                name: {
                  type: "string"
                }
              }
            },
            dog: {
              type: "object",
              properties: {
                name: {
                  type: "string"
                }
              }
            }
          }
        }}
      />
    );

    expect(wrap.find("button").length).toEqual(0);
  });

  describe("Given a schema of type array is selected", () => {
    let parentForm, onChangeSpy;

    beforeEach(() => {
      onChangeSpy = jest.fn();
      parentForm = shallow(
        <ParentForm
          schema={{
            type: "object",
            properties: {
              cat: {
                title: "cat",
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    details: {
                      type: "object",
                      properties: {
                        name: { type: "string" }
                      }
                    }
                  }
                }
              }
            }
          }}
          formData={{ cat: [{ details: { name: "Meow" } }] }}
          uiSchema={{ cat: { items: { a: "b" } } }}
          onChange={onChangeSpy}
        />
      );
    });

    it("Displays an array subform", () => {
      expect(parentForm.find(ArraySubform).length).toEqual(1);
    });

    it("Passes the selected data into the array subform", () => {
      let subform = parentForm.find(ArraySubform);

      let expectedSchema = {
        title: "cat",
        type: "array",
        items: {
          type: "object",
          properties: {
            details: {
              type: "object",
              properties: {
                name: { type: "string" }
              }
            }
          }
        }
      };

      expect(subform.props().schema).toEqual(expectedSchema);
      expect(subform.props().data).toEqual([{ details: { name: "Meow" } }]);
      expect(subform.props().uiSchema).toEqual({ a: "b" });
    });

    describe("Updates the parent formdata when changing", () => {
      it("Example one", () => {
        parentForm
          .find(ArraySubform)
          .props()
          .onChange({ newData: "meow" });

        expect(onChangeSpy).toHaveBeenCalledWith({
          formData: { cat: { newData: "meow" } }
        });
      });

      it("Example two", () => {
        parentForm
          .find(ArraySubform)
          .props()
          .onChange({ woof: "bark" });

        expect(onChangeSpy).toHaveBeenCalledWith({
          formData: { cat: { woof: "bark" } }
        });
      });
    });
  });
});

import React from "react";
import ParentForm from ".";
import { mount } from "enzyme";

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
  let onChangeSpy = jest.fn();

  it("takes formData", async () => {
    let wrap = mount(
      <ParentForm
        onChange={onChangeSpy}
        formData={{ cat: { noise: "Meow" } }}
        schema={{
          type: "object",
          properties: {
            cat: {
              title: "Cat",
              type: "object",
              properties: {
                noise: { type: "string", title: "Noise" }
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

  it("displays radio buttons to change the current view", async () => {
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
});

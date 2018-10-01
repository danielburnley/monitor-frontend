import React from "react";
import Portal from ".";
import { mount } from "enzyme";

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 100));
}

async function updateFormField(input, value) {
  input.simulate("change", { target: { value } });
  await wait();
}

describe("Portal", () => {
  let CanAccessProjectSpy = {
    execute: jest.fn(async () => {
      return {
        valid: true,
        apiKey: "Dogs"
      };
    })
  };

  let RequestTokenSpy = {
    execute: jest.fn()
  };

  it("calls the CanAccessProject use case", async () => {
    let wrapper = mount(
      <Portal projectId="1" token="Cats" canAccessProject={CanAccessProjectSpy}>
        <div />
      </Portal>
    );

    await wait();
    expect(CanAccessProjectSpy.execute).toHaveBeenCalledWith("Cats", 1);
  });

  it("calls the requestToken use case", async () => {
    CanAccessProjectSpy = {
      execute: jest.fn(async () => {
        return {
          valid: false
        };
      })
    };
    let wrapper = mount(
      <Portal
        projectId="1"
        token="Cats"
        canAccessProject={CanAccessProjectSpy}
        requestToken={RequestTokenSpy}
      >
        <div />
      </Portal>
    );

    await wait();
    wrapper.update();
    let email_entry = wrapper.find('[data-test="email_input"]');
    await updateFormField(email_entry, "cats@cathouse.com");

    let submit_button = wrapper.find("form");
    submit_button.simulate("submit");

    await wait();
    wrapper.update();

    expect(RequestTokenSpy.execute).toHaveBeenCalledWith(
      "cats@cathouse.com",
      "1",
      "http://localhost/"
    );
  });

  it("calls the onApiKey callback", async () => {
    CanAccessProjectSpy = {
      execute: jest.fn(async () => {
        return {
          valid: true,
          apiKey: "Dogs"
        };
      })
    };
    let OnApiKey = jest.fn();
    let wrapper = mount(
      <Portal
        projectId="1"
        onApiKey={OnApiKey}
        token="Cats"
        canAccessProject={CanAccessProjectSpy}
        requestToken={RequestTokenSpy}
      >
        <div />
      </Portal>
    );
    await wait();
    wrapper.update();
    expect(OnApiKey).toHaveBeenCalledWith("Dogs");
  });

  it("shows getToken if use case returns false", async () => {
    CanAccessProjectSpy = {
      execute: jest.fn(async () => {
        return {
          valid: false
        };
      })
    };
    let wrapper = mount(
      <Portal
        projectId="1"
        token="Cats"
        canAccessProject={CanAccessProjectSpy}
      />
    );
    await wait();
    wrapper.update();
    expect(wrapper.find("GetToken").length).toEqual(1);
  });

  it("renders children if the use case returns true", async () => {
    CanAccessProjectSpy = {
      execute: jest.fn(async () => {
        return {
          valid: true,
          apiKey: "Cows"
        };
      })
    };

    let wrapper = mount(
      <Portal projectId="1" token="Cats" canAccessProject={CanAccessProjectSpy}>
        <h1>Hiya!</h1>
      </Portal>
    );
    await wait();
    wrapper.update();
    expect(wrapper.find("GetToken").length).toEqual(0);
  });
});

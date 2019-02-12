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
  let CanAccessMonitorSpy = {
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

  it("calls the CanAccessMonitor use case", async () => {
    mount(
      <Portal token="Cats" canAccessMonitor={CanAccessMonitorSpy}>
        <div />
      </Portal>
    );

    await wait();
    expect(CanAccessMonitorSpy.execute).toHaveBeenCalledWith("Cats");
  });

  it("calls the requestToken use case", async () => {
    CanAccessMonitorSpy = {
      execute: jest.fn(async () => {
        return {
          valid: false
        };
      })
    };
    let wrapper = mount(
      <Portal
        token="Cats"
        canAccessMonitor={CanAccessMonitorSpy}
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
      "http://localhost/"
    );
  });

  it("shows getToken if use case returns false", async () => {
    CanAccessMonitorSpy = {
      execute: jest.fn(async () => {
        return {
          valid: false
        };
      })
    };
    let wrapper = mount(
      <Portal
        token="Cats"
        canAccessMonitor={CanAccessMonitorSpy}
      />
    );
    await wait();
    wrapper.update();
    expect(wrapper.find("GetToken").length).toEqual(1);
  });

  it("renders children if the use case returns true", async () => {
    CanAccessMonitorSpy = {
      execute: jest.fn(async () => {
        return {
          valid: true,
          apiKey: "Cows"
        };
      })
    };

    let wrapper = mount(
      <Portal token="Cats" canAccessMonitor={CanAccessMonitorSpy}>
        <h1>Hiya!</h1>
      </Portal>
    );
    await wait();
    wrapper.update();
    expect(wrapper.find("GetToken").length).toEqual(0);
  });
});

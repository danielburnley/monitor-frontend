import React from "react";
import ProjectPortal from ".";
import { mount } from "enzyme";

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 100));
}

describe("ProjectPortal", () => {
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
      <ProjectPortal projectId="1" token="Cats" canAccessProject={CanAccessProjectSpy}>
        <div />
      </ProjectPortal>
    );

    await wait();
    expect(CanAccessProjectSpy.execute).toHaveBeenCalledWith("Cats", 1);
  });

  describe("Use Case returns false", () => {
    let wrapper;
    beforeEach(() => {
      CanAccessProjectSpy = {
        execute: jest.fn(async () => {
          return {
            valid: false
          };
        })
      };
      wrapper = mount(
        <ProjectPortal
          projectId="1"
          token="Cats"
          canAccessProject={CanAccessProjectSpy}
        />
      );
    });

    it("shows a button back to homepage ", async () => {
      await wait();
      wrapper.update();
      expect(wrapper.find('[data-test="back-to-homepage"]').length).toEqual(1);
    });
  
    it("shows a button to remove cookies", async () => {
      await wait();
      wrapper.update();
      expect(wrapper.find('[data-test="refresh-cookies"]').length).toEqual(1);
    });
  });

  describe("Use Case returns true", () => {
    let wrapper;
    beforeEach(() => {
      let CanAccessProjectSpy = {
        execute: jest.fn(async () => {
          return {
            valid: true,
            apiKey: "Cows"
          };
        })
      };
  
      wrapper = mount(
        <ProjectPortal projectId="1" token="Cats" canAccessProject={CanAccessProjectSpy}>
          <h1>Hiya!</h1>
        </ProjectPortal>
      );
    });

    it("renders children if the use case returns true", async () => {
      await wait();
      wrapper.update();
      expect(wrapper.find("GetToken").length).toEqual(0);
    });

    it("Renders a button to go back to homepage ", async () => {
      await wait();
      wrapper.update();
      expect(wrapper.find('[data-test="back-to-homepage"]').length).toEqual(1);
    });
  });

});

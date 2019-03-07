import React from "react";
import ClaimPage from ".";
import { mount } from "enzyme";

describe("ClaimPage", () => {
  describe("Waiting for usecase to respond", () => {
    it("is loading", () => {
      let wrap = mount(
      <ClaimPage
        match = {{params: { claimId: 1 }}}
        getClaim = {{execute: jest.fn()}}
      >
        {() => {}}
      </ClaimPage>)

      expect(wrap.find('[data-test="loading"]').length).toEqual(1)
    });
  }); 

  describe("Once the use case has responded", () => {
    let childrenSpy, generateSubmittedSchemaSpy, generateUISchemaSpy;
    beforeEach(() => {
      childrenSpy = jest.fn() 
      generateSubmittedSchemaSpy = {execute: jest.fn((data) => ({readonlySchema: "a have been submitted"}))}
      generateUISchemaSpy = {execute: jest.fn((data) => ({uischema: "some ui things"}))}
    });


    describe("Draft Status", () => {
      let claimData, wrap, getClaimSpy;
      beforeEach(() => {
        claimData = {
          type: "ac",
          status: "Draft",
          data: {
            claim: "Im a claim",
            data: "With some data"
          },
          schema: {
            type: "object",
            properties: {
              claim: {
                type: "string"
              },
              data: {
                type: "string"
              }
            }
          }
        }
        getClaimSpy = {execute: jest.fn((presenter, request) => presenter.presentClaim(claimData))};

        wrap = mount(
        <ClaimPage
          match = {{params: { claimId: 1,  projectId: 6}}}
          getClaim = {getClaimSpy}
          generateUiSchema = {generateUISchemaSpy}
        >
          {childrenSpy}
        </ClaimPage>)
      });
      it("finishes loading", () => {
        expect(wrap.find('[data-test="loading"]').length).toEqual(0)
      });
  
      it("renders it's children", () => {
        expect(childrenSpy).toHaveBeenCalled()
      });

      it("calls the get claim usecase", () => {
        expect(getClaimSpy.execute).toHaveBeenCalledWith(expect.anything(), { id: 1, projectId: 6})
      });
  
      it("passes it's children the data returned form the use case", () => {
        expect(childrenSpy).toBeCalledWith(
          expect.objectContaining({
            formData: claimData.data,
            type: claimData.type,
            schema: claimData.schema,
            status: claimData.status
          })
        )
      });
  
      it("calls the generate UI schema use case", () => {
        expect(generateUISchemaSpy.execute).toHaveBeenCalledWith(claimData.schema)
      });

      it("passes the ui schmea to it's children", () => {
        expect(childrenSpy).toBeCalledWith(
          expect.objectContaining({
            uiSchema: {uischema: "some ui things"}
          })
        )
      });
    });

    describe("New Status", () => {
      let baseClaimData, getBaseClaimSpy;
      beforeEach(() => {
        baseClaimData = {
          data: {
            claim: "Im a new claim",
            data: "With no data"
          },
          schema: {
            type: "object",
            properties: {
              claim: {
                type: "string"
              },
              data: {
                type: "string"
              }
            }
          }
        }

        getBaseClaimSpy = {execute: jest.fn((presenter, id) => presenter.presentClaim(baseClaimData))};
        mount(
        <ClaimPage
          match = {{params: {projectId: 5}}}
          getBaseClaim = {getBaseClaimSpy}
          generateUiSchema = {generateUISchemaSpy}
        >
          {childrenSpy}
        </ClaimPage>)
      });

      it("calls the get base claim usecase with the projectId", () => {
        expect(getBaseClaimSpy.execute).toHaveBeenCalledWith(expect.anything(), { projectId: 5 })
      });
  
      it("passes it's children the data returned form the get base claim use case", () => {
        expect(childrenSpy).toBeCalledWith(
          expect.objectContaining({
            formData: baseClaimData.data,
            schema: baseClaimData.schema,
            status: "New"
          })
        )
      });
    });

    describe("Submitted Status", () => {
      let claimData, getClaimSpy;
      beforeEach(() => {
        claimData = {
          type: "ac",
          status: "Submitted",
          data: {
            claim: "Im a claim",
            data: "With some data"
          },
          schema: {
            type: "object",
            properties: {
              claim: {
                type: "string"
              },
              data: {
                type: "string"
              }
            }
          }
        }
        generateUISchemaSpy = {execute: jest.fn((data) => ({uischema: "some ui things"}))}
        getClaimSpy = {execute: jest.fn((presenter, request) => presenter.presentClaim(claimData))};
        mount(
        <ClaimPage
          match = {{params: { claimId: 1, projectId: 6 }}}
          getClaim = {getClaimSpy}
          generateUiSchema = {generateUISchemaSpy}
          generateSubmittedUiSchema = {generateSubmittedSchemaSpy}
        >
          {childrenSpy}
        </ClaimPage>)
      });

      it("calls the generate UI schema use case", () => {
        expect(generateSubmittedSchemaSpy.execute).toHaveBeenCalledWith(claimData.schema)
      });

      it("passes the ui schema from generarate submitted ui schema use case to it's children", () => {
        expect(childrenSpy).toBeCalledWith(
          expect.objectContaining({
            uiSchema: {readonlySchema: "a have been submitted"}
          })
        )
      });
    });
  });
});
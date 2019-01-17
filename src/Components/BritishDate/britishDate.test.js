import React from "react";
import BritishDate from ".";
import { mount } from "enzyme";

describe("<BritishDate>", () => {
  let onChangeSpy = jest.fn();

  it("Given no value", () => {
    let wrapper = mount(<BritishDate onChange={onChangeSpy}/>);

    expect(wrapper.find("input").at(0).props().value).toEqual("");
    expect(wrapper.find("input").at(1).props().value).toEqual("");
    expect(wrapper.find("input").at(2).props().value).toEqual("");
  });

  describe("Displays empty field if zero", () => {
    it("All empty", () => {
      let wrapper = mount(<BritishDate value="0000-00-00" onChange={onChangeSpy}/>);

      expect(wrapper.find("input").at(0).props().value).toEqual("");
      expect(wrapper.find("input").at(1).props().value).toEqual("");
      expect(wrapper.find("input").at(2).props().value).toEqual("");
    });

    it("Day filled", () => {
      let wrapper = mount(<BritishDate value="0000-00-15" onChange={onChangeSpy}/>);

      expect(wrapper.find("input").at(0).props().value).toEqual("15");
      expect(wrapper.find("input").at(1).props().value).toEqual("");
      expect(wrapper.find("input").at(2).props().value).toEqual("");
    });

    it("Month filled", () => {
      let wrapper = mount(<BritishDate value="0000-10-00" onChange={onChangeSpy}/>);

      expect(wrapper.find("input").at(0).props().value).toEqual("");
      expect(wrapper.find("input").at(1).props().value).toEqual("10");
      expect(wrapper.find("input").at(2).props().value).toEqual("");
    });

    it("Year filled", () => {
      let wrapper = mount(<BritishDate value="2000-00-00" onChange={onChangeSpy}/>);

      expect(wrapper.find("input").at(0).props().value).toEqual("");
      expect(wrapper.find("input").at(1).props().value).toEqual("");
      expect(wrapper.find("input").at(2).props().value).toEqual("2000");
    });
  });

  describe("Converts data to iso date format", () => {
    it("Example 1", () => {
      let wrapper = mount(<BritishDate value="08/07/2019" onChange={onChangeSpy}/>);

      expect(wrapper.find("input").at(0).props().value).toEqual("08");
      expect(wrapper.find("input").at(1).props().value).toEqual("07");
      expect(wrapper.find("input").at(2).props().value).toEqual("2019");
      expect
    });

    it("Example 2", () => {
      let wrapper = mount(<BritishDate value="30/09/2019" onChange={onChangeSpy}/>);

      expect(wrapper.find("input").at(0).props().value).toEqual("30");
      expect(wrapper.find("input").at(1).props().value).toEqual("09");
      expect(wrapper.find("input").at(2).props().value).toEqual("2019");
      expect
    });
  });

  describe("Displays ISO 8601 date in British format", () => {
    it("Example 1", () => {
      let wrapper = mount(<BritishDate value="2000-08-25" onChange={onChangeSpy}/>);

      expect(wrapper.find("input").at(0).props().value).toEqual("25");
      expect(wrapper.find("input").at(1).props().value).toEqual("08");
      expect(wrapper.find("input").at(2).props().value).toEqual("2000");
    });

    it("Example 2", () => {
      let wrapper = mount(<BritishDate value="2007-06-29" onChange={onChangeSpy}/>);

      expect(wrapper.find("input").at(0).props().value).toEqual("29");
      expect(wrapper.find("input").at(1).props().value).toEqual("06");
      expect(wrapper.find("input").at(2).props().value).toEqual("2007");
    });
  });

  describe("Triggers onChange", () => {
    describe("For year", () => {
      it("Simple", async () => {
        let wrapper = mount(<BritishDate value="2007-06-29" onChange={onChangeSpy}/>);

        wrapper.find("input").at(2).simulate("change", {target: {value: "578"}});
        await wrapper.update();

        expect(onChangeSpy).toHaveBeenCalledWith("0578-06-29");
      });

      it("Empty", async () => {
        let wrapper = mount(<BritishDate value="2007-06-29" onChange={onChangeSpy}/>);

        wrapper.find("input").at(2).simulate("change", {target: {value: ""}});
        await wrapper.update();

        expect(onChangeSpy).toHaveBeenCalledWith("0000-06-29");
      });

      it("With leading zeroes", async () => {
        let wrapper = mount(<BritishDate value="2007-06-29" onChange={onChangeSpy}/>);

        wrapper.find("input").at(2).simulate("change", {target: {value: "00478"}});
        await wrapper.update();

        expect(onChangeSpy).toHaveBeenCalledWith("0478-06-29");
      });

      it("With invalid year", async () => {
        let wrapper = mount(<BritishDate value="2007-06-29" onChange={onChangeSpy}/>);

        wrapper.find("input").at(2).simulate("change", {target: {value: "20007"}});
        await wrapper.update();

        expect(onChangeSpy).toHaveBeenCalledWith("2007-06-29");
      });
    });

    describe("For month", () => {
      it("Simple", async () => {
        let wrapper = mount(<BritishDate value="2007-06-29" onChange={onChangeSpy}/>);

        wrapper.find("input").at(1).simulate("change", {target: {value: "1"}});
        await wrapper.update();

        expect(onChangeSpy).toHaveBeenCalledWith("2007-01-29");
      });

      it("Empty", async () => {
        let wrapper = mount(<BritishDate value="2007-06-29" onChange={onChangeSpy}/>);

        wrapper.find("input").at(1).simulate("change", {target: {value: ""}});
        await wrapper.update();

        expect(onChangeSpy).toHaveBeenCalledWith("2007-00-29");
      });

      it("With leading zeroes", async () => {
        let wrapper = mount(<BritishDate value="2007-06-29" onChange={onChangeSpy}/>);

        wrapper.find("input").at(1).simulate("change", {target: {value: "00009"}});
        await wrapper.update();

        expect(onChangeSpy).toHaveBeenCalledWith("2007-09-29");
      });

      it("With invalid month", async () => {
        let wrapper = mount(<BritishDate value="2007-06-29" onChange={onChangeSpy}/>);

        wrapper.find("input").at(1).simulate("change", {target: {value: "31"}});
        await wrapper.update();

        expect(onChangeSpy).toHaveBeenCalledWith("2007-06-29");
      });
    });

    describe("For day", () => {
      it("Simple", async () => {
        let wrapper = mount(<BritishDate value="2007-06-29" onChange={onChangeSpy}/>);

        wrapper.find("input").at(0).simulate("change", {target: {value: "16"}});
        await wrapper.update();

        expect(onChangeSpy).toHaveBeenCalledWith("2007-06-16");
      });

      it("Empty", async () => {
        let wrapper = mount(<BritishDate value="2007-06-29" onChange={onChangeSpy}/>);

        wrapper.find("input").at(0).simulate("change", {target: {value: ""}});
        await wrapper.update();

        expect(onChangeSpy).toHaveBeenCalledWith("2007-06-00");
      });

      it("With leading zeroes", async () => {
        let wrapper = mount(<BritishDate value="2007-06-29" onChange={onChangeSpy}/>);

        wrapper.find("input").at(0).simulate("change", {target: {value: "00003"}});
        await wrapper.update();

        expect(onChangeSpy).toHaveBeenCalledWith("2007-06-03");
      });

      it("With invalid day", async () => {
        let wrapper = mount(<BritishDate value="2007-06-29" onChange={onChangeSpy}/>);

        wrapper.find("input").at(0).simulate("change", {target: {value: "32"}});
        await wrapper.update();

        expect(onChangeSpy).toHaveBeenCalledWith("2007-06-29");
      });
    });
  });

  describe("Readonly", () => {
    describe("Can be made readonly", async () => {
      it("When disabled with ui:disabled uiSchema property", async () => {
        let wrapper = mount(<BritishDate
          value="2007/06/29"
          onChange={onChangeSpy}
          uiSchema={{ "ui:disabled": true }}
        />);

        await wrapper.update();
        expect(wrapper.find("[data-test='date-day']").props().readOnly).toEqual(true);
        expect(wrapper.find("[data-test='date-month']").props().readOnly).toEqual(true);
        expect(wrapper.find("[data-test='date-year']").props().readOnly).toEqual(true);
      });

      describe("When disabled with .readonly schema property", () => {
        it("With an empty uiSchema", async () => {
          let wrapper = mount(<BritishDate
              value="2007/06/29"
              onChange={onChangeSpy}
              uiSchema={{}}
              schema={
                {
                  readonly: true
                }
              }
            />);

            await wrapper.update();
            expect(wrapper.find("[data-test='date-day']").props().readOnly).toEqual(true);
            expect(wrapper.find("[data-test='date-month']").props().readOnly).toEqual(true);
            expect(wrapper.find("[data-test='date-year']").props().readOnly).toEqual(true);
          });

          it("With no uiSchema", async () => {
            let wrapper = mount(<BritishDate
              value="2007/06/29"
              onChange={onChangeSpy}
              schema={
                {
                  readonly: true
                }
              }
              />
            );

            await wrapper.update();
            expect(wrapper.find("[data-test='date-day']").props().readOnly).toEqual(true);
            expect(wrapper.find("[data-test='date-month']").props().readOnly).toEqual(true);
            expect(wrapper.find("[data-test='date-year']").props().readOnly).toEqual(true);
          });
      });


      it("Doesn't disable input when not readonly", async () => {
        let wrapper = mount(<BritishDate
          value="2007/06/29"
          onChange={onChangeSpy}
          uiSchema={{}}
        />);

        await wrapper.update();
        expect(wrapper.find("[data-test='date-day']").props().readOnly).toBeFalsy();
        expect(wrapper.find("[data-test='date-month']").props().readOnly).toBeFalsy();
        expect(wrapper.find("[data-test='date-year']").props().readOnly).toBeFalsy();
      });
    });
  });
});

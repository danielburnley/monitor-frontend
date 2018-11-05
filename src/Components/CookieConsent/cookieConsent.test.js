import React from "react";
import CookieConsent from '.';
import { shallow } from "enzyme";

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 100));
}

describe("<CookieConsent>", async () => {
  it("It does not display anything initially", async () => {
    let showCookieConsent = {execute: jest.fn(async (presenter) => {})};
    let cookieConsent = shallow(<CookieConsent showCookieConsent={showCookieConsent}/>);
    await wait();
    expect(showCookieConsent.execute).toHaveBeenCalledWith(expect.anything());
    expect(cookieConsent.find("[data-test='cookie-notice']").length).toEqual(0);
  });

  it("Displays the notice", async () => {
    let showCookieConsent = {execute: jest.fn(async (presenter) => {presenter.show();})};
    let cookieConsent = shallow(<CookieConsent showCookieConsent={showCookieConsent}/>);
    await wait();
    expect(showCookieConsent.execute).toHaveBeenCalledWith(expect.anything());
    expect(cookieConsent.find("[data-test='cookie-notice']").length).toEqual(1);
  })
});

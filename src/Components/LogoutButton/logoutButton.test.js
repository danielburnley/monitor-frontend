import LogoutButton from ".";
import React from "react";
import { mount, shallow } from "enzyme";

describe("<LogoutButton>", () => {
  it("Executes the usecase", () => {
    let logoutUsecaseSpy = {
      execute: jest.fn((presenter) => {presenter.userLoggedOut()})
    };
    let onLogoutSpy = jest.fn();
    let wrap = mount(
      <LogoutButton logoutUsecase={logoutUsecaseSpy} onLogout={onLogoutSpy}/>
    );
    wrap.find('button').simulate('click');
    expect(logoutUsecaseSpy.execute).toHaveBeenCalledWith(expect.anything());
  });

  it("Calls the onLogout callback", () => {
    let logoutUsecaseSpy = {
      execute: jest.fn((presenter) => {presenter.userLoggedOut()})
    };
    let onLogoutSpy = jest.fn();
    let wrap = mount(
      <LogoutButton logoutUsecase={logoutUsecaseSpy} onLogout={onLogoutSpy}/>
    );
    wrap.find('button').simulate('click');
    expect(onLogoutSpy).toHaveBeenCalled();
  });
});

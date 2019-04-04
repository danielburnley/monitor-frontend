import CookieApiKey from ".";
import Cookies from "js-cookie";

describe("CookieApiKey", () => {
  let cookies = new Cookies();
  describe("example 1", () => {
    it("gets a saved api key", async () => {
      let cookieApiKey = new CookieApiKey(cookies);
      cookieApiKey.setApiKey("14159265358");
      expect(cookieApiKey.getApiKey().apiKey).toEqual("14159265358");
    });

    it("clears a saved api key", async () => {
      let cookieApiKey = new CookieApiKey(cookies);
      Cookies.set("apikey", "141592653589793");
      cookieApiKey.clear();
      expect(cookieApiKey.getApiKey().apiKey).toEqual(undefined);
    });
  });

  describe("example 2", () => {
    it("gets a saved api key", async () => {
      let cookieApiKey = new CookieApiKey(cookies);
      cookieApiKey.setApiKey("28318530717");
      expect(cookieApiKey.getApiKey().apiKey).toEqual("28318530717");
    });

    it("clears a saved api key", async () => {
      let cookieApiKey = new CookieApiKey(cookies);
      Cookies.set("apikey", "283185307179586");
      cookieApiKey.clear();
      expect(cookieApiKey.getApiKey().apiKey).toEqual(undefined);
    });
  });
});

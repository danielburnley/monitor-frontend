import ApiKey from "../../Domain/ApiKey";
import Cookies from "js-cookie";

export default class CookieApiKey {
  setApiKey(apikey) {
    Cookies.set("apikey", apikey, {expires: 365});
  }

  clear() {
    Cookies.remove("apikey");
  }

  getApiKey() {
    return new ApiKey(Cookies.get("apikey"));
  }
}

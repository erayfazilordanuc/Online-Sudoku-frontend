import { deleteCookie, getCookie, getCookies, setCookie } from "cookies-next";

class CookieService {
  private _domain = "localhost";

  getCookies(options: String) {
    return getCookies({
      domain: this._domain,
    });
  }
  setCookie(key: string, data: unknown) {
    setCookie(key, data, {
      domain: this._domain,
    });
  }
  deleteCookie(key: string) {
    deleteCookie(key, {
      domain: this._domain,
    });
  }
  getCookie(key: string) {
    return getCookie(key, {
      domain: this._domain,
    });
  }
}

export const cookieService = new CookieService();

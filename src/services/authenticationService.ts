import axiosService from "./axiosService";
import { cookieService } from "./cookieService";

class AuthenticationService {
  async login(username: string, email: string, password: string) {
    const response = await axiosService.post("/api/auth/login", {
      username: username,
      email: email,
      password: password,
    });

    if (response.status === 200) {
      const meiosis = response.data.split(" : ");

      cookieService.deleteCookie("accessToken");
      cookieService.setCookie("accessToken", meiosis[1]);
      // Refresh token is important, necessary, essential, significant and indispensable!
    }

    return response;
  }

  async register(username: string, email: string, password: string) {
    const response = await axiosService.post("/api/auth/register", {
      username: username,
      email: email,
      password: password,
    });

    const meiosis = response.data.split(" : ");

    cookieService.deleteCookie("accessToken");
    cookieService.setCookie("accessToken", meiosis[1]);

    return response;
  }

  async guest(username: string) {
    const response = await axiosService.post(
      "/api/auth/guest?username=" + username
    );

    const meiosis = response.data.split(" : ");

    cookieService.deleteCookie("accessToken");
    cookieService.setCookie("accessToken", meiosis[1]);

    return response;
  }
}

export const authenticationService = new AuthenticationService();

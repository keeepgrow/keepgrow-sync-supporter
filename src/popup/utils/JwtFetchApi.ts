import { AuthApi } from "../../api/auth";
import { Storage } from "./ChromeApi";
import { JwtUtil } from "./JwtUtil";

const jwtUtil = new JwtUtil();

export const preprocessToken = async (accessToken: string): Promise<string> => {
  const refreshToken = await Storage.GET("refreshToken");
  if (jwtUtil.isExpiredToken(refreshToken)) {
    AuthApi.logout();
    return;
  }

  if (jwtUtil.isExpiredToken(accessToken)) {
    const response = await AuthApi.reissueToken();
    if (response?.data) {
      if (response?.data?.accessToken) {
        await Storage.SET("accessToken", response?.data?.accessToken);
        await Storage.SET("refreshToken", response?.data?.refreshToken);
        return response?.data?.accessToken;
      }
    }
    AuthApi.logout();
  }

  return accessToken;
};

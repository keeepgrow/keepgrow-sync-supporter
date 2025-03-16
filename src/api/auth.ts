import AXIOS, { ApiResponse } from "../popup/utils/axios";
import { Storage } from "../popup/utils/ChromeApi";
import { JwtUtil } from "../popup/utils/JwtUtil";
import { fetchToBackground } from "./setting";

const jwtUtil = new JwtUtil();
export const AuthApi = {
  login: async (email: string, password: string): Promise<ApiResponse> => {
    return new Promise((resovle) => {
      fetchToBackground({
        path: "auth/login",
        data: { username: email, password },
        callback: (response) => {
          resovle(response);
        }
      });
    });
  },

  getUserData: async () => {
    const accessToken = await Storage.GET("accessToken");
    // 조건 하나 더 추가 될 수 있음
    if (!accessToken) {
      return false;
    }
    const decodedToken = jwtUtil.decode(accessToken);
    return decodedToken;
  },
  logout: async () => {
    Storage.DELETE("accessToken");
  },
  saveToken: async (accessToken: string, refreshToken: string) => {
    Storage.SET("accessToken", accessToken);
    Storage.SET("refreshToken", refreshToken);
  },
  reissueToken: async (): Promise<ApiResponse> => {
    return new Promise(() => {
      fetchToBackground({
        path: "auth/reissue"
      });
    });
  }
};

export const BGAuthApi = {
  login: async (data) => {
    try {
      const response = await AXIOS.AUTH_CLIENT.post("/api/auth/login", data);
      return response?.data;
    } catch (error) {
      return error?.response;
    }
  },

  reissueToken: async (): Promise<ApiResponse> => {
    const refreshToken = await Storage.GET("refreshToken");
    try {
      const response = await AXIOS.AUTH_CLIENT_NOPREPROCESS.post("/api/auth/reissue", {
        refreshToken
      });
      if (!response || response?.status !== 200) {
        AuthApi.logout();
        return;
      }
      return response?.data;
    } catch (error) {
      return error?.response;
    }
  }
};

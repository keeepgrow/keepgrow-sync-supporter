import axios, { AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";
import { Storage } from "./ChromeApi";
import { adminUrl, authUrl, clientUrl } from "./fetchurl";
import { preprocessToken } from "./JwtFetchApi";
import { AuthApi } from "../../api/auth";

const OpenPanelService = {
  save: (page) => Storage.SET("openSidePanel", page)
};

export type ApiResponse = {
  code?: string;
  message: string;
  status: number;
  data: any;
};

interface AxiosInstanceConfig {
  baseURL: string;
  headers?: Record<string, string>;
  timeout?: number;
}

export const createAxiosInstance = ({
  baseURL,
  headers = {},
  timeout = 5000 // 기본 timeout을 5초로 설정
}: AxiosInstanceConfig): AxiosInstance => {
  return axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      ...headers
    },
    timeout // timeout 설정 추가
  });
};

export const AXIOS = {
  BASIC: createAxiosInstance({ baseURL: "" }),
  CLIENT: createAxiosInstance({ baseURL: clientUrl }),

  AUTH_CLIENT: createAxiosInstance({
    baseURL: authUrl,
    headers: { Client: "GCX" }
  }),
  AUTH_CLIENT_NOPREPROCESS: createAxiosInstance({
    baseURL: authUrl,
    headers: { Client: "GCX" }
  }),

  //
  ADMIN: createAxiosInstance({ baseURL: adminUrl }),
  ADMIN_PROJECT: createAxiosInstance({ baseURL: adminUrl }),

  ADMIN_NOHANDLER: createAxiosInstance({ baseURL: adminUrl }),
  ADMIN_PROJECT_NOHANDLER: createAxiosInstance({ baseURL: adminUrl })
};

const handleRequest = async ({ config, preProcess = true, bearerToken = true }): Promise<AxiosRequestConfig> => {
  let accessToken = await Storage.GET("accessToken");

  if (accessToken && preProcess) {
    accessToken = await preprocessToken(accessToken);
  }

  if (accessToken && bearerToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};

const setupInterceptors = ({
  instance,
  withProjectId = false,
  preProcess = true,
  bearerToken = true,
  errorHandler = true
}) => {
  instance.interceptors.request.use(async (config: any) => {
    config = await handleRequest({ config, preProcess, bearerToken });

    // if (withProjectId) config = setProjectHeader(config);

    return config;
  });

  if (errorHandler) {
    instance.interceptors.response.use(handleResponse, handleError);
  } else {
    instance.interceptors.response.use(handleEasyResponse, handleEasyError);
  }
};

const handleResponse = (response: AxiosResponse) => {
  if (response?.status === 401) {
    AuthApi.logout();
  }

  if (response?.status === 500) {
    OpenPanelService.save("error?status=500");
  }

  if (response?.status === 404) {
    OpenPanelService.save("error?status=404");
  }

  if (response?.data?.status === -4011 || response?.data?.status === -4013) {
    AuthApi.logout();
  }
  if (response?.data?.status === 500) {
    OpenPanelService.save("/error?status=500");
  }

  return response;
};

const handleError = (error: AxiosError) => {
  if (error?.response?.status === 401) {
    AuthApi.logout();
    return;
  }
  if (error?.response?.status === 400) {
    return Promise.reject(error);
  }

  OpenPanelService.save(`/error?status=${error?.response.status}&url=${error?.response?.request?.url}`);
  return Promise.reject(error);
};

const handleEasyResponse = (response: AxiosResponse) => {
  if (response?.status === 401) {
    AuthApi.logout();
  }
  if (response?.data?.status === -4011 || response?.data?.status === -4013) {
    AuthApi.logout();
  }

  return response;
};

const handleEasyError = (error: AxiosError) => {
  if (error?.response?.status === 401) {
    AuthApi.logout();
    return;
  }

  return Promise.reject(error);
};

// Setup interceptors for all instances

const withProjectIdList = ["ADMIN_WITH_PROJECT"];
const noPreprocessList = ["AUTH_CLIENT_NOPREPROCESS"];
const noTokenList = ["GPT", "GPT_OLD", "AUTH_CLIENT_NOPREPROCESS"];
const noHandlerList = ["ADMIN_NOHANDLER", "ADMIN_PROJECT_NOHANDLER"];

Object.entries(AXIOS).forEach(([key, instance]) => {
  setupInterceptors({
    instance,
    withProjectId: withProjectIdList.includes(key),
    preProcess: !noPreprocessList.includes(key),
    bearerToken: !noTokenList.includes(key),
    errorHandler: !noHandlerList.includes(key)
  });
});

export default AXIOS;

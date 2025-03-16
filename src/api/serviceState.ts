import { ServiceState } from "../popup/store/_trash/serviceState";
import { Storage } from "../popup/utils/ChromeApi";
import { fetchToBackground } from "./setting";

export const ServiceStateApi = {
  get: async (): Promise<ServiceState> => {
    return new Promise((resovle) => {
      fetchToBackground({
        path: "service/get",
        callback: (response) => {
          resovle(response);
        }
      });
    });
  },
  updateWidgetState: async (widgetState: boolean) => {
    Storage.SET("widgetState", widgetState);

    return new Promise((resovle) => {
      fetchToBackground({
        path: "service/updateWidgetState",
        data: { widgetState }
      });
    });
  }
};

export const BGServiceStateApi = {
  get: async (): Promise<ServiceState> => {
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({
            widgetState: true
          }),
        300
      );
    });
  },
  updateWidgetState: async (widgetState: boolean) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ widgetState }), 300);
    });
  }
};

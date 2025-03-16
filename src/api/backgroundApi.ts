import { BGAuthApi } from "./auth";
import { BGServiceStateApi } from "./serviceState";

export const bgApiExcute = async (message, sendResponse) => {
  const { path, data } = message;

  const [apiRoot, apiName] = path.split("/");

  try {
    const response = await mapApiRoot[apiRoot][apiName](data);
    return response;
  } catch (e) {
    sendResponse({
      status: "BACKGROUND_ERROR",
    });
  }
};

const mapApiRoot = {
  auth: BGAuthApi,
  service: BGServiceStateApi,
};

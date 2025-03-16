import { bgApiExcute } from "../api/backgroundApi";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  bgApiExcute(message, sendResponse).then((res) => {
    return sendResponse(res);
  });
  return true;
});

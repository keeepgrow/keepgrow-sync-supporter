// const sendMessagePromiseToBackground = (message: Message) => {
//   return new Promise((resolve, reject) => {
//     chrome.runtime.sendMessage(message, (response) => {
//       if (chrome.runtime.lastError) {
//         reject(chrome.runtime.lastError);
//       } else {
//         resolve(response);
//       }
//     });
//   });
// };

const saveLocalStorage = (key: string, value: any): Promise<void> => {
  const obj = {};
  obj[key] = value;
  return chrome.storage.local.set(obj);
};

const getLocalStorage = (key: string): Promise<{ [key: string]: any }> => {
  return chrome.storage.local.get(key);
};

const removeLocalStorage = (key: string): Promise<void> => {
  return chrome.storage.local.remove(key);
};

const clearLocalStorage = (): Promise<void> => {
  return chrome.storage.local.clear();
};

const getUrl = (url: string) => {
  return chrome.runtime.getURL(url);
};
const getImageUrls = (prefix: string, endIndex: number) => {
  const urls = [];
  for (let i = 1; i <= endIndex; i++) {
    urls.push(`${prefix}${i}.png`);
  }

  return urls.map((url) => chrome.runtime.getURL(url));
};

const clearStorageWithoutAuth = async () => {
  const storage = await chrome.storage.local.get();
  const keys = Object.keys(storage).filter((key) => key !== "auth");
  chrome.storage.local.remove(keys);
};

export const Storage = {
  SET: saveLocalStorage,
  get: getLocalStorage,
  DELETE: removeLocalStorage,
  clear: clearLocalStorage,

  clearWithoutAuth: clearStorageWithoutAuth,

  GET: async (key: string): Promise<string> => {
    const storage = await chrome.storage.local.get(key);
    return storage[key] || "";
  },

  UPDATE: async (key: string, value: any): Promise<void> => {
    Storage.DELETE(key);
    Storage.SET(key, value);
  },
};

const setBadge = () => {
  chrome.action.setBadgeText({ text: "!" });
};
const deleteBadge = () => {
  chrome.action.setBadgeText({ text: "" });
};

const reloadPage = (): Promise<void> => {
  return new Promise((resolve) => {
    if (!chrome.tabs) return;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) return;

      const activeTab = tabs[0];
      if (typeof activeTab.id !== "number") {
        return;
      }

      chrome.tabs.reload(activeTab.id, {}, () => {
        if (!chrome.runtime.lastError) {
          resolve();
        }
      });
    });
  });
};

export const Chrome = {
  getUrl,
  getImageUrls,
  setBadge,
  deleteBadge,
  reloadPage,
};

export { saveLocalStorage, removeLocalStorage, clearLocalStorage };

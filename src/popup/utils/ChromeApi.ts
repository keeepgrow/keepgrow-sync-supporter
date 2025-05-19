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

  /**
   * 특정 key의 값이 변경될 때마다 콜백을 실행하는 구독 함수
   * @param key 구독할 storage key
   * @param callback 변경 시 실행할 함수 (newValue, oldValue)
   * @returns unsubscribe 함수
   */
  subscribe: (key: string, callback: (newValue: any, oldValue: any) => void) => {
    const handler = (changes: { [key: string]: chrome.storage.StorageChange }, areaName: string) => {
      if (areaName === "local" && changes[key]) {
        callback(changes[key].newValue, changes[key].oldValue);
      }
    };
    chrome.storage.onChanged.addListener(handler);
    // 구독 해제 함수 반환
    return () => chrome.storage.onChanged.removeListener(handler);
  }
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
  reloadPage
};

export { saveLocalStorage, removeLocalStorage, clearLocalStorage };

// 상태 변경 이벤트 detail 타입 정의
export type StatusChangeEventDetail = {
  key: string;
  value: string;
};

// statusChange 커스텀 이벤트 디스패처 함수
export const dispatchStatusChangeEvent = (key: string, value: string) => {
  const event = new CustomEvent<StatusChangeEventDetail>("statusChange", {
    detail: {
      key,
      value
    }
  });
  document.dispatchEvent(event);
};

export const runWhenDomReady = (fn: () => void) => {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    fn();
    return;
  }
  document.addEventListener("DOMContentLoaded", fn);
};

interface Request {
  path: string;
  data?: any;
  callback?: any;
}

export const fetchToBackground = (request: Request): void => {
  const { path, data, callback } = request;

  chrome.runtime.sendMessage({ path, data }, callback ?? null);
};

interface Message {
  context: string;
  data?: any;
}

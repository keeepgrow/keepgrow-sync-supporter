import { useEffect, useState } from "react";
import { Chrome, Storage } from "../utils/ChromeApi";
import { Note } from "./note";

export const STORAGE_QA_KEY = "kgQAData";

export class QAData {
  hosting: "cafe24" | "imweb";
  step: number;
  userInfo?: { id: string; password: string };
  domain?: string;

  // 계류페이지
  pendingPage?: boolean;
  mappingLogin?: boolean;
  smartLogin?: boolean;
  
  constructor(qaData?: QAData) {
    if (!qaData) {
      return;
    }
    this.hosting = qaData?.hosting;
    this.step = qaData?.step || 1;
    this.userInfo = qaData?.userInfo;
    this.domain = qaData?.domain;
  }
}

export const useQAData = () => {
  const [qaData, setQAData] = useState<QAData>();

  const init = async () => {
    const data = await Storage.GET(STORAGE_QA_KEY);
    if (!data) {
      return;
    }

    try {
      const qaData = JSON.parse(data);
      setQAData(new QAData(qaData));
    } catch (e) {
      return;
    }
  };

  const endQA = () => {
    Storage.DELETE(STORAGE_QA_KEY);
    Chrome.reloadPage();
  };
  const startQA = (hosting) => {
    Storage.SET(STORAGE_QA_KEY, JSON.stringify({ hosting, step: 1 }));

    Chrome.reloadPage();
  };

  useEffect(() => {
    init();
  }, []);

  const getQAData = async () => {
    try {
      const data = await Storage.GET(STORAGE_QA_KEY);
      const result = JSON.parse(data);
      setQAData(new QAData(result));
      return result;
    } catch (e) {
      return;
    }
  };

  return {
    getQAData,
    qaData,
    startQA,
    endQA
  };
};

export const getQAData = async () => {
  try {
    const data = await Storage.GET(STORAGE_QA_KEY);
    const result = JSON.parse(data);
    return result;
  } catch (e) {
    return;
  }
};

useQAData.endQA = () => {
  Storage.DELETE(STORAGE_QA_KEY);
  Note.delete();
  window.location.reload();
};

useQAData.update = async (type, value) => {
  const data = await getQAData();
  if (!data) return false;

  data[type] = value;
  const patchData = JSON.stringify(data);
  await Storage.SET(STORAGE_QA_KEY, patchData);
  return patchData;
};

useQAData.updateDomain = async (domain) => {
  const data = await getQAData();
  if (!data) return false;

  data.domain = domain;
  const patchData = JSON.stringify(data);
  await Storage.SET(STORAGE_QA_KEY, patchData);
  return patchData;
};

useQAData.updateJsKey = async (jsKey) => {
  const data = await getQAData();
  if (!data) return false;

  data.jsKey = jsKey;
  const patchData = JSON.stringify(data);
  await Storage.SET(STORAGE_QA_KEY, patchData);
  return patchData;
};

useQAData.updateStep = async (step, navigate?) => {
  const data = await getQAData();
  if (!data) return;

  data.step = step;
  Storage.SET(STORAGE_QA_KEY, JSON.stringify(data));
  if (navigate) {
    navigate(`/qa/${data.hosting}/${step}`);
  }
};

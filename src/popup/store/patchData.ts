import { useEffect, useState } from "react";
import { Chrome, Storage } from "../utils/ChromeApi";
import { Note } from "./note";

export const STORAGE_PATCH_KEY = "kgPatchData";

export class PatchData {
  hosting: "cafe24" | "imweb" | "makeshop";
  step: number;
  processesNumber?: number;
  userInfo?: { id: string; password: string };
  script?: string;
  domain?: string;
  jsKey?: string;
  constructor(patchData?: PatchData) {
    if (!patchData) {
      return;
    }
    this.hosting = patchData?.hosting;
    this.step = patchData?.step || 1;
    this.processesNumber = patchData?.processesNumber;
    this.userInfo = patchData?.userInfo;
    this.script = patchData?.script;
    this.domain = patchData?.domain;
    this.jsKey = patchData?.jsKey;
  }
}

export const usePatchData = () => {
  const [patchData, setPatchData] = useState<PatchData>();

  const init = async () => {
    const data = await Storage.GET(STORAGE_PATCH_KEY);
    if (!data) {
      return;
    }

    try {
      const patchData = JSON.parse(data);
      setPatchData(new PatchData(patchData));
    } catch (e) {
      return;
    }
  };

  const endPatch = () => {
    Storage.DELETE(STORAGE_PATCH_KEY);
    Chrome.reloadPage();
  };
  const startPatch = (hosting) => {
    Storage.SET(STORAGE_PATCH_KEY, JSON.stringify({ hosting, step: 1 }));

    Chrome.reloadPage();
  };

  useEffect(() => {
    init();
  }, []);

  const getPatchData = async () => {
    try {
      const data = await Storage.GET(STORAGE_PATCH_KEY);
      const result = JSON.parse(data);
      setPatchData(new PatchData(result));
      return result;
    } catch (e) {
      return;
    }
  };

  return {
    getPatchData,
    patchData,
    startPatch,
    endPatch
  };
};

export const getPatchData = async () => {
  try {
    const data = await Storage.GET(STORAGE_PATCH_KEY);
    const result = JSON.parse(data);
    return result;
  } catch (e) {
    return;
  }
};

usePatchData.endPatch = () => {
  Storage.DELETE(STORAGE_PATCH_KEY);
  Note.delete();
  window.location.reload();
};

usePatchData.updateDomain = async (domain) => {
  const data = await getPatchData();
  if (!data) return false;

  data.domain = domain;
  const patchData = JSON.stringify(data);
  await Storage.SET(STORAGE_PATCH_KEY, patchData);
  return patchData;
};

usePatchData.updateJsKey = async (jsKey) => {
  const data = await getPatchData();
  if (!data) return false;

  data.jsKey = jsKey;
  const patchData = JSON.stringify(data);
  await Storage.SET(STORAGE_PATCH_KEY, patchData);
  return patchData;
};

usePatchData.updateStep = async (step, navigate?) => {
  const data = await getPatchData();
  if (!data) return;

  data.step = step;
  Storage.SET(STORAGE_PATCH_KEY, JSON.stringify(data));
  if (navigate) {
    navigate(`/patch/${data.hosting}/${step}`);
  }
};
usePatchData.saveProcessesNumber = async (processesNumber) => {
  const data = await getPatchData();
  if (!data) return;

  data.processesNumber = processesNumber;
  Storage.SET(STORAGE_PATCH_KEY, JSON.stringify(data));
};

usePatchData.saveUserInfo = async ({ id, password }) => {
  const data = await getPatchData();
  if (!data) return;

  data.userInfo = { id, password };
  Storage.SET(STORAGE_PATCH_KEY, JSON.stringify(data));
};

usePatchData.saveScript = async (script) => {
  const data = await getPatchData();
  if (!data) return;

  data.script = script;
  Storage.SET(STORAGE_PATCH_KEY, JSON.stringify(data));
};

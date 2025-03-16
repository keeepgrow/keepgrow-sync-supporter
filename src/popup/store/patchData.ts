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

  return {
    getPatchData,
    patchData,
    startPatch,
    endPatch
  };
};

usePatchData.endPatch = () => {
  Storage.DELETE(STORAGE_PATCH_KEY);
  Note.delete();
  window.location.reload();
};

export const getPatchData = async () => {
  try {
    const data = await Storage.GET(STORAGE_PATCH_KEY);
    return JSON.parse(data);
  } catch (e) {
    return;
  }
};
usePatchData.updateDomain = async (domain) => {
  const data = await getPatchData();
  if (!data) return false;

  data.domain = domain;
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

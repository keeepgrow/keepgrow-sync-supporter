import { getPatchData } from "../popup/store/patchData";
import { SidepanelService } from "./utils/sidepanel";
import { AuthApi } from "../api/auth";

const init = async () => {
  const isLogin = await AuthApi.getUserData();
  if (!isLogin) return;

  const patchData = await getPatchData();

  if (!patchData) return;

  document.body.appendChild(await SidepanelService.createPanel());
  document.body.appendChild(SidepanelService.createtIcon());
};
init();

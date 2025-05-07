import { getPatchData } from "../popup/store/patchData";
import { SidepanelService } from "./utils/sidepanel";
import { AuthApi } from "../api/auth";
import { getQAData } from "../popup/store/qaData";

const init = async () => {
  const isLogin = await AuthApi.getUserData();
  if (!isLogin) return;

  const qaData = await getQAData();

  const patchData = await getPatchData();

  if (patchData || qaData) {
    document.body.appendChild(await SidepanelService.createPanel());
    document.body.appendChild(SidepanelService.createtIcon());
    if (patchData) {
      console.log("%c킵그로우 패치 진행중", "color: blue; font-size: 20px;");
      return;
    }
    if (qaData) {
      console.log("%c킵그로우 QA 진행중", "color: #9d00ff; font-size: 20px;");
    }
  }
};
init();

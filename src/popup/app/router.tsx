import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import PopupLoginPage from "./login/page";
import PopupMainPage from "./main/page";
import PatchSelectPage from "./patch/page";
import PatchPage from "./patch/[hosting]/page";
import { usePatchData } from "../store/patchData";
import { AuthApi } from "../../api/auth";
import QAPopupMainPage from "./qa/page";
import QAPopupPage from "./qa/[hosting]/page";
import { getQAData } from "../store/qaData";

const PopupRouter = () => {
  const navigate = useNavigate();

  useEffect(() => {
    route();
  }, []);
  const { getPatchData } = usePatchData();

  const route = async () => {
    const isLogin = await AuthApi.getUserData();
    if (!isLogin) {
      return navigate("/login");
    }

    const patchData = await getPatchData();
    if (patchData) {
      return navigate(`/patch/${patchData.hosting}`);
    }
    
    const qaData = await getQAData();
    if (qaData) {
      return navigate(`/qa/${qaData.hosting}`);
    }

    return navigate("/main");
  };
  return (
    <Routes>
      <Route path="/login" element={<PopupLoginPage />} />
      <Route path="/main" element={<PopupMainPage />} />
      <Route path="/patch" element={<PatchSelectPage />} />
      <Route path="/patch/:hosting" element={<PatchPage />} />
      <Route path="/qa" element={<QAPopupMainPage />} />
      <Route path="/qa/:hosting" element={<QAPopupPage />} />
    </Routes>
  );
};

export default PopupRouter;

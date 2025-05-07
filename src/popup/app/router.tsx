import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import PopupLoginPage from "./login/page";
import PopupMainPage from "./main/page";
import PatchSelectPage from "./patch/page";
import PatchPage from "./patch/[hosting]/page";
import { usePatchData } from "../store/patchData";
import { AuthApi } from "../../api/auth";
import QAMainPage from "./qa/page";
import QAPage from "./qa/[hosting]/page";

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

    return navigate("/main");
  };
  return (
    <Routes>
      <Route path="/login" element={<PopupLoginPage />} />
      <Route path="/main" element={<PopupMainPage />} />
      <Route path="/patch" element={<PatchSelectPage />} />
      <Route path="/patch/:hosting" element={<PatchPage />} />
      <Route path="/qa" element={<QAMainPage />} />
      <Route path="/qa/:hosting" element={<QAPage />} />
    </Routes>
  );
};

export default PopupRouter;

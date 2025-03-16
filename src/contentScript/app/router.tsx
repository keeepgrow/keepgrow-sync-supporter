import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import MainPage from "./main/page";
import { usePatchData } from "../../popup/store/patchData";
import PatchCafe24Page from "./patch/cafe24/page";

const Router = () => {
  const navigate = useNavigate();

  useEffect(() => {
    route();
  }, []);

  const { getPatchData } = usePatchData();
  const route = async () => {
    const patchData = await getPatchData();
    if (patchData) {
      return navigate(
        `/patch/${patchData.hosting}/${Number(patchData.step || 1)}`
      );
    }

    return navigate("/main");
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/patch/cafe24/:step" element={<PatchCafe24Page />} />
      </Routes>
    </>
  );
};

export default Router;

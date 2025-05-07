import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { usePatchData } from "../../popup/store/patchData";
import PatchCafe24Page from "./patch/cafe24/page";
import PatchImwebPage from "./patch/imweb/page";
import { getQAData } from "../../popup/store/qaData";
import QAPage from "./qa/page";

const Router = () => {
  const navigate = useNavigate();

  useEffect(() => {
    route();
  }, []);

  const { getPatchData } = usePatchData();
  const route = async () => {
    const patchData = await getPatchData();
    console.log(patchData);
    if (patchData) {
      return navigate(`/patch/${patchData.hosting}/${Number(patchData.step || 1)}`);
    }

    const qaData = await getQAData();
    if (qaData) {
      return navigate(`/qa/${qaData.hosting}/${Number(qaData.step || 1)}`);
    }

    return navigate("/");
  };

  return (
    <>
      <Routes>
        <Route path="/patch/cafe24/:step" element={<PatchCafe24Page />} />
        <Route path="/patch/imweb/:step" element={<PatchImwebPage />} />
        <Route path="/qa/:hosting/:step" element={<QAPage />} />
      </Routes>
    </>
  );
};

export default Router;

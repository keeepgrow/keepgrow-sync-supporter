import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PatchStepHeader from "../../../components/patch/StepHeader";

import PatchNote from "../../../components/patch/Note";
import CheckHostingPage from "../imweb/step/checkHosting/route";
import UpdateMetaJson from "../../../components/common/updateMetaJson/route";
import BuildScript from "../../../components/common/buildScript/route";
import UpdateScript from "../../../components/common/updateScript/route";
import InjectScript from "./step/injectScript/route";

const PatchImwebPage = () => {
  const params = useParams();
  const step = Number(params.step);

  const steps = [
    { step: 1, title: "호스팅 확인" },
    { step: 2, title: "metaJson 수정" },
    { step: 3, title: "JS 파일 빌드" },
    { step: 4, title: "통합스크립트 내용 수정" },
    { step: 5, title: "IMWEB 편집" }
  ];
  console.log("PatchImwebPage", params);

  return (
    <Wrapper>
      <div className="sidepanel_title">IMWEB 패치</div>
      <PatchNote />
      <PatchStepHeader steps={steps} step={step} />
      {step === 1 && <CheckHostingPage />}
      {step === 2 && <UpdateMetaJson hosting="IMWEB" />}
      {step === 3 && <BuildScript hosting="IMWEB" />}
      {step === 4 && <UpdateScript hosting="IMWEB" />}
      {step === 5 && <InjectScript />}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 20px 12px;
  position: relative;
  height: 100%;

  .sidepanel_title {
    width: 100%;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
`;

export default PatchImwebPage;

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PatchStepHeader from "../../../components/patch/StepHeader";
import UpdateMetaJson from "../../../components/common/updateMetaJson/route";
import UpdateScript from "../../../components/common/updateScript/route";
import InjectScript from "./step/injectScript/route";
import CheckHosting from "./step/checkHosting/route";
import PatchNote from "../../../components/patch/Note";
import BuildScript from "../../../components/common/buildScript/route";

const PatchCafe24Page = () => {
  const params = useParams();
  const step = Number(params.step);

  const steps = [
    { step: 1, title: "CAFE24 확인" },
    { step: 2, title: "metaJson 수정" },
    { step: 3, title: "JS 파일 빌드" },
    { step: 4, title: "통합스크립트 내용 수정" },
    { step: 5, title: "CAFE24 편집" }
  ];

  return (
    <Wrapper>
      <div className="sidepanel_title">CAFE24 패치</div>
      <PatchNote />
      <PatchStepHeader steps={steps} step={step} type="patch" />
      {step === 1 && <CheckHosting />}
      {step === 2 && <UpdateMetaJson hosting="CAFE24" />}
      {step === 3 && <BuildScript hosting="CAFE24" />}
      {step === 4 && <UpdateScript hosting="CAFE24" />}
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

export default PatchCafe24Page;

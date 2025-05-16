import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PatchNote from "../../components/patch/Note";
import PatchStepHeader from "../../components/patch/StepHeader";
import QACheckDomain from "./step/checkDomain/page";
import QAOnLogin from "./step/onLogin/page";

const QAPage = () => {
  const params = useParams();
  const step = Number(params.step);
  const hosting = params.hosting;

  const steps = [
    { step: 1, title: "도메인 저장" },
    { step: 2, title: "QA 진행" }
  ];

  return (
    <Wrapper>
      <div className="sidepanel_title">QA 진행중</div>
      <PatchNote />
      <PatchStepHeader steps={steps} step={step} type="qa" />
      {step === 1 && <QACheckDomain hosting={hosting} />}
      {step === 2 && <QAOnLogin hosting={hosting} />}
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

export default QAPage;

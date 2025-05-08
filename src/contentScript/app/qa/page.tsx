import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PatchNote from "../../components/patch/Note";
import PatchStepHeader from "../../components/patch/StepHeader";
import QACheckDomain from "./step/checkDomain/page";
import QALogin from "./step/checkLogin/page";

const QAPage = () => {
  const params = useParams();
  const step = Number(params.step);

  const steps = [
    { step: 1, title: "도메인 저장" },
    { step: 2, title: "로그인 화면 확인" },
    { step: 3, title: "JS 파일 빌드" },
    { step: 4, title: "통합스크립트 내용 수정" },
    { step: 5, title: "IMWEB 편집" }
  ];

  return (
    <Wrapper>
      <div className="sidepanel_title">QA 진행중</div>
      <PatchNote />
      <PatchStepHeader steps={steps} step={step} type="qa" />
      {step === 1 && <QACheckDomain />}
      {step === 2 && <QALogin />}
      {/* {step === 3 && <BuildScript hosting="IMWEB" />} */}
      {/* {step === 4 && <UpdateScript hosting="IMWEB" />} */}
      {/* {step === 5 && <InjectScript />} */}
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

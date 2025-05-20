import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { message } from "antd";
import { PatchData, usePatchData } from "../../../../../../popup/store/patchData";
import Button from "../../../../../components/Button";
import { useQAData } from "../../../../../../popup/store/qaData";
import { useNavigate } from "react-router-dom";

const ImwebSettingPage = () => {
  const { getPatchData, patchData } = usePatchData();

  const { startQA } = useQAData();

  useEffect(() => {
    getPatchData();
  }, []);

  const onClickScriptCopy = () => {
    if (!patchData) return;
    message.success("통합 스크립트 복사");
    navigator.clipboard.writeText(patchData.script);
  };

  const onClickQuit = () => {
    usePatchData.endPatch();
  };

  const navigate = useNavigate();

  const onStartQA = async () => {
    await usePatchData.endPatch();
    startQA(patchData.hosting, patchData.domain);
    navigate(`/qa/${patchData.hosting}`);
  };

  return (
    <Wrapper>
      <div className="kg_con">
        <div className="kg_title">IMWEB 설정 페이지</div>
        <div className="kg_sub">통합스크립트를 Body Code에 주입하세요</div>

        <Button onClick={onClickScriptCopy}>통합 스크립트 복사</Button>
        <Button className="mt-4" color="secondary" onClick={onStartQA}>
          QA 시작
        </Button>
        <Button className="mt-4" color="warning" onClick={onClickQuit}>
          패치 종료
        </Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .login_box {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 30px;
    margin-bottom: 30px;
    font-size: 12px;
  }
`;

export default ImwebSettingPage;

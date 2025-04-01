import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button as AButton, message } from "antd";
import { PatchData, usePatchData } from "../../../../../../popup/store/patchData";
import Button from "../../../../../components/Button";

const ImwebSettingPage = () => {
  const { getPatchData } = usePatchData();
  const [patchData, setPatchData] = useState<PatchData>();

  const getData = async () => {
    const patchData = await getPatchData();
    if (patchData) setPatchData(patchData);
  };
  useEffect(() => {
    getData();
  }, []);

  const onClickScriptCopy = () => {
    if (!patchData) return;
    message.success("통합 스크립트 복사");
    navigator.clipboard.writeText(patchData.script);
  };

  const onClickQuit = () => {
    usePatchData.endPatch();
  };
  return (
    <Wrapper>
      <div className="kg_con">
        <div className="kg_title">IMWEB 설정 페이지</div>
        <div className="kg_sub">통합스크립트를 Body Code에 주입하세요</div>
        <div className="copy_box">
          <AButton type="dashed" onClick={onClickScriptCopy}>
            통합 스크립트 복사
          </AButton>
        </div>
        <Button className="mt-4" onClick={onClickQuit}>
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

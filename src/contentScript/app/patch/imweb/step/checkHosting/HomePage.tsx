import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../../../../components/Button";
import { usePatchData } from "../../../../../../popup/store/patchData";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const ImwebHomePage = () => {
  const navigate = useNavigate();
  const { getPatchData } = usePatchData();
  const onClickNext = async () => {
    const patchData = await getPatchData();
    if (!patchData) {
      message.error("process 번호가 없습니다.");
      return;
    }
    usePatchData.updateStep(2, navigate);

    window.open(`https://gateway.keepgrow.com/cms/setting/processes/${patchData.processesNumber}/modify`);
  };

  return (
    <Wrapper>
      <div className="kg_con">
        <div className="kg_title">IMWEB 확인</div>
        <div className="kg_sub">다음 버튼을 눌러 패치를 진행합니다.</div>
        <Button onClick={onClickNext}>다음</Button>
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

export default ImwebHomePage;

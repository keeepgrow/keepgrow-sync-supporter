import React from "react";
import Button from "../../../../../components/Button";
import { getPatchData, usePatchData } from "../../../../../../popup/store/patchData";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Cafe24Home = () => {
  const navigate = useNavigate();

  const onClick = async () => {
    const patchData = await getPatchData();
    if (!patchData) {
      message.error("process 번호가 없습니다.");
      return;
    }
    usePatchData.updateStep(2, navigate);

    window.open(`https://gateway.keepgrow.com/cms/setting/processes/${patchData.processesNumber}`);
  };
  return (
    <>
      <div className="kg_con">
        <div className="kg_title">카페24 페이지입니다.</div>
        <div className="kg_sub">다음 버튼을 눌러 CMS 로 이동합니다.</div>
        <Button onClick={onClick}>다음</Button>
      </div>
    </>
  );
};

export default Cafe24Home;

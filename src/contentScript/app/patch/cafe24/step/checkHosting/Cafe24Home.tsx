import React, { useEffect } from "react";
import Button from "../../../../../components/Button";
import { STORAGE_PATCH_KEY, usePatchData } from "../../../../../../popup/store/patchData";
import { Button as AntdButton, message } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RedoOutlined } from "@ant-design/icons"; // 화살표 아이콘 import

const Cafe24Home = () => {
  const navigate = useNavigate();
  const { patchData, getPatchData } = usePatchData();

  const onClickDomain = () => {
    // https://commetoi891007.cafe24.com/admin/php/shop1/m/company_info_f.php
    const location = window.location.href;
    let newLocation = location.replace("disp/admin", "admin/php");
    newLocation = newLocation.replace("main/dashboard", "m/company_info_f.php");

    window.open(newLocation);
  };

  const onClickJsKey = () => {
    const location = window.location.href;
    let newLocation = location.replace("main/dashboard", "Member/Oauth2ClientConfig");

    window.open(newLocation);
  };

  const onClickMobile = () => {
    const location = window.location.href;
    let newLocation = location.replace("main/dashboard", "manage/mobile");

    window.open(newLocation);
  };

  const onClickFinish = async () => {
    const patchData = await getPatchData();
    if (!patchData) {
      message.error("process 번호가 없습니다.");
      return;
    }
    usePatchData.updateStep(2, navigate);
    window.open(`https://gateway.keepgrow.com/cms/setting/processes/${patchData.processesNumber}`);

    window.location.href = "/admin/php/shop1/log_out.php";
  };
  const onClickRefresh = () => {
    getPatchData();
  };

  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<{ key: string; value: string }>;
      if (customEvent.detail.key === STORAGE_PATCH_KEY) {
        getPatchData();
      }
    };
    document.addEventListener("statusChange", handler);
    return () => {
      document.removeEventListener("statusChange", handler);
    };
  }, []);

  return (
    <Wrapper>
      <div className="kg_con">
        <div className="kg_title">카페24 페이지입니다.</div>
        <div className="kg_sub">종료 버튼을 눌러 CMS 로 이동합니다.</div>
        <div className="info_box">
          <div>domain : {patchData?.domain || "-"}</div>
          <div>jsKey : {patchData?.jsKey || "-"}</div>
          <div>responsive : {patchData?.responsive ? "true" : "false"}</div>
        </div>
        <div className="btn_box">
          <AntdButton variant="dashed" onClick={onClickDomain}>
            도메인 확인
          </AntdButton>
          <AntdButton variant="dashed" onClick={onClickJsKey}>
            jsKey 확인
          </AntdButton>
          <AntdButton variant="dashed" onClick={onClickMobile}>
            반응형 확인
          </AntdButton>
          <AntdButton variant="filled" onClick={onClickRefresh}>
            <RedoOutlined />
          </AntdButton>
        </div>
        <Button className="mt-4" onClick={onClickFinish}>
          종료
        </Button>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .info_box {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
    margin-top: 30px;
    margin-bottom: 30px;
    font-size: 12px;
  }
  .btn_box {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: flex-start;
    margin: 20px 0;
  }
`;

export default Cafe24Home;

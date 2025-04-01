import React, { useEffect } from "react";
import styled from "styled-components";
import { SidepanelService } from "../../../../../utils/sidepanel";
import { message } from "antd";

const ImwebMysitePage = () => {
  useEffect(() => {
    message.info("MYSITE를 선택해주세요");
    SidepanelService.closePanel();
  }, []);
  return (
    <Wrapper>
      <div className="kg_con">
        <div className="kg_title">IMWEB MYSITE 선택</div>
        <div className="kg_sub">사이트를 선택해주세요</div>
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

export default ImwebMysitePage;

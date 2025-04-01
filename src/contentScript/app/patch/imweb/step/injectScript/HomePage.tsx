import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../../../../components/Button";

const ImwebHomePage = () => {
  const onClick = () => {
    const baseUrl = window.location.href.split("?")[0]; // ? 뒤 제거
    const configUrl = baseUrl.replace("/admin", "/admin/config/seo");
    window.location.href = configUrl;
  };

  return (
    <Wrapper>
      <div className="kg_con">
        <div className="kg_title">IMWEB 설정 페이지 이동</div>
        <div className="kg_sub">설정 페이지로 이동합니다.</div>
        <Button onClick={onClick}>설정 페이지 이동</Button>
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

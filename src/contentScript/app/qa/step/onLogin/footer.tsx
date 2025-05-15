import { Button } from "antd";
import React from "react";
import styled from "styled-components";
import { useQAData } from "../../../../../popup/store/qaData";
const OnLoginFooter = () => {
  const { qaData } = useQAData();
  const onClickMain = () => {
    window.location.href = "/";
  };

  const onClickLoginPage = () => {
    window.location.href = "/member/login.html";
  };

  const onClickLogout = () => {
    window.location.href = `/exec/front/Member/logout`;
  };

  const onClickCart = () => {
    window.location.href = "/order/basket.html";
  };

  return (
    <>
      <Wrapper>
        <h4>remote</h4>
        <div className="btn-wrapper">
          <Button onClick={onClickMain} type="default">
            메인 페이지
          </Button>
          <Button onClick={onClickLoginPage} type="default">
            로그인
          </Button>
          <Button onClick={onClickCart} type="default">
            장바구니
          </Button>
          <Button onClick={onClickLogout} type="default" danger>
            로그아웃
          </Button>
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  background-color: #f4f4f4;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  h4 {
    margin-bottom: 10px;
  }
  .btn-wrapper {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  }
  button {
    width: 100px;
  }
`;

export default OnLoginFooter;

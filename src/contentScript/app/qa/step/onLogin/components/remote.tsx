import { Button } from "antd";
import React from "react";
import styled from "styled-components";

const OnLoginRemote = () => {
  const onClickMain = () => {
    window.location.href = "/";
  };

  const onClickLoginPage = () => {
    window.location.href = "/member/login.html";
  };

  const onClickLogout = () => {
    window.location.href = `/exec/front/Member/logout`;
  };

  const onClickAgreement = () => {
    window.location.href = "/order/agreement.html";
  };

  const onClickSignup = () => {
    window.location.href = "/member/join.html";
  };

  return (
    <>
      <Wrapper>
        <h4>remote</h4>
        <div className="btn-wrapper">
          <Button className={`kg_sub_title`} onClick={() => window.location.reload()} color="cyan">
            새로고침
          </Button>
          <Button onClick={onClickMain} type="default">
            main
          </Button>
          <Button onClick={onClickLoginPage} type="default">
            login
          </Button>
          <Button onClick={onClickAgreement} type="default">
            회원가입A
          </Button>
          <Button onClick={onClickSignup} type="default">
            회원가입J
          </Button>
          <Button onClick={onClickLogout} type="default" danger>
            logout
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
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  }
  button {
    width: 80px;
  }
`;

export default OnLoginRemote;

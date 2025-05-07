import { Button } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthApi } from "../../../api/auth";
import { useUserStore } from "../../store/user";

const PopupMainPage = () => {
  const navigate = useNavigate();
  const onLogout = () => {
    AuthApi.logout();
    navigate("/login");
  };

  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, []);

  const onPatch = () => {
    navigate("/patch");
  };

  const onQA = () => {
    navigate("/qa");
  };

  return (
    <Wrapper>
      <div className="user_info">
        <div>
          <strong>환영합니다.</strong>
        </div>
        <div>{user?.sub}</div>
        <div onClick={onLogout} className="logout">
          로그아웃
        </div>
      </div>

      <div className="flex_box mt-3">
        <Button onClick={onPatch} size="large" type="primary" block color="default">
          패치 시작
        </Button>
        <Button size="large" block color="cyan" onClick={onQA}>
          QA 시작
        </Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .user_info {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .flex_box {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .logout {
    color: #9e9e9e;
    font-size: 12px;
    cursor: pointer;
    &:hover {
      color: #8c8c8c;
    }
  }
`;

export default PopupMainPage;

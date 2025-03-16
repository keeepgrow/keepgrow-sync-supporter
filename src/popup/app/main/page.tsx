import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthApi } from "../../../api/auth";
import { useUserStore } from "../../store/user";

const PopupMainPage = () => {
  // const [user, setUser] = useState({
  //   userName: "유니드컴즈_루가",
  //   email: "luca.im@uneedcomms.com"
  // });

  const navigate = useNavigate();
  const onLogout = () => {
    AuthApi.logout();
    navigate("/login");
  };

  // zustand
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser(); // 마운트될 때 유저 정보 가져오기
  }, []);

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
        <Button size="large" type="primary" block>
          <Link to="/patch">패치 시작하기</Link>
        </Button>
        <Button size="large" block disabled>
          검수 시작하기
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

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { usePatchData } from "../../../../popup/store/patchData";
import Button from "../../Button";

const Cafe24LoginPage = () => {
  const [userInfo, setUserInfo] = useState({ id: "", password: "" });
  const { getPatchData } = usePatchData();

  const getUserInfo = async () => {
    const patchData = await getPatchData();
    if (patchData) {
      setUserInfo(patchData.userInfo);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const onClick = () => {
    const idElement = document.querySelector("#mall_id");
    const pwElement = document.querySelector("#userpasswd");

    if (!idElement || !pwElement) {
      return;
    }
    idElement.setAttribute("value", userInfo.id);
    pwElement.setAttribute("value", userInfo.password);

    const loginButton = document.querySelector(".mButton > button") as HTMLButtonElement;
    loginButton?.click();
  };

  return (
    <Wrapper>
      <div className="kg_con">
        <div className="kg_title">CAFE24 로그인</div>
        <div className="kg_sub">*부운영자는 직접 로그인 해주세요</div>
        <div className="login_box">
          <div>ID : {userInfo?.id || "-"}</div>
          <div>PW : {userInfo?.password || "-"}</div>
        </div>

        <Button onClick={onClick}>로그인</Button>
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
    font-size: 14px;
  }
`;

export default Cafe24LoginPage;

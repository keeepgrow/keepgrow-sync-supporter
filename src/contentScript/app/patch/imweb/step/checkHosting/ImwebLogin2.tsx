import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { usePatchData } from "../../../../../../popup/store/patchData";
import Button from "../../../../../components/Button";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { sleep } from "../../../../../utils/utils";

const ImwebLogin2Page = () => {
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

  const onClick = async () => {
    const idElement = document.querySelector("#txt_email") as HTMLInputElement;
    const pwElement = document.querySelector("#txt_pass") as HTMLInputElement;

    if (!idElement || !pwElement) {
      message.error("아이디 또는 비밀번호를 찾을 수 없습니다.");
      return;
    }

    // 아이디 입력
    idElement.setAttribute("value", userInfo.id);
    await sleep(500);

    // 비밀번호 입력
    pwElement.value = userInfo.password;
    await sleep(500);

    const loginButton = document.querySelector("#btn_login_check") as HTMLButtonElement;
    loginButton?.click();
  };

  const navigate = useNavigate();

  return (
    <Wrapper>
      <div className="kg_con">
        <div className="kg_title">IMWEB 로그인</div>
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
    font-size: 12px;
  }
`;

export default ImwebLogin2Page;

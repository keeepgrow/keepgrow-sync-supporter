import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { usePatchData } from "../../../../../../popup/store/patchData";
import Button from "../../../../../components/Button";
import { message } from "antd";
import { sleep } from "../../../../../utils/utils";

const ImwebLoginPage = () => {
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
    
    const idElement = document.querySelector("#io-email-field-input-2") as HTMLInputElement;
    const pwElement = document.querySelector("#io-password-field-input-3") as HTMLInputElement;

    if (!idElement || !pwElement) {
      message.error("아이디 또는 비밀번호를 찾을 수 없습니다.");
      return;
    }

    // 아이디 입력
    idElement.setAttribute("value", userInfo.id);
    idElement.click();

    const keyboardEvent = new KeyboardEvent("keydown", {
      key: "aasdfakjsdflkjasd",
      code: "KeyA",
      bubbles: true
    });

    idElement.dispatchEvent(keyboardEvent);
    idElement.dispatchEvent(new Event("input", { bubbles: true }));

    // 비밀번호 입력
    pwElement.value = userInfo.password;
    pwElement.click();
    await sleep(500);

    const keyboardEvent2 = new KeyboardEvent("keydown", {
      key: "aasdfakjsdflkjasd",
      code: "KeyA",
      bubbles: true
    });

    pwElement.dispatchEvent(keyboardEvent2);
    pwElement.dispatchEvent(new Event("input", { bubbles: true }));
    await sleep(500);

    const loginButton = document.querySelector("form button[type='submit']") as HTMLButtonElement;
    loginButton?.click();
  };

  const onClickInfo = (type: "id" | "pw") => {
    // 아이디 복사
    if (type === "id") {
    } else {
      message.info("비밀번호를 입력해주세요.");
    }
  };

  return (
    <Wrapper>
      <div className="kg_con">
        <div className="kg_title">IMWEB 로그인</div>
        {/* <div className="kg_sub">*부운영자는 직접 로그인 해주세요</div> */}
        <div className="login_box">
          <div onClick={() => onClickInfo("id")}>ID : {userInfo?.id || "-"}</div>
          <div onClick={() => onClickInfo("pw")}>PW : {userInfo?.password || "-"}</div>
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

export default ImwebLoginPage;

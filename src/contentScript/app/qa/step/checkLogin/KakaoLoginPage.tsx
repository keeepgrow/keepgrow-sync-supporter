import React, { useState } from "react";
import { Button as AntdButton, Input, message } from "antd";
import Button from "../../../../components/Button";
import { useQAData } from "../../../../../popup/store/qaData";

const QAKakaoLoginPage = () => {
  const [id, setId] = useState<string>("manager@keepgrow.com");
  const [pw, setPw] = useState<string>("Keep01357!");

  const onClickKakaoLogin = () => {
    const inputs = document.querySelectorAll("input");
    const idInput = inputs[0] as HTMLInputElement;
    idInput.value = id;
    // 여러 이벤트를 발생시켜서 input 값이 제대로 들어가도록 함
    idInput.dispatchEvent(new Event("input", { bubbles: true }));
    idInput.dispatchEvent(new Event("change", { bubbles: true }));
    idInput.dispatchEvent(new KeyboardEvent("keyup", { bubbles: true }));

    const pwInput = inputs[1] as HTMLInputElement;
    pwInput.value = pw;
    pwInput.dispatchEvent(new Event("input", { bubbles: true }));
    pwInput.dispatchEvent(new Event("change", { bubbles: true }));
    pwInput.dispatchEvent(new KeyboardEvent("keyup", { bubbles: true }));

    const loginBtn = document.querySelector(".submit") as HTMLButtonElement;
    loginBtn.style.backgroundColor = "pink";

    message.success("카카오 로그인 버튼 클릭");
    setTimeout(async () => {
      await useQAData.updateStep(3);
      loginBtn.click();
    }, 1000);
  };

  return (
    <div>
      <div className="kg_con">
        <div className="kg_title">카카오 로그인</div>
        <Input placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
        <Input className="mt-3" placeholder="비밀번호" value={pw} onChange={(e) => setPw(e.target.value)} />
        <Button className="mt-3" onClick={onClickKakaoLogin}>
          카카오 로그인
        </Button>
      </div>
    </div>
  );
};

export default QAKakaoLoginPage;

import { message } from "antd";
import React from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import { usePatchData } from "../../../../popup/store/patchData";
import Button from "../../Button";

const HOSTING_INFO = {
  CAFE24: {
    ID: "CAFE24_ACCOUNT_SHOP_ID",
    PW: "CAFE24_ACCOUNT_PASSWORD",
    BUILD_BUTTON: "#build-cafe24-init"
  },
  IMWEB: {
    ID: "IMWEB_ACCOUNT_ID",
    PW: "IMWEB_ACCOUNT_PASSWORD",
    BUILD_BUTTON: "#build-imweb-init"
  }
};

const BuildScriptPage = ({ hosting }: { hosting: "CAFE24" | "IMWEB" }) => {
  const navigate = useNavigate();
  const onClickSaveAccount = async () => {
    const userInfo = { id: "", password: "" };

    document.querySelectorAll("tr.asset-row").forEach((element) => {
      const labelSpan = element.querySelector("td:nth-of-type(2) .d-inline");

      if (labelSpan && labelSpan.textContent.trim() === HOSTING_INFO[hosting].ID) {
        const inputField = element.querySelector("td:nth-of-type(3) .d-inline input") as HTMLInputElement;

        if (inputField) {
          userInfo.id = inputField.value.trim();
        }
      }
      if (labelSpan && labelSpan.textContent.trim() === HOSTING_INFO[hosting].PW) {
        const inputField = element.querySelector("td:nth-of-type(3) .d-inline input") as HTMLInputElement;

        if (inputField) {
          userInfo.password = inputField.value.trim();
        }
      }
    });
    await usePatchData.saveUserInfo(userInfo);

    if (!userInfo.id || !userInfo.password) {
      alert("아이디와 비밀번호를 찾을 수 없습니다.");
      return;
    }
  };

  const onClickHostingBuild = () => {
    const button = document.querySelector(HOSTING_INFO[hosting].BUILD_BUTTON) as HTMLButtonElement;
    if (button) button.click();
  };
  const onClickJsBuild = () => {
    const button = document.querySelector("#build-integratedScript-init") as HTMLButtonElement;
    if (button) button.click();
  };
  const onClickNext = () => {
    onClickSaveAccount();
    message.success("계정 저장이 완료되었습니다. 다음 단계로 이동합니다.");
    setTimeout(() => {
      usePatchData.updateStep(4, navigate);
      window.location.href = window.location.href.replace("/modify", "");
    }, 1000);
  };

  return (
    <Wrapper className="kg_con">
      <div className="kg_title">JS 빌드</div>
      <div className="kg_sub">호스팅사 빌드, 통합 JS 빌드를 차례로 눌러주세요</div>

      <div className="button_box">
        <Button color="secondary" onClick={onClickHostingBuild}>
          호스팅사 빌드
        </Button>
        <Button color="secondary" onClick={onClickJsBuild}>
          통합 JS 빌드
        </Button>
      </div>

      <Button onClick={onClickNext}>완료</Button>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .button_box {
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    margin-bottom: 30px;
    color: #eaeaea;
  }
`;

export default BuildScriptPage;

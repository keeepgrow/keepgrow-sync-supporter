import { message } from "antd";
import React from "react";
import styled from "styled-components";
import { usePatchData } from "../../../../../../popup/store/patchData";
import { useNavigate } from "react-router-dom";
import BottomLayout from "../../../../../components/layout/bottom";
import Button from "../../../../../components/Button";

const CAFE24_ID = "CAFE24_ACCOUNT_SHOP_ID";
const CAFE24_PW = "CAFE24_ACCOUNT_PASSWORD";

const BuildScriptPage = () => {
  const navigate = useNavigate();
  const onClickSaveAccount = async () => {
    const userInfo = { id: "", password: "" };

    document.querySelectorAll("tr.asset-row").forEach((element) => {
      const labelSpan = element.querySelector("td:nth-of-type(2) .d-inline");

      if (labelSpan && labelSpan.textContent.trim() === CAFE24_ID) {
        const inputField = element.querySelector("td:nth-of-type(3) .d-inline input") as HTMLInputElement;

        if (inputField) {
          userInfo.id = inputField.value.trim();
        }
      }
      if (labelSpan && labelSpan.textContent.trim() === CAFE24_PW) {
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
    const button = document.querySelector("#build-cafe24-init") as HTMLButtonElement;
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
    gap: 10px;
    justify-content: center;
    margin-bottom: 20px;
    color: #eaeaea;
  }
`;

export default BuildScriptPage;

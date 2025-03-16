import { message } from "antd";
import React from "react";
import { usePatchData } from "../../../../../../popup/store/patchData";
import Button from "../../../../../components/Button";

const CAFE24_ID = "CAFE24_ACCOUNT_SHOP_ID";
const CAFE24_PW = "CAFE24_ACCOUNT_PASSWORD";

const CheckHostingPage = () => {
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

  const onClickNext = () => {
    onClickSaveAccount();
    message.success("계정 저장이 완료되었습니다. 카페 24로 이동합니다.");
    setTimeout(() => {
      window.open("https://eclogin.cafe24.com/Shop/");
    }, 1000);
  };

  return (
    <div className="kg_con">
      <div className="kg_title">카페24 계정 확인</div>
      <div className="kg_sub">
        <div>카페 24로 이동합니다</div>
      </div>
      <Button onClick={onClickNext}>이동</Button>
    </div>
  );
};

export default CheckHostingPage;

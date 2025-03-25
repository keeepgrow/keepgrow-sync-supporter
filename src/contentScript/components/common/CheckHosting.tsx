import { message } from "antd";
import React from "react";
import { usePatchData } from "../../../popup/store/patchData";
import Button from "../Button";

const HOSTING_INFO = {
  CAFE24: {
    ID: "CAFE24_ACCOUNT_SHOP_ID",
    PW: "CAFE24_ACCOUNT_PASSWORD",
    URL: "https://eclogin.cafe24.com/Shop/"
  },
  IMWEB: {
    ID: "IMWEB_ACCOUNT_ID",
    PW: "IMWEB_ACCOUNT_PASSWORD",
    URL: "https://imweb.me/login"
  }
};
const CheckHostingPage = ({ hosting }: { hosting: "CAFE24" | "IMWEB" }) => {
  const { ID: HOSTING_ID, PW: HOSTING_PW, URL } = HOSTING_INFO[hosting];

  const onClickSaveAccount = async () => {
    const userInfo = { id: "", password: "" };

    document.querySelectorAll("tr.asset-row").forEach((element) => {
      const labelSpan = element.querySelector("td:nth-of-type(2) .d-inline");

      if (labelSpan && labelSpan.textContent.trim() === HOSTING_ID) {
        const inputField = element.querySelector("td:nth-of-type(3) .d-inline input") as HTMLInputElement;

        if (inputField) {
          userInfo.id = inputField.value.trim();
        }
      }
      if (labelSpan && labelSpan.textContent.trim() === HOSTING_PW) {
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
    message.success("계정 저장이 완료되었습니다. 호스팅 페이지로 이동합니다.");
    setTimeout(() => window.open(URL), 1000);
  };

  return (
    <div className="kg_con">
      <div className="kg_title">호스팅 계정 확인</div>
      <div className="kg_sub">
        <div>호스팅 페이지로 이동합니다</div>
      </div>
      <Button onClick={onClickNext}>이동</Button>
    </div>
  );
};

export default CheckHostingPage;

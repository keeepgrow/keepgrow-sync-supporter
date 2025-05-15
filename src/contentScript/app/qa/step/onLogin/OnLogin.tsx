import React, { useEffect } from "react";
import { useQAData } from "../../../../../popup/store/qaData";
import LoginCheckbox from "./checkbox";

const Onlogin = () => {
  const { getQAData } = useQAData();
  const checkIsPendingPage = () => {
    const titles = document.querySelectorAll("h2");
    const title = Array.from(titles).find((title) => title.textContent === "로그인 상태입니다.");
    console.log(title);
    return title ? true : false;
  };
  const checkIsSmartLogin = () => {
    // <img class='smartLoginImg'/> 확인
    const img = document.querySelector("img.smartLoginImg");
    console.log(img);
    if (img) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    console.log("계류 페이지 확인");
    const isPendingPage = checkIsPendingPage();
    if (isPendingPage) {
      useQAData.update("pendingPage", true);
      getQAData();
    }
    const isSmartLogin = checkIsSmartLogin();
    if (isSmartLogin) {
      useQAData.update("smartLogin", true);
      getQAData();
    }
  }, []);

  return (
    <div>
      <div className="kg_title">로그인 페이지</div>
    </div>
  );
};

export default Onlogin;

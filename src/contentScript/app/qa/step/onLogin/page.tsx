import React, { useEffect, useState } from "react";
import { getQAData, QAData } from "../../../../../popup/store/qaData";
import MappingLoginPage from "./MappginLogin";
import Onlogin from "./OnLogin";
import Cart from "./Cart";
import LoginCheckbox from "./checkbox";
import OnLoginFooter from "./footer";
import NoMatch from "./NoMatch";
import QAKakaoLoginPage from "../checkLogin/KakaoLoginPage";

const QAOnLogin = ({ hosting }: { hosting: string }) => {
  const location = window.location.href;

  enum steps {
    mappingLogin,
    login,
    cart,
    noMatch,
    kakaoLogin
  }
  const [page, setPage] = useState(steps.mappingLogin);
  const [qaData, setQaData] = useState<QAData>();

  const getData = async () => {
    const qaData = await getQAData();
    if (qaData) setQaData(qaData);
  };
  useEffect(() => {
    getData();
  }, []);

  const mappingLoginPage = ["/member/mapping_login.html"];
  const loginPage = ["/member/login.html"];
  const cartPage = ["/order/basket.html"];
  const kakaoLoginPage = ["/accounts.kakao.com/login/", "kauth.kakao.com/"];

  const urlCheck = () => {
    if (!qaData) return;

    if (kakaoLoginPage.some((page) => location.includes(page))) {
      setPage(steps.kakaoLogin);
      return;
    }

    if (location.includes(qaData.domain)) {
      if (mappingLoginPage.some((page) => location.includes(page))) {
        setPage(steps.mappingLogin);
        return;
      }
      if (loginPage.some((page) => location.includes(page))) {
        setPage(steps.login);
        return;
      }
      if (cartPage.some((page) => location.includes(page))) {
        setPage(steps.cart);
        return;
      }
      // if (signupPage.some((page) => location.includes(page))) {
      //   setPage(steps.signup);
      //   return;
      // }
    }

    setPage(steps.noMatch);
    return;
  };

  useEffect(() => urlCheck(), [qaData]);

  return (
    <>
      <div className="kg_con">
        {page === steps.mappingLogin && <MappingLoginPage />}
        {page === steps.login && <Onlogin />}
        {page === steps.cart && <Cart />}
        {page === steps.noMatch && <NoMatch />}
        <LoginCheckbox />
        <OnLoginFooter />
      </div>
      {page === steps.kakaoLogin && <QAKakaoLoginPage />}
    </>
  );
};

export default QAOnLogin;

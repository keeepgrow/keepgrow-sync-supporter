import React, { useEffect, useState } from "react";
import { getQAData, QAData, useQAData } from "../../../../../popup/store/qaData";
import MappingLoginPage from "./MappginLogin";
import LoginPage from "./LoginPage";
import Cart from "./Cart";
import LoginCheckbox from "./components/checkbox";
import QAKakaoLoginPage from "./KakaoLoginPage";
import NoMatch from "./NoMatch";
import QASignupPage from "./SignupPage";
import OnLoginRemote from "./components/remote";
import Button from "../../../../components/Button";

const QAOnLogin = ({ hosting }: { hosting: string }) => {
  const location = window.location.href;

  enum steps {
    mappingLogin,
    login,
    cart,
    noMatch,
    kakaoLogin,
    signup
  }
  const [page, setPage] = useState(steps.noMatch);
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
  const signupPage = ["/member/join.html", "/member/agreement.html", "/signup"];

  const urlCheck = () => {
    if (!qaData) return;

    if (kakaoLoginPage.some((page) => location.includes(page))) {
      setPage(steps.kakaoLogin);
      return;
    }

    if (signupPage.some((page) => location.includes(page))) {
      setPage(steps.signup);
      return;
    }

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
    setPage(steps.noMatch);
    return;
  };

  useEffect(() => urlCheck(), [qaData]);

  return (
    <>
      <div className="kg_con">
        {page === steps.mappingLogin && <MappingLoginPage />}
        {page === steps.login && <LoginPage />}
        {page === steps.signup && <QASignupPage />}

        {page === steps.cart && <Cart />}
        {page === steps.kakaoLogin && <QAKakaoLoginPage />}
        {page === steps.noMatch && <NoMatch hosting={hosting} />}
        <OnLoginRemote />
        <LoginCheckbox />
      </div>
      <Button className="mt-3" onClick={() => useQAData.endQA()}>
        QA 종료
      </Button>
    </>
  );
};

export default QAOnLogin;

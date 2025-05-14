import React, { useEffect, useState } from "react";
import { getQAData, QAData } from "../../../../../popup/store/qaData";
import GoLogin from "../checkLogin/GoLogin";

const QAOnLogin = ({ hosting }: { hosting: string }) => {
  const location = window.location.href;

  enum steps {
    login,
    signup,
    kakaoLogin,
    noMatch
  }
  const [page, setPage] = useState(steps.login);
  const [qaData, setQaData] = useState<QAData>();

  const getData = async () => {
    const qaData = await getQAData();
    if (qaData) setQaData(qaData);
  };
  useEffect(() => {
    getData();
  }, []);

  const loginPage = ["member/login.html", "/login"];
  const signupPage = ["/member/join.html", "/member/agreement.html", "/signup"];
  const kakaoLoginPage = ["/accounts.kakao.com/login/"];
  const urlCheck = () => {
    if (!qaData) return;

    if (kakaoLoginPage.some((page) => location.includes(page))) {
      setPage(steps.kakaoLogin);
      return;
    }

    if (location.includes(qaData.domain)) {
      if (loginPage.some((page) => location.includes(page))) {
        setPage(steps.login);
        return;
      }
      if (signupPage.some((page) => location.includes(page))) {
        setPage(steps.signup);
        return;
      }
    }

    setPage(steps.noMatch);
    return;
  };

  useEffect(() => urlCheck(), [qaData]);

  return (
    <>
      {/* {page === steps.login && <QALoginPage />} */}
      {/* {page === steps.signup && <QASignupPage />} */}
      {/* {page === steps.kakaoLogin && <QAKakaoLoginPage />} */}
      {page === steps.noMatch && <GoLogin hosting={hosting} />}
    </>
  );
};

export default QAOnLogin;

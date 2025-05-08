import React, { useEffect, useState } from "react";
import { getQAData, QAData } from "../../../../../popup/store/qaData";
import { useParams } from "react-router-dom";
import QALoginPage from "./LoginPage";

const QALogin = () => {
  const location = window.location.href;
  const params = useParams();
  const hosting = params.hosting;

  enum steps {
    login,
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

  const urlCheck = () => {
    if (!qaData) return;
    console.log(location, qaData.domain);

    if (!location.includes(qaData.domain)) {
      setPage(steps.noMatch);
      return;
    }

    if (loginPage.some((page) => location.includes(page))) {
      setPage(steps.login);
      return;
    }

    setPage(steps.noMatch);
    return;
  };

  useEffect(() => urlCheck(), [qaData]);

  return (
    <>
      {page === steps.login && <QALoginPage />}
      {/* {page === steps.noMatch && <QANoMatch />} */}
    </>
  );
};

export default QALogin;

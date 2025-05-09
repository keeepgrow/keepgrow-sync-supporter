import React, { useEffect, useState } from "react";
import NotMatchingPage from "../../../../../components/patch/NotMatchingPage";
import CheckHostingPage from "../../../../../components/common/CheckHosting";
import Cafe24LoginPage from "./Cafe24Login";
import Cafe24Home from "./Cafe24Home";
import Cafe24Domain from "./Cafe24Domain";
import Cafe24JsKey from "./Cafe24JsKey";

const MoveHosting = () => {
  const location = window.location.href;

  const urlMatch = ["gateway.keepgrow.com/cms/setting/processes", "modify"];

  enum steps {
    login,
    cafe24Home,
    cafe24Domain,
    cafe24JsKey,
    cmsModify,
    nm
  }

  const [page, setPage] = useState(steps.nm);

  const urlCheck = () => {
    if (location.includes("eclogin.cafe24.com/Shop")) {
      setPage(steps.login);
      return;
    }
    // "main/dashboard" 이고 "cafe24.com/disp/admin" 가포함 되어있으면
    if (location.includes("cafe24.com/disp/admin") && location.includes("main/dashboard")) {
      setPage(steps.cafe24Home);
      return;
    }
    if (location.includes("cafe24.com/admin/php") && location.includes("m/company_info_f.php")) {
      setPage(steps.cafe24Domain);
      return;
    }
    // https://chan01.cafe24.com/disp/admin/shop1/Member/Oauth2ClientConfig
    if (location.includes("cafe24.com/disp/admin/") && location.includes("Member/Oauth2ClientConfig")) {
      setPage(steps.cafe24JsKey);
      return;
    }
    if (urlMatch.every((url) => location.includes(url))) {
      setPage(steps.cmsModify);
      return;
    }

    setPage(steps.nm);
  };

  useEffect(() => urlCheck(), []);

  return (
    <>
      {page === steps.cmsModify && <CheckHostingPage hosting="CAFE24" />}
      {page === steps.login && <Cafe24LoginPage />}
      {page === steps.cafe24Home && <Cafe24Home />}
      {page === steps.cafe24Domain && <Cafe24Domain />}
      {page === steps.cafe24JsKey && <Cafe24JsKey />}
      {page === steps.nm && <NotMatchingPage />}
    </>
  );
};

export default MoveHosting;

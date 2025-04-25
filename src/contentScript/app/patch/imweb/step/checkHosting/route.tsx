import React, { useEffect, useState } from "react";
import NotMatchingPage from "../../../../../components/patch/NotMatchingPage";

import CheckHostingPage from "../../../../../components/common/CheckHosting";
import ImwebLoginPage from "./ImwebLogin";
import ImwebMysitePage from "./Mysite";
import ImwebLogin2Page from "./ImwebLogin2";
import ImwebHomePage from "./HomePage";
import { Button } from "antd";
import ImwebMainPage from "../injectScript/MainPage";

const MoveHosting = () => {
  const location = window.location.href;

  const urlMatch = ["gateway.keepgrow.com/cms/setting/processes", "modify"];

  enum steps {
    login,
    login2,
    main,
    home,
    mysite,
    cmsModify,
    nm
  }

  const [page, setPage] = useState(steps.nm);

  const urlCheck = () => {
    if (location.includes("imweb.me/login")) {
      setPage(steps.login);
      return;
    }
    if (location.includes("imweb.me/mysite")) {
      setPage(steps.mysite);
      return;
    }
    if (location.includes("/admin/?type=page")) {
      const loginElement = document.querySelector(".login");
      if (loginElement) {
        setPage(steps.login2);
        return;
      }
      setPage(steps.home);
      return;
    }
    if (location.includes("imweb.me")) {
      setPage(steps.main);
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
      {page === steps.cmsModify && <CheckHostingPage hosting="IMWEB" />}
      {page === steps.login && <ImwebLoginPage />}
      {page === steps.login2 && <ImwebLogin2Page />}
      {page === steps.main && <ImwebMainPage />}
      {page === steps.home && <ImwebHomePage />}
      {page === steps.mysite && <ImwebMysitePage />}
      {page === steps.nm && <NotMatchingPage />}
      <div className="mt-2">
        <Button onClick={() => setPage(steps.nm)} type="dashed">
          CMS 입력 페이지
        </Button>
      </div>
    </>
  );
};

export default MoveHosting;

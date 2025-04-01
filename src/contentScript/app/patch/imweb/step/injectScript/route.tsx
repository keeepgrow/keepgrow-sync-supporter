import React, { useEffect, useState } from "react";

import PathStepFooter from "../../../../../components/patch/StepFooter";
import NotMatchingPage4 from "./NotMatchingPage";
import ImwebLoginPage from "../checkHosting/ImwebLogin";
import ImwebLogin2Page from "../checkHosting/ImwebLogin2";
import ImwebMysitePage from "../checkHosting/Mysite";
import ImwebMainPage from "./MainPage";
import ImwebHomePage from "./HomePage";
import ImwebSettingPage from "./SettingPage";

const InjectScript = () => {
  const location = window.location.href;

  enum steps {
    login,
    login2,
    mysite,
    main,
    home,
    setting,
    nm
  }
  const [page, setPage] = useState(steps.nm);

  const urlCheck = () => {
    // login
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

    if (location.includes("/admin/config/seo")) {
      setPage(steps.setting);
      return;
    }

    if (location.includes("imweb.me")) {
      setPage(steps.main);
      return;
    }

    setPage(steps.nm);
  };

  useEffect(() => urlCheck(), []);

  return (
    <>
      {page === steps.login && <ImwebLoginPage />}
      {page === steps.mysite && <ImwebMysitePage />}
      {page === steps.login2 && <ImwebLogin2Page />}
      {page === steps.main && <ImwebMainPage />}
      {page === steps.home && <ImwebHomePage />}
      {page === steps.setting && <ImwebSettingPage />}

      {page === steps.nm && <NotMatchingPage4 />}
      <PathStepFooter steps={steps} step={page} setPage={setPage} />
    </>
  );
};

export default InjectScript;

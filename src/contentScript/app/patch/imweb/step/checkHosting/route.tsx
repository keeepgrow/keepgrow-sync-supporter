import React, { useEffect, useState } from "react";
import NotMatchingPage from "../../../../../components/patch/NotMatchingPage";

import PathStepFooter from "../../../../../components/patch/StepFooter";
import CheckHostingPage from "../../../../../components/common/CheckHosting";
import ImwebLoginPage from "./ImwebLogin";
import ImwebMysitePage from "./Mysite";
import ImwebLogin2Page from "./ImwebLogin2";

const MoveHosting = () => {
  const location = window.location.href;

  const urlMatch = ["gateway.keepgrow.com/cms/setting/processes", "modify"];

  enum steps {
    login,
    login2,
    imweb,
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
    if (location.includes("imweb.com")) {
      setPage(steps.imweb);
      return;
    }
    if (location.includes("/admin/?type=page")) {
      setPage(steps.login2);
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
      {page === steps.mysite && <ImwebMysitePage />}
      {page === steps.nm && <NotMatchingPage />}
      <PathStepFooter steps={steps} step={page} setPage={setPage} />
    </>
  );
};

export default MoveHosting;

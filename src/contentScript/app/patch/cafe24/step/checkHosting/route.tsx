import React, { useEffect, useState } from "react";
import NotMatchingPage from "../../../../../components/patch/NotMatchingPage";
import CheckHostingPage from "./CheckHosting";
import Cafe24LoginPage from "../../../../../components/patch/cafe24/Login";
import Cafe24Home from "./Cafe24Home";
import PathStepFooter from "../../../../../components/patch/StepFooter";

const MoveHosting = () => {
  const location = window.location.href;

  const urlMatch = ["gateway.keepgrow.com/cms/setting/processes", "modify"];

  enum steps {
    login,
    cafe24,
    cmsModify,
    nm
  }

  const [page, setPage] = useState(steps.nm);

  const urlCheck = () => {
    if (location.includes("eclogin.cafe24.com/Shop")) {
      setPage(steps.login);
      return;
    }
    if (location.includes("cafe24.com")) {
      setPage(steps.cafe24);
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
      {page === steps.cmsModify && <CheckHostingPage />}
      {page === steps.login && <Cafe24LoginPage />}

      {page === steps.cafe24 && <Cafe24Home />}
      {page === steps.nm && <NotMatchingPage />}
      <PathStepFooter steps={steps} step={page} setPage={setPage} />
    </>
  );
};

export default MoveHosting;

import React, { useEffect, useState } from "react";
import NotMatchingPage from "../../../../../components/patch/NotMatchingPage";
import CheckHostingPage from "../../../../../components/common/CheckHosting";
import Cafe24LoginPage from "./Cafe24Login";
import Cafe24Home from "./Cafe24Home";

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
      {page === steps.cmsModify && <CheckHostingPage hosting="CAFE24" />}
      {page === steps.login && <Cafe24LoginPage />}
      {page === steps.cafe24 && <Cafe24Home />}
      {page === steps.nm && <NotMatchingPage />}
    </>
  );
};

export default MoveHosting;

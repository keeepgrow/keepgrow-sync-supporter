import React, { useEffect, useState } from "react";
import Cafe24LoginPage from "../checkHosting/Cafe24Login";
import Cafe24MainPage from "./MainPage";
import NotMatchingPage4 from "./NotMatchingPage";
import Cafe24ManagePage from "./Manage";
import Cafe24DesignPage from "./Design";

const InjectScript = () => {
  const location = window.location.href;

  enum steps {
    login,
    cafe24Main,
    cafe24Manage,
    cafe24Design,
    nm
  }
  const [page, setPage] = useState(steps.nm);

  const urlCheck = () => {
    if (location.includes("eclogin.cafe24.com/Shop")) {
      setPage(steps.login);
      return;
    }

    if (location.includes("/main/dashboard")) {
      setPage(steps.cafe24Main);
      return;
    }
    if (location.includes("/Manage/Index")) {
      setPage(steps.cafe24Manage);
      return;
    }

    if (location.includes("disp/admin/editor/")) {
      setPage(steps.cafe24Design);
      return;
    }

    setPage(steps.nm);
  };

  useEffect(() => urlCheck(), []);

  return (
    <>
      {page === steps.login && <Cafe24LoginPage />}
      {page === steps.cafe24Main && <Cafe24MainPage />}
      {page === steps.cafe24Manage && <Cafe24ManagePage />}
      {page === steps.cafe24Design && <Cafe24DesignPage />}
      {page === steps.nm && <NotMatchingPage4 />}
    </>
  );
};

export default InjectScript;

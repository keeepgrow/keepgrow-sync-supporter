import React, { useEffect, useState } from "react";

import NotMatchingPage from "../../../../../components/patch/NotMatchingPage";
import UpdateScriptPage from "./UpdateScript";
import PathStepFooter from "../../../../../components/patch/StepFooter";

const UpdateScript = () => {
  const location = window.location.href;

  const urlMatch = "gateway.keepgrow.com/cms/setting/processes";

  enum steps {
    match,
    nm
  }
  const [page, setPage] = useState(steps.nm);

  const checkUrl = () => {
    if (location.includes(urlMatch)) {
      if (location.includes("modify")) {
        setPage(steps.nm);
        return;
      }
      setPage(steps.match);
    }
  };

  useEffect(() => {
    checkUrl();
  }, []);

  return (
    <>
      {page === steps.match && <UpdateScriptPage />}
      {page === steps.nm && <NotMatchingPage step={3} />}
      <PathStepFooter steps={steps} step={page} setPage={setPage} />
    </>
  );
};

export default UpdateScript;

import React, { useEffect, useState } from "react";
import UpdateMetaJsonPage from "./UpdateMetaJson";
import NotMatchingPage from "../../../../../components/patch/NotMatchingPage";
import PathStepFooter from "../../../../../components/patch/StepFooter";

const UpdateMetaJson = () => {
  const location = window.location.href;

  const urlMatch = ["gateway.keepgrow.com/cms/setting/processes", "modify"];

  enum steps {
    match,
    nm
  }
  const [page, setPage] = useState(steps.nm);

  useEffect(() => {
    if (urlMatch.every((url) => location.includes(url))) {
      setPage(steps.match);
    }
  }, []);

  return (
    <>
      {page === steps.match && <UpdateMetaJsonPage />}
      {page === steps.nm && <NotMatchingPage />}
      <PathStepFooter steps={steps} step={page} setPage={setPage} />
    </>
  );
};

export default UpdateMetaJson;

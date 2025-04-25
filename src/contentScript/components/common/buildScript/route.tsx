import React, { useEffect, useState } from "react";
import BuildScriptPage from "./BuildScript";
import NotMatchingPage from "../../patch/NotMatchingPage";

const BuildScript = ({ hosting }: { hosting: "CAFE24" | "IMWEB" }) => {
  const location = window.location.href;

  const urlMatch = ["gateway.keepgrow.com/cms/setting/processes", "modify"];

  enum Steps {
    metaJson,
    nm
  }
  const [page, setPage] = useState(Steps.nm);

  useEffect(() => {
    if (urlMatch.every((url) => location.includes(url))) {
      setPage(Steps.metaJson);
      return;
    }
  }, []);

  return (
    <>
      {page === Steps.metaJson && <BuildScriptPage hosting={hosting} />}
      {page === Steps.nm && <NotMatchingPage />}
    </>
  );
};

export default BuildScript;

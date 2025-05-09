import React, { useEffect, useState } from "react";

import NotMatchingPage from "../../patch/NotMatchingPage";
import UpdateScriptPage from "./UpdateScript";

const UpdateScript = ({ hosting }: { hosting: "CAFE24" | "IMWEB" }) => {
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
      {page === steps.match && <UpdateScriptPage hosting={hosting} />}
      {page === steps.nm && <NotMatchingPage step={3} />}
    </>
  );
};

export default UpdateScript;

import React, { useEffect, useState } from "react";
import UpdateMetaJsonPage from "./UpdateMetaJson";
import NotMatchingPage from "../../patch/NotMatchingPage";

const UpdateMetaJson = ({ hosting }: { hosting: "CAFE24" | "IMWEB" }) => {
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
      {page === steps.match && <UpdateMetaJsonPage hosting={hosting} />}
      {page === steps.nm && <NotMatchingPage />}s{" "}
    </>
  );
};

export default UpdateMetaJson;

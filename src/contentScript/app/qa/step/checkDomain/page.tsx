import React, { useEffect, useState } from "react";
import { useQAData } from "../../../../../popup/store/qaData";
import QASaveDomain from "./SaveDomain";
import QAInDomain from "./InDomain";
const QACheckDomain = ({ hosting }: { hosting: string }) => {
  const location = window.location.href;

  enum steps {
    domain,
    inDomain
  }
  const [page, setPage] = useState(steps.domain);
  const { qaData } = useQAData();

  const urlCheck = () => {
    console.log(qaData);
    if (!qaData) return;

    if (location.includes(qaData.domain)) {
      setPage(steps.inDomain);
      return;
    }

    setPage(steps.domain);
    return;
  };

  useEffect(() => urlCheck(), [qaData]);

  return (
    <>
      {page === steps.domain && <QASaveDomain />}
      {page === steps.inDomain && <QAInDomain hosting={hosting} />}
    </>
  );
};

export default QACheckDomain;

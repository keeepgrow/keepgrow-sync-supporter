import React, { useEffect, useState } from "react";
import { useQAData } from "../../../../../popup/store/qaData";
import QASaveDomain from "./SaveDomain";
const QACheckDomain = ({ hosting }: { hosting: string }) => {
  const location = window.location.href;

  enum steps {
    domain
  }
  const [page, setPage] = useState(steps.domain);
  const { qaData } = useQAData();

  const urlCheck = () => {
    setPage(steps.domain);
    return;
  };

  useEffect(() => urlCheck(), [qaData]);

  return <>{page === steps.domain && <QASaveDomain hosting={hosting} />}</>;
};

export default QACheckDomain;

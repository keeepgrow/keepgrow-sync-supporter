import { Input, message } from "antd";
import React, { useEffect, useState } from "react";
import Button from "../../../../components/Button";
import { useQAData } from "../../../../../popup/store/qaData";

const QAInDomain = () => {
  const [domain, setDomain] = useState("");
  const { qaData, getQAData } = useQAData();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const qaData = await getQAData();
    if (qaData) setDomain(qaData.domain || "");
  };

  const onClick = () => {
    message.success(`QA를 진행합니다.`);

    setTimeout(async () => {
      await useQAData.updateStep(2);
    }, 1000);
  };
  return (
    <div>
      <div className="kg_con">
        <div className="kg_title">도메인 확인</div>
        <div className="kg_sub">QA를 진행합니다.</div>
        <div>{qaData?.domain}</div>
        <Button className="mt-3" onClick={onClick}>
          진행
        </Button>
      </div>
    </div>
  );
};

export default QAInDomain;

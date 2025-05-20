import { Input, message } from "antd";
import React, { useEffect, useState } from "react";
import Button from "../../../../components/Button";
import { useQAData } from "../../../../../popup/store/qaData";

const QAInDomain = ({ hosting }: { hosting: string }) => {
  const { qaData, getQAData } = useQAData();
  const [domain, setDomain] = useState(qaData?.domain);

  useEffect(() => {
    getQAData();
  }, []);
  useEffect(() => {
    setDomain(qaData?.domain);
  }, [qaData]);

  const onClick = () => {
    message.success(`도메인이 저장되었습니다. QA를 진행합니다.`);

    setTimeout(async () => {
      await useQAData.updateDomain(domain);
      await useQAData.updateStep(2);
      if (hosting === "cafe24") {
        window.location.href = `https://${domain}/member/login.html`;
      } else if (hosting === "imweb") {
        window.location.href = `https://${domain}/login`;
      }
    }, 1000);
  };
  return (
    <div>
      <div className="kg_con">
        <div className="kg_title">도메인 확인</div>
        <div className="kg_sub">QA를 시작합니다.</div>
        <Input
          placeholder="도메인을 입력해주세요."
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />
        <Button className="mt-3" onClick={onClick}>
          시작
        </Button>
      </div>
    </div>
  );
};

export default QAInDomain;

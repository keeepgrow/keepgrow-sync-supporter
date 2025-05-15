import { Input, message } from "antd";
import React, { useEffect, useState } from "react";
import Button from "../../../../components/Button";
import { useQAData } from "../../../../../popup/store/qaData";

const QASaveDomain = () => {
  const [domain, setDomain] = useState("");
  const { getQAData } = useQAData();

  const saveDomain = async () => {
    await useQAData.update("domain", domain);

    setTimeout(async () => {
      const formattedDomain = domain.startsWith("http") ? domain : `https://${domain}`;
      window.open(formattedDomain, "_blank");
    }, 1000);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const qaData = await getQAData();
    if (qaData) setDomain(qaData.domain || "");
  };
  return (
    <div>
      <div className="kg_con">
        <div className="kg_title">도메인 저장</div>
        <div className="kg_sub">도메인으로 이동합니다.</div>

        <Input placeholder="도메인을 입력해주세요." value={domain} onChange={(e) => setDomain(e.target.value)} />
        <Button className="mt-3" onClick={saveDomain}>
          저장
        </Button>
      </div>
    </div>
  );
};

export default QASaveDomain;

// ptry.co.kr/

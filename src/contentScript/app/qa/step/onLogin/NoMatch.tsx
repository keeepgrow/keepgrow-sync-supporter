import { Input, message } from "antd";
import React, { useEffect, useState } from "react";
import Button from "../../../../components/Button";
import { useQAData } from "../../../../../popup/store/qaData";

const NoMatch = ({ hosting }: { hosting: string }) => {
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
    message.success(`로그인 페이지로 이동합니다.`);

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
        <div className="kg_title">로그인 페이지 이동</div>
        <div className="kg_sub">로그인 페이지로 이동합니다.</div>
        <div className="kg_sub">{domain}</div>
        <Button className="mt-3" onClick={onClick}>
          이동
        </Button>
      </div>
    </div>
  );
};

export default NoMatch;

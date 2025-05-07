import { Button, Input } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useQAData } from "../../store/qaData";

const QAMainPage = () => {
  const hostings = ["cafe24", "imweb"];
  const navigate = useNavigate();

  const { startQA } = useQAData();
  const [hosting, setHosting] = useState("cafe24");
  const [domain, setDomain] = useState<string>("");

  const onStartQA = () => {
    if (!domain) return;

    startQA(hosting, domain);
    navigate(`/qa/${hosting}`);
  };

  return (
    <Wrapper>
      <div className="title">
        <div>QA할 호스팅사를 선택해주세요.</div>
      </div>
      <div className="flex_btn_box mt-3">
        {hostings.map((_hosting) => (
          <Button
            key={_hosting}
            type={_hosting === hosting ? "primary" : "default"}
            onClick={() => setHosting(_hosting)}
          >
            {_hosting.toUpperCase()}
          </Button>
        ))}
      </div>
      <div className="mt-3">
        <Input placeholder="도메인을 입력해주세요." onChange={(e) => setDomain(e.target.value)} />
      </div>
      <div className="mt-3">
        <Button type="primary" color="cyan" onClick={onStartQA} disabled={!domain || !hosting} size="large" block>
          시작
        </Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .flex_btn_box {
    display: flex;
    gap: 10px;
    justify-content: center;
    button {
      width: 100px;
    }
  }
`;

export default QAMainPage;

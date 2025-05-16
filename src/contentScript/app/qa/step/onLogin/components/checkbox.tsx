import React, { useEffect } from "react";
import { STORAGE_QA_KEY, useQAData } from "../../../../../../popup/store/qaData";
import styled from "styled-components";
import { Button } from "antd";

const LoginCheckbox = () => {
  const { getQAData, qaData } = useQAData();

  const checkList = ["mappingLogin", "pendingPage", "smartLogin", "loginFooter", "deliveryForm", "defaultSignup"];

  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<{ key: string; value: string }>;
      if (customEvent.detail.key === STORAGE_QA_KEY) {
        getQAData();
      }
    };
    document.addEventListener("statusChange", handler);
    return () => {
      document.removeEventListener("statusChange", handler);
    };
  }, [getQAData]);

  return (
    <Wrapper>
      <Button className={`kg_sub_title`} onClick={() => window.location.reload()} color="cyan">
        페이지 새로고침
      </Button>
      {qaData &&
        checkList.map((check) => (
          <div key={check} className={`kg_sub_title ${qaData[check] || false ? "kg_sub_title_success" : ""}`}>
            {check}
          </div>
        ))}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  .kg_sub_title {
    color: gray;
    border: 1px solid #f5f5f5;
    padding: 5px;
    text-align: center;
  }
  .kg_sub_title_success {
    font-weight: bold;
    color: #287cf9;
  }
`;

export default LoginCheckbox;

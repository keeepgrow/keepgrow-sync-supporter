import React, { useEffect } from "react";
import { STORAGE_QA_KEY, useQAData } from "../../../../../../popup/store/qaData";
import styled from "styled-components";

const LoginCheckbox = ({ hosting }: { hosting: string }) => {
  const { getQAData, qaData } = useQAData();

  // const checkList = [
  //   "mappingLogin",
  //   "pendingPage",
  //   "smartLogin",
  //   "loginFooter",
  //   "deliveryForm",
  //   "defaultSignup",
  // ];
  const checkList = [
    {
      key: "mappingLogin",
      title: "매핑 로그인"
    },
    {
      key: "pendingPage",
      title: "로그인 상태입니다."
    },
    {
      key: "smartLogin",
      title: "스마트 로그인"
    },
    {
      key: "loginFooter",
      title: "푸터 모달 확인"
    },
    {
      key: "deliveryForm",
      title: "배송 폼 확인"
    },
    {
      key: "defaultSignup",
      title: "기본 회원가입 창"
    }
  ];
  const imwebCheckList = [
    {
      key: "loginFooter",
      title: "푸터 모달 확인"
    },
    {
      key: "pendingPage",
      title: "로그인 상태입니다."
    },
    {
      key: "deliveryForm",
      title: "배송 폼 확인"
    },
    {
      key: "defaultSignup",
      title: "기본 회원가입 창"
    }
  ];

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
      {qaData &&
        (hosting === "imweb" ? imwebCheckList : checkList).map((check) => (
          <div key={check.key} className={`kg_sub_title ${qaData[check.key] || false ? "kg_sub_title_success" : ""}`}>
            {check.title}
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

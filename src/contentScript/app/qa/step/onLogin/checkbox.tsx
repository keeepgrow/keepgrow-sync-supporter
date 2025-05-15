import React, { useEffect, useState } from "react";
import { useQAData } from "../../../../../popup/store/qaData";
import styled from "styled-components";
import { Button } from "antd";

const LoginCheckbox = () => {
  const { getQAData } = useQAData();

  const [mappingLogin, setMappingLogin] = useState(false);
  const [pendingPage, setPendingPage] = useState(false);
  const [smartLogin, setSmartLogin] = useState(false);
  const getData = async () => {
    const qaData = await getQAData();
    if (qaData) {
      setMappingLogin(qaData.mappingLogin);
      setPendingPage(qaData.pendingPage);
      setSmartLogin(qaData.smartLogin);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Wrapper>
      <div className={`kg_sub_title ${mappingLogin ? "kg_sub_title_success" : ""}`}>계정연동 </div>
      <div className={`kg_sub_title ${pendingPage ? "kg_sub_title_success" : ""}`}>계류 페이지 </div>
      <div className={`kg_sub_title ${smartLogin ? "kg_sub_title_success" : ""}`}>스마트 로그인 </div>
      <div className={`kg_sub_title ${smartLogin ? "kg_sub_title_success" : ""}`}>장바구니</div>
      <Button className={`kg_sub_title`} onClick={() => getQAData()} color="cyan">
        ↪️
      </Button>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  .kg_sub_title {
    width: 120px;
    color: gray;
    border: 1px solid #ccc;
    padding: 5px;
    text-align: center;
  }
  .kg_sub_title_success {
    font-weight: bold;
    color: #287cf9;
  }
`;

export default LoginCheckbox;

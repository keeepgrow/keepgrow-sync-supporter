import { Button } from "antd";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useQAData } from "../../../store/qaData";

const QAPage = () => {
  const params = useParams();
  const hosting = params.hosting;

  const navigate = useNavigate();

  const { endQA } = useQAData();

  const onSubmit = () => {
    endQA();
    navigate("/main");
  };

  return (
    <Wrapper>
      <div className="title">{hosting} QA 진행중..</div>
      <div className="mt-3">
        <Button onClick={onSubmit} size="large" type="primary" block>
          종료
        </Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section``;

export default QAPage;

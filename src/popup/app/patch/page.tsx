import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PatchSelectPage = () => {
  const hostings = ["cafe24", "imweb"];
  const navigate = useNavigate();
  const onPatch = (hosting: string) => {
    navigate(`/patch/${hosting}`);
  };
  return (
    <Wrapper>
      <div className="title">
        <div>패치할 호스팅사를 선택해주세요.</div>
      </div>
      <div className="flex_box mt-3">
        {hostings.map((hosting) => (
          <Button key={hosting} size="large" type="primary" color="default" block onClick={() => onPatch(hosting)}>
            {hosting.toUpperCase()}
          </Button>
        ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section``;

export default PatchSelectPage;

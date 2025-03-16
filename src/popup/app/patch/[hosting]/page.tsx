import { Button } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { usePatchData } from "../../../store/patchData";

const PatchPage = () => {
  const params = useParams();
  const hosting = params.hosting;

  const navigate = useNavigate();

  const { patchData, startPatch, endPatch } = usePatchData();

  useEffect(() => {
    if (!patchData) {
      startPatch(hosting);
    }
  }, [patchData]);

  const onSubmit = () => {
    endPatch();
    navigate("/main");
  };

  return (
    <Wrapper>
      <div className="title">{hosting} 패치 진행중..</div>
      <div className="mt-3">
        <Button onClick={onSubmit} size="large" type="primary" block>
          종료
        </Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section``;

export default PatchPage;

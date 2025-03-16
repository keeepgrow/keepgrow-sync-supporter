import React from "react";
import styled from "styled-components";
import { theme } from "../../style/theme";
import { getArrayFromEnum } from "../../utils/utils";

interface Props {
  steps;
  step: number;
  setPage: (page: number) => void;
}

const PathStepFooter = ({ step, steps, setPage }: Props) => {
  const onClick = (step: number) => {
    setPage(step);
  };
  return (
    <Wrapper>
      <div className="step_wrapper">
        {getArrayFromEnum(steps).map((s) => (
          <div key={s} onClick={() => onClick(s)} className={s === step ? "step active" : "step"}>
            {s}
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .step_wrapper {
    width: fit-content;
    margin: auto;
    border-radius: 10px;
    margin-top: 50px;
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
    gap: 30px;
  }
  .step {
    width: 15px;
    height: 15px;
    font-size: 10px;

    display: flex;
    justify-content: center;
    align-items: center;
    color: ${theme.color.font};
    cursor: pointer;
  }
  .active {
    color: ${theme.color.main};
    background-color: ${theme.color.light};
    border-radius: 50%;
    font-weight: bold;
  }
`;

export default PathStepFooter;

import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { usePatchData } from "../../../popup/store/patchData";
import { theme } from "../../style/theme";

interface Props {
  steps: { step: number; title: string }[];
  step: number;
}

const PatchStepHeader = ({ steps, step }: Props) => {
  const navigate = useNavigate();
  const onClick = (step: number) => {
    usePatchData.updateStep(step, navigate);
  };

  return (
    <Wrapper>
      <div className="header_flex_box">
        {step && <div className="step_now">{`${step}. ${steps[step - 1].title}`}</div>}
      </div>
      <div className="step_wrapper">
        {steps.map((s) => (
          <div key={s.step} onClick={() => onClick(s.step)} className={s.step === step ? "step active" : "step"}>
            {s.step}
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 20px;

  .header_flex_box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .kg_note {
      font-size: 20px;
      cursor: pointer;
    }
    .step_now {
      width: 100%;
      text-align: center;
      font-weight: bold;
      font-size: 14px;
      margin-bottom: 10px;
      color: #333;
    }
  }
  .step_wrapper {
    margin-top: 10px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 20px;
  }

  .step {
    padding: 10px;
    width: 12px;
    height: 12px;
    font-size: 10px;
    display: flex;
    justify-content: center;
    font-weight: 500;
    align-items: center;
    background-color: #eaeaea;

    border-radius: 30px;
    cursor: pointer;
    &:hover {
      background-color: #c6c6c6
    }
  }

  .active {
    color: #fff;
    background-color: #333;
    font-weight: bold;
    &:hover {
      background-color: ${theme.color.font};
    }
  }
`;

export default PatchStepHeader;

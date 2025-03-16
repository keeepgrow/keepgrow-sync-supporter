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
  background: linear-gradient(145deg, #0e3a7c, #133564);
  padding: 10px 15px 30px 15px;
  border-radius: 15px;

  .header_flex_box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .kg_note {
      font-size: 20px;
      cursor: pointer;
    }
    .step_now {
      margin: 10px 0;
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 20px;
      color: ${theme.color.secondary};
    }
  }
  .step_wrapper {
    width: 100%;
    background-color: ${theme.color.white};
    border-radius: 50px;
    margin-top: 10px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 60px;
  }

  .step {
    padding: 10px;
    width: 15px;
    height: 15px;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: ${theme.color.secondary}; */
    color: ${theme.color.font};

    border-radius: 30px;
    cursor: pointer;
    &:hover {
      background-color: ${theme.color.secondary};
    }
  }

  .active {
    color: ${theme.color.secondary};
    background-color: ${theme.color.main};
    font-weight: bold;
    &:hover {
      background-color: ${theme.color.font};
    }
  }
`;

export default PatchStepHeader;

import { message } from "antd";
import React from "react";
import styled from "styled-components";
import { usePatchData } from "../../../../../../popup/store/patchData";
import { useNavigate } from "react-router-dom";
import Button from "../../../../../components/Button";
import SquareButton from "../../../../../components/SquareButton";

const Cafe24ManagePage = () => {
  const onClickButton = (num) => {
    const buttons = document.querySelectorAll("#main_design_card_edit_button") as NodeListOf<HTMLButtonElement>;
    try {
      buttons[num]?.click();
    } catch (e) {
      message.error("버튼을 찾을 수 없습니다.");
    }
  };

  const navigate = useNavigate();

  const onClickNewPatch = () => {
    usePatchData.updateStep(1, navigate);
    usePatchData.endPatch();
    window.location.href = "https://gateway.keepgrow.com/cms/main";
  };
  const onClickEnd = () => {
    usePatchData.endPatch();
  };

  return (
    <Wrapper>
      <div className="kg_con">
        <div className="kg_title">CAFE24 디자인 페이지</div>
        <div className="kg_sub">
          <div>PC , 모바일 환경 세팅을 시작합니다.</div>
          <div>패치를 마쳤다면 완료를 눌러주세요.</div>
        </div>

        <div className="button_box mt-2">
          <Button color="secondary" onClick={() => onClickButton(0)}>
            PC
          </Button>
          <Button color="secondary" onClick={() => onClickButton(1)}>
            MOBILE
          </Button>
        </div>
      </div>
      <div className="kg_btn_box">
        <SquareButton color="secondary" onClick={onClickEnd}>
          패치 종료
        </SquareButton>
        <SquareButton onClick={onClickNewPatch}>새 패치 시작</SquareButton>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .button_box {
    display: flex;
    gap: 10px;
    justify-content: center;
  }
  .kg_btn_box {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: 20px;
  }
`;

export default Cafe24ManagePage;

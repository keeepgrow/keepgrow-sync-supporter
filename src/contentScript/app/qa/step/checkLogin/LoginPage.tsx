import React, { useState } from "react";
import { Button, message } from "antd";
import styled from "styled-components";

const QALoginPage = () => {
  const [successFooter, setSuccessFooter] = useState<"success" | "fail">();

  const onClickFooter = () => {
    const footer = document.querySelector("#KG_footer .ment") as HTMLElement;
    if (!footer) {
      setSuccessFooter("fail");
      message.error("Footer를 찾을 수 없습니다.");
      return;
    }

    footer.scrollIntoView({ behavior: "smooth" });

    message.info("Footer 클릭");
    footer.style.backgroundColor = "yellowgreen";

    setTimeout(() => {
      footer.click();
      setSuccessFooter("success");
    }, 500);

    setTimeout(() => {
      const popupClosedBtn = document.querySelector("#syncServicePopup .closed") as HTMLElement;
      if (!popupClosedBtn) {
        setSuccessFooter("fail");
        message.error("팝업 닫기 버튼을 찾을 수 없습니다.");
        return;
      }
      popupClosedBtn.click();
    }, 1000);
  };
  return (
    <div>
      <div className="kg_con">
        <div className="kg_title">로그인 확인</div>
        <div className="kg_sub">로그인 화면을 확인합니다.</div>
        <div className="kg_sub">
          <div>
            {successFooter &&
              `Footer : ${(<span className={successFooter ? "success" : "fail"}>{successFooter}</span>)}`}
          </div>
        </div>
        <Button className="mt-3" onClick={onClickFooter} type="dashed">
          Footer 확인
        </Button>
      </div>
    </div>
  );
};

const Wrapper = styled.div`
  .kg_sub {
    .success {
      color: green;
    }
    .fail {
      color: red;
    }
  }
`;

export default QALoginPage;

import React, { useState } from "react";
import { Button as AntdButton, message } from "antd";
import Button from "../../../../components/Button";
import { useQAData } from "../../../../../popup/store/qaData";

const QASignupPage = () => {
  const [successFooter, setSuccessFooter] = useState<boolean>();

  const onClickFooter = () => {
    const footer = document.querySelector("#KG_footer .ment") as HTMLElement;
    if (!footer) {
      setSuccessFooter(false);
      message.error("Footer를 찾을 수 없습니다.");
      return;
    }

    footer.scrollIntoView({ behavior: "smooth" });

    message.success("Footer 클릭");
    footer.style.backgroundColor = "yellowgreen";

    setTimeout(() => {
      footer.click();
      setSuccessFooter(true);
    }, 500);

    setTimeout(() => {
      const popupClosedBtn = document.querySelector("#syncServicePopup .closed") as HTMLElement;
      if (!popupClosedBtn) {
        setSuccessFooter(false);
        message.error("팝업 닫기 버튼을 찾을 수 없습니다.");
        return;
      }
      popupClosedBtn.click();
    }, 1000);
  };
  const onClickKakaoLogin = () => {
    const kakaoLoginBtn = document.querySelector(".btnKakao") as HTMLElement;
    if (!kakaoLoginBtn) {
      message.error("카카오 로그인 버튼을 찾을 수 없습니다.");
      return;
    }
    kakaoLoginBtn.style.backgroundColor = "pink";
    message.success("카카오 로그인 버튼 클릭");
    setTimeout(() => {
      kakaoLoginBtn.click();
    }, 500);
  };

  const onClickSignup = () => {
    const signupBtnWrapper = document.querySelector("#memberJoin") as HTMLElement;
    // 여기 안에 P 태그 확인
    const signupButton = signupBtnWrapper.querySelector("p") as HTMLElement;
    if (!signupButton) {
      message.error("회원가입 버튼을 찾을 수 없습니다.");
      return;
    }
    message.success("회원가입 버튼 클릭");
    signupButton.style.backgroundColor = "yellowgreen";
    setTimeout(() => {
      signupButton.click();
      useQAData.update("defaultSignup", true);
    }, 1000);
  };

  return (
    <div>
      <div className="kg_con">
        <div className="kg_title">회원가입 확인</div>
        <div className="kg_sub">회원가입 화면을 확인합니다.</div>
        <div className="kg_sub">
          {successFooter !== undefined && (
            <div>
              Footer :<span style={{ color: successFooter ? "blue" : "red" }}>{successFooter ? "성공" : "실패"}</span>
            </div>
          )}
        </div>

        <div className="mt-3">
          <AntdButton onClick={onClickFooter} type="dashed">
            Footer 확인
          </AntdButton>
          <AntdButton className="ml-3" onClick={onClickSignup} type="dashed">
            일반 회원가입
          </AntdButton>
        </div>
        <Button className="mt-3" onClick={onClickKakaoLogin}>
          카카오 로그인 확인
        </Button>
      </div>
    </div>
  );
};

export default QASignupPage;

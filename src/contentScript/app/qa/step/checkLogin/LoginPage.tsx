import React, { useEffect, useState } from "react";
import { Button as AntdButton, message } from "antd";
import Button from "../../../../components/Button";

const QALoginPage = () => {
  const [successFooter, setSuccessFooter] = useState<boolean>();
  const [successDelivery, setSuccessDelivery] = useState<boolean>();

  const [isDeliveryPage, setIsDeliveryPage] = useState<boolean>(false);

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

  const onClickDelivery = () => {
    const deliveryBtn = Array.from(document.querySelectorAll("a")).find(
      (el) => el.textContent?.trim() === "비회원 배송조회"
    ) as HTMLElement;

    if (!deliveryBtn) {
      setSuccessDelivery(false);
      message.error("비회원 배송조회 버튼을 찾을 수 없습니다.");
      return;
    }

    deliveryBtn.style.backgroundColor = "yellowgreen";

    message.success("비회원 배송조회 버튼 클릭");

    setTimeout(() => {
      deliveryBtn.click();
    }, 500);
  };

  const onClickSignup = () => {
    const signupBtn = Array.from(document.querySelectorAll("a")).find(
      (el) => el.textContent?.trim() === "회원가입"
    ) as HTMLElement;
    if (!signupBtn) {
      message.error("회원가입 버튼을 찾을 수 없습니다.");
      return;
    }
    signupBtn.style.backgroundColor = "pink";

    message.success("회원가입 페이지로 이동");
    setTimeout(() => {
      if (!signupBtn) {
        message.error("회원가입 버튼을 찾을 수 없습니다.");
        return;
      }
      signupBtn.click();
    }, 1000);
  };

  const checkDeliveryPage = () => {
    const form = document.querySelector("#normalLogin_id") as HTMLElement;
    if (!form) {
      setSuccessDelivery(false);
      message.error("비회원 배송조회 form을 찾을 수 없습니다.");
      return;
    }
    // form 안에 Input 을 확인 - 주문자명, 주문번호, 비회원주문 비밀번호 가  포함된걸 확인

    const inputs = Array.from(form.querySelectorAll("input")) as HTMLInputElement[];

    const result = inputs.some((input) => {
      console.log("input", input.placeholder);
      if (
        input.placeholder.includes("주문자명") ||
        input.placeholder.includes("주문번호") ||
        input.placeholder.includes("비회원주문 비밀번호")
      ) {
        return true;
      }
      return false;
    });
    console.log("result", result);
    if (result) {
      message.success("비회원 배송조회 form 확인 완료");
    }

    if (!result) {
      setSuccessDelivery(false);
      message.error("비회원 배송조회 form에 필요한 요소가 없습니다.");
      return;
    }

    setSuccessDelivery(true);
  };

  useEffect(() => {
    const location = window.location.href;

    if (location.includes("noMemberOrder")) {
      message.success("비회원 배송조회 페이지입니다.");
      setIsDeliveryPage(true);

      checkDeliveryPage();
    }
  }, []);

  return (
    <div>
      <div className="kg_con">
        <div className="kg_title">로그인 확인</div>
        <div className="kg_sub">{isDeliveryPage ? "비회원 배송조회 페이지" : "로그인 화면을 확인합니다."}</div>

        <div className="kg_sub">
          {successFooter !== undefined && (
            <div>
              Footer :<span style={{ color: successFooter ? "blue" : "red" }}>{successFooter ? "성공" : "실패"}</span>
            </div>
          )}
          {successDelivery !== undefined && (
            <div>
              비회원 배송조회 영역 확인 :
              <span style={{ color: successDelivery ? "blue" : "red" }}>{successDelivery ? "성공" : "실패"}</span>
            </div>
          )}
        </div>
        <div className="mt-3">
          <AntdButton onClick={onClickFooter} type="dashed">
            Footer
          </AntdButton>
          <AntdButton className="ml-3" onClick={onClickDelivery} type="dashed">
            비회원 배송조회
          </AntdButton>
        </div>

        <Button className="mt-3" onClick={onClickSignup}>
          회원가입 페이지 이동
        </Button>
      </div>
    </div>
  );
};

export default QALoginPage;

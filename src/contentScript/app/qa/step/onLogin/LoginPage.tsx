import React, { useEffect, useState } from "react";
import { useQAData } from "../../../../../popup/store/qaData";
import { message, Button as AntdButton } from "antd";
import Button from "../../../../components/Button";

const Onlogin = () => {
  const { getQAData } = useQAData();
  const checkIsPendingPage = () => {
    const titles = document.querySelectorAll("h2");
    const title = Array.from(titles).find((title) => title.textContent === "로그인 상태입니다.");
    return title ? true : false;
  };

  const [page, setPage] = useState<"smart" | "delivery" | "pending" | "default">("default");

  const checkIsSmartLogin = () => {
    // <img class='smartLoginImg'/> 확인
    const img = document.querySelector("img.smartLoginImg");
    if (img) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    const location = window.location.href;

    if (location.includes("noMemberOrder")) {
      message.success("비회원 배송조회 페이지입니다.");
      setPage("delivery");

      checkDeliveryForm();
    }

    const isPendingPage = checkIsPendingPage();
    if (isPendingPage) {
      setPage("pending");
      useQAData.update("pendingPage", true);
      getQAData();
    }
    const isSmartLogin = checkIsSmartLogin();
    if (isSmartLogin) {
      setPage("smart");
      useQAData.update("smartLogin", true);
      getQAData();
    }
  }, []);

  const onClickFooter = () => {
    const footer = document.querySelector("#KG_footer .ment") as HTMLElement;
    if (!footer) {
      message.error("Footer를 찾을 수 없습니다.");
      return;
    }

    footer.scrollIntoView({ behavior: "smooth" });

    message.success("Footer 클릭");
    footer.style.backgroundColor = "yellowgreen";

    setTimeout(() => {
      footer.click();
    }, 500);

    setTimeout(() => {
      const popupClosedBtn = document.querySelector("#syncServicePopup .closed") as HTMLElement;
      if (!popupClosedBtn) {
        message.error("팝업 닫기 버튼을 찾을 수 없습니다.");
        return;
      }
      useQAData.update("loginFooter", true);
      popupClosedBtn.click();
    }, 3000);
  };

  const onClickDelivery = () => {
    const deliveryBtn = Array.from(document.querySelectorAll("a")).find(
      (el) => el.textContent?.trim() === "비회원 배송조회"
    ) as HTMLElement;

    if (!deliveryBtn) {
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
    const signupBtn = document.querySelector("a.right") as HTMLElement;
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
      useQAData.update("defaultSignup", true);
      signupBtn.click();
    }, 1000);
  };

  const checkDeliveryForm = () => {
    const form = document.querySelector("#normalLogin_id") as HTMLElement;
    if (!form) {
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
      useQAData.update("deliveryForm", true);
    }

    if (!result) {
      message.error("비회원 배송조회 form에 필요한 요소가 없습니다.");
      return;
    }
  };
  const onClickKakaoLogin = () => {
    let loginBtn = null;
    if (page === "smart") {
      loginBtn = document.querySelector(".memberTypeLogin") as HTMLElement;
    } else {
      loginBtn = document.querySelector(".btnKakao") as HTMLElement;
    }
    if (!loginBtn) {
      message.error("카카오 로그인 버튼을 찾을 수 없습니다.");
      return;
    }
    loginBtn.style.backgroundColor = "pink";
    message.success("카카오 로그인 버튼 클릭");
    setTimeout(() => {
      loginBtn.click();
    }, 500);
  };

  const mapPage = {
    smart: "스마트 로그인 페이지",
    delivery: "비회원 배송조회 페이지",
    default: "로그인 페이지"
  };
  return (
    <div>
      <div className="kg_title">{mapPage[page]}</div>

      <div className="kg_sub">
        {page === "default" && (
          <AntdButton className="ml-3" onClick={onClickFooter} type="dashed">
            Footer
          </AntdButton>
        )}
        {page === "default" && (
          <AntdButton className="ml-3" onClick={onClickDelivery} type="dashed">
            비회원 배송조회 이동
          </AntdButton>
        )}
        {page === "default" && (
          <AntdButton className="ml-3" onClick={onClickSignup} type="dashed">
            회원가입 페이지 이동
          </AntdButton>
        )}
      </div>

      <Button className="mt-3" onClick={onClickKakaoLogin}>
        로그인
      </Button>
    </div>
  );
};

export default Onlogin;

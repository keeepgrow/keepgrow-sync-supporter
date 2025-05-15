import React, { useEffect } from "react";
import { message } from "antd";

const Cart = () => {
  useEffect(() => {
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

    window.scrollTo({ top: scrollHeight, behavior: "smooth" } as ScrollToOptions);
    setTimeout(() => {
      const isPopup = document.querySelector(".kg-booster-content");
      console.log("isPopup", isPopup);
      if (isPopup) {
        message.success("팝업 확인");
      } else {
        message.error("팝업 확인 실패");
      }
    }, 1000);
  }, []);

  return (
    <div>
      <div className="kg_title">장바구니 페이지 확인</div>
    </div>
  );
};

export default Cart;

import React, { useEffect } from "react";
import { message } from "antd";
import { useQAData } from "../../../../../popup/store/qaData";

const Cart = () => {
  useEffect(() => {
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

    window.scrollTo({ top: scrollHeight, behavior: "smooth" } as ScrollToOptions);
    setTimeout(() => {
      const isPopup = document.querySelector(".kg-booster-content");

      if (isPopup) {
        useQAData.update("basketModal", true);
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

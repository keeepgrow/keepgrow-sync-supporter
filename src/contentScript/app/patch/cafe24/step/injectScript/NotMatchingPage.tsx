import React from "react";
import Button from "../../../../../components/Button";

const NotMatchingPage4 = () => {
  const onClick = () => {
    window.location.href = "https://eclogin.cafe24.com/Shop";
  };
  return (
    <div className="kg_con">
      <div className="kg_title">CAFE24 로 이동합니다.</div>
      <div className="kg_sub">*부운영자는 직접 로그인 해주세요</div>
      <Button onClick={onClick}>이동</Button>
    </div>
  );
};

export default NotMatchingPage4;

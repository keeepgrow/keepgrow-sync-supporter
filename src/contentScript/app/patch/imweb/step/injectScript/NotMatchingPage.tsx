import React from "react";
import Button from "../../../../../components/Button";

const NotMatchingPage4 = () => {
  const onClick = () => {
    window.location.href = "https://imweb.me/login";
  };
  return (
    <div className="kg_con">
      <div className="kg_title">IMWEB으로 이동합니다.</div>
      <Button onClick={onClick}>이동</Button>
    </div>
  );
};

export default NotMatchingPage4;

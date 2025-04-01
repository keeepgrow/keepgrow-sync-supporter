import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../../../../components/Button";

const ImwebMainPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const buttons = document.querySelectorAll("button > div");
    const mySiteElement = Array.from(buttons).find((element) => element.textContent?.includes("내사이트"));

    if (mySiteElement) {
      setIsLogin(true);
    }
  }, []);

  const onClick = () => {
    if (isLogin) {
      window.location.href = "https://imweb.me/mysite";
    } else {
      window.location.href = "https://imweb.me/login";
    }
  };
  return (
    <Wrapper>
      <div className="kg_con">
        {isLogin ? (
          <>
            <div className="kg_title">IMWEB MySite 이동</div>
            <div className="kg_sub">Mysite로 이동합니다.</div>
            <Button onClick={onClick}>이동</Button>
          </>
        ) : (
          <>
            <div className="kg_title">IMWEB 로그인</div>
            <div className="kg_sub">로그인 페이지로 이동합니다.</div>
            <Button onClick={onClick}>이동</Button>
          </>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .login_box {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 30px;
    margin-bottom: 30px;
    font-size: 12px;
  }
`;

export default ImwebMainPage;

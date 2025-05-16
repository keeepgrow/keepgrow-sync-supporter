import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { usePatchData } from "../../../../../../popup/store/patchData";
import Button from "../../../../../components/Button";

const Cafe24ChangePWPage = () => {
  const [userInfo, setUserInfo] = useState({ id: "", password: "" });
  const { getPatchData } = usePatchData();

  const getUserInfo = async () => {
    const patchData = await getPatchData();
    if (patchData) {
      setUserInfo(patchData.userInfo);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const onClick = () => {
    const nextButton = document.querySelector(".btnEm") as HTMLButtonElement;
    nextButton?.click();
  };

  return (
    <Wrapper>
      <div className="kg_con">
        <div className="kg_title">CAFE24 비밀번호 변경</div>
        <div className="kg_sub">다음에 변경하기</div>
        <Button onClick={onClick}>넘어가기</Button>
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

export default Cafe24ChangePWPage;

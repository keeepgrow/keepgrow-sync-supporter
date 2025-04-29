import React, { useEffect } from "react";
import styled from "styled-components";
import { usePatchData } from "../../../../../../popup/store/patchData";
import Button from "../../../../../components/Button";
import { message } from "antd";

const Cafe24JsKey = () => {
  const { getPatchData, patchData } = usePatchData();

  useEffect(() => {
    getPatchData();
  }, []);
  const onClick = () => {
    const findJsKeyElement = () => {
      const element = document.querySelector(".kakaosync_javascript_key");
      return element as HTMLInputElement;
    };

    const element = findJsKeyElement();
    if (element) {
      element.style.backgroundColor = "#ffff73";
      usePatchData.updateJsKey(element.textContent?.trim());
      message.success(`jsKey가 저장되었습니다 : ${element.textContent?.trim()}`);
      getPatchData();
      setTimeout(() => {
        window.close();
      }, 2000);
    } else {
      message.error("jsKey를 찾을 수 없습니다.");
    }
  };

  return (
    <Wrapper>
      <div className="kg_con">
        <div className="kg_title">CAFE24 jsKey 확인</div>
        <div className="kg_sub">jsKey 저장 </div>
        <div className="login_box">
          <div>domain : {patchData?.domain || "-"}</div>
          <div>jsKey : {patchData?.jsKey || "-"}</div>
        </div>
        <Button onClick={onClick}>jsKey 저장</Button>
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

export default Cafe24JsKey;

import { Checkbox, message } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useInput from "../../../../popup/utils/hooks/useInput";
import TextArea from "antd/es/input/TextArea";
import { usePatchData } from "../../../../popup/store/patchData";
import { useNavigate } from "react-router-dom";
import { scriptContent } from "../../../utils/patch/script";
import Button from "../../Button";

const HOSTING_INFO = {
  CAFE24: {
    URL: "https://eclogin.cafe24.com/Shop/",
    JS_URL: "https://gateway.keepgrow.com/cms/setting/processes/integratedScript"
  },
  IMWEB: {
    URL: "https://imweb.me/login",
    JS_URL: "https://gateway.keepgrow.com/cms/setting/processes/integratedScript"
  }
};
const UpdateScriptPage = ({ hosting }: { hosting: "CAFE24" | "IMWEB" }) => {
  const [src, setSrc] = useState<string | null>(null);
  const navigate = useNavigate();
  const { value: dataEnvMobile, onChange } = useInput(false);
  const {
    value: textAreaValue,
    setValue: setTextAreaValue,
    onChange: onChangeTextValue
  } = useInput(scriptContent[hosting](src, dataEnvMobile));

  const getUrl = async () => {
    const getElement = async (retryCount = 2) => {
      for (let i = 0; i < retryCount; i++) {
        const element = document.querySelector("#integratedScript");
        if (element) return element;
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
      return document.querySelector("#integratedScript");
    };
    const element = await getElement();
    if (!element) return;
    const match = element.innerHTML.match(/src="([^"]+)"/);
    if (match) setSrc(match[1]);
  };

  useEffect(() => {
    getUrl();
  }, []);

  useEffect(() => {
    setTextAreaValue(scriptContent[hosting](src, dataEnvMobile));
  }, [src, dataEnvMobile]);

  const onClick = () => {
    usePatchData.update("script", textAreaValue);
    message.success("스크립트가 저장되었습니다.");

    setTimeout(() => {
      usePatchData.updateStep(5, navigate);
      window.location.href = HOSTING_INFO[hosting].URL;
    }, 1000);
  };

  return (
    <Wrapper className="kg_con">
      <div className="kg_title">통합스크립트 내용 수정</div>
      <div className="kg_sub">반응형 확인(cafe24)과 스크립트 수정을 진행합니다.</div>
      {src ? (
        <>
          <div className="mt-3">
            {hosting === "CAFE24" && (
              <>
                <div className="input_checkbox_label">
                  data-env <Checkbox checked={dataEnvMobile} onChange={onChange} />
                </div>
                <div className="input_desc mt-2">
                  시크릿모드 - PC, 모바일 - 회원가입 페이지 agreement.html 경우에만 해당 - 사용 여부 확인
                </div>
                <div className="input_desc">data-env="mobile" 삽입</div>
              </>
            )}
          </div>

          <div className="mt-4">
            <div className="input_label">통합 JS - {hosting}</div>
            <TextArea
              className="mt-2"
              autoSize={{ minRows: 10 }}
              size="small"
              onChange={onChangeTextValue}
              value={textAreaValue}
            />
          </div>

          <Button className="mt-4" onClick={onClick}>
            통합 스크립트 저장
          </Button>
        </>
      ) : (
        <div className="mt-4">
          <div className="input_label">통합 JS - {hosting}</div>
          <div className="input_desc">통합 JS 주소가 없습니다.</div>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .input_checkbox_label {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    display: flex;
    gap: 10px;
  }
  .input_desc {
    margin-top: 5px;
    font-size: 12px;
    color: #666;
  }
  .input_label {
    font-size: 14px;
    font-weight: 600;
    color: #333;
  }
  textarea {
    font-size: 10px;
  }
`;

export default UpdateScriptPage;

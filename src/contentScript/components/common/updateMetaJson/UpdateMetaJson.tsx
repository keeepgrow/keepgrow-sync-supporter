import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Checkbox, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { usePatchData } from "../../../../popup/store/patchData";
import { useNavigate } from "react-router-dom";
import Alert from "antd/es/alert/Alert";
import Button from "../../Button";

const UpdateMetaJsonPage = ({ hosting }: { hosting: "CAFE24" | "IMWEB" }) => {
  const navigate = useNavigate();

  const DEFAULT_INPUT_FIELD = {
    CAFE24: {
      KGJS_responsive: false,
      KGJS_shopName: "",
      KGJS_logoName: "",
      KGJS_accessKey: "",
      KGJS_domain: "",
      KGJS_uiHide: false
    },
    IMWEB: {
      KGJS_domain: "",
      KGJS_logoName: "",
      KGJS_shopName: "",
      KGJS_uiHide: false
    }
  };
  const [inputFields, setInputFields] = useState(DEFAULT_INPUT_FIELD[hosting]);

  const [textAreaValue, setTextAreaValue] = useState("");
  const kgtextArea = document.querySelector("#copyMetaJson") as HTMLTextAreaElement;
  const saveMetaJsonButton = document.querySelector("#meta-json-patch") as HTMLButtonElement;

  const [isError, setIsError] = useState(false);
  const { patchData, getPatchData } = usePatchData();

  useEffect(() => {
    if (!kgtextArea) return;
    getPatchData();

    const formattedData = formattedJsonString(kgtextArea.value);
    if (formattedData) {
      // defaultMetaJson에 formattedData를 덮어씌움
      setInputFields({ ...inputFields, ...formattedData });
    }
  }, []);

  useEffect(() => {
    setTextAreaValue(convertToRawFormat(inputFields));
  }, [inputFields]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputFields((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };
  const formattedJsonString = (rawData) => {
    try {
      // 중괄호 제거
      const content = rawData.slice(1, -1);
      const result = {};
      let pos = 0;

      while (pos < content.length) {
        // 키와 값 분리
        const keyStart = content.indexOf("=", pos);
        if (keyStart === -1) break;

        const key = content.slice(pos, keyStart).trim();
        let valueStart = keyStart + 1;
        let value;
        let valueEnd;

        // 객체 형식인지 확인 (중첩된 객체 처리)
        if (content[valueStart] === "{") {
          let bracketCount = 1;
          valueEnd = valueStart + 1;

          while (bracketCount > 0 && valueEnd < content.length) {
            if (content[valueEnd] === "{") bracketCount++;
            if (content[valueEnd] === "}") bracketCount--;
            valueEnd++;
          }

          // 객체를 문자열로 처리
          value = content.slice(valueStart, valueEnd).trim();
        } else {
          // 일반 값 처리
          valueEnd = content.indexOf(",", valueStart);
          if (valueEnd === -1) valueEnd = content.length;

          value = content.slice(valueStart, valueEnd).trim();

          // 빈 값 처리
          if (value === "") {
            value = "";
          }
          // boolean 값 처리
          else if (value === "true") value = true;
          else if (value === "false") value = false;
          // 숫자 값 처리 (빈 값이 아닐 때만)
          else if (!isNaN(value) && !value.includes(".") && value !== "") value = Number(value);
        }

        result[key] = value;
        pos = valueEnd + 1;
      }

      return result;
    } catch (error) {
      console.error("❌ JSON 변환 오류:", error);
      setIsError(true);
      return null;
    }
  };

  const convertToRawFormat = (data) => {
    const entries = Object.entries(data);
    const formattedEntries = entries.map(([key, value]) => {
      let formattedValue = value;

      if (typeof value === "object" && value !== null) {
        console.log("🔍 객체 형식:", key, value);
        // 객체를 문자열로 변환할 때 JSON.stringify 사용
        formattedValue = JSON.stringify(value);
      } else if (typeof value === "boolean") {
        formattedValue = value.toString();
      } else if (typeof value === "number") {
        formattedValue = value.toString();
      } else {
        formattedValue = value;
      }

      return `${key}=${formattedValue}`;
    });

    return `{${formattedEntries.join(", ")}}`;
  };

  // 호스팅별 필수값
  const HOSTING_REQUIRED_FIELDS = {
    CAFE24: ["KGJS_accessKey", "KGJS_domain", "KGJS_uiHide", "KGJS_responsive", "KGJS_shopName"],
    IMWEB: ["KGJS_domain", "KGJS_shopName", "KGJS_uiHide"]
  };

  const highlightFields = HOSTING_REQUIRED_FIELDS[hosting];
  const getLabelClass = (key) => (highlightFields.includes(key) ? "highlight input_label" : "input_label");

  const onClick = async () => {
    await usePatchData.update("domain", inputFields["KGJS_domain"]);

    message.success(`MetaJson이 저장되었습니다.`);
    kgtextArea.value = textAreaValue;

    setTimeout(() => {
      saveMetaJsonButton?.click();
      usePatchData.updateStep(3, navigate);
    }, 1000);
  };

  const checkCheckbox = (value) => {
    if (value === "true") return true;
    if (value === "false") return false;
    return value;
  };

  if (isError) {
    return <Alert message="JSON 형식이 잘못되었습니다." type="error" />;
  }
  const isCheckbox = (key) => {
    const checkList = [
      "KGJS_uiHide",
      "KGJS_responsive",
      "KGJS_smartLogin",
      "KGJS_bannerImg_use",
      "KGJS_bannerImg_join_use",
      "KGJS_businessAuthority"
    ];
    return checkList.includes(key);
  };
  const CopyBlock = ({ children }: { children: string }) => {
    return (
      <div
        className="copy_block"
        onClick={() => {
          message.success(`복사 : ${children}`);
          navigator.clipboard.writeText(children);
        }}
      >
        {children}
      </div>
    );
  };

  return (
    <Wrapper className="kg_con">
      <div className="kg_title">Meta Json 수정</div>
      <div className="kg_sub">수정 후 저장 버튼을 눌러주세요.</div>
      <div className="input_wrapper top">
        {Object.keys(inputFields).map((key) => {
          return (
            <div key={key} className="metaJson_input_box">
              <div className={getLabelClass(key)}>{key.replace("KGJS_", "")}</div>
              {key === "KGJS_domain" && <CopyBlock>{patchData?.domain}</CopyBlock>}
              {key === "KGJS_accessKey" && <CopyBlock>{patchData?.jsKey}</CopyBlock>}
              {key === "KGJS_responsive" && <CopyBlock>{patchData?.responsive ? "true" : "false"}</CopyBlock>}
              {isCheckbox(key) ? (
                <Checkbox name={key} checked={checkCheckbox(inputFields[key])} onChange={handleChange} />
              ) : (
                <React.Fragment key={key}>
                  <Input
                    name={key}
                    placeholder={key.replace("KGJS_", "")}
                    type="text"
                    value={inputFields[key]}
                    onChange={handleChange}
                  />
                </React.Fragment>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-2">
        <TextArea autoSize={{ minRows: 10 }} value={textAreaValue} />
      </div>
      <Button className="mt-4" onClick={onClick}>
        저장
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .metaJson_input_box {
    margin-bottom: 4px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .input_wrapper {
    display: flex;
    flex-direction: column;
    gap: 7px;
    .input_label {
      display: flex;
      gap: 5px;
      font-size: 14px;
      font-weight: 600;
      color: #333;
      &.highlight {
        color: #333;
        font-weight: 700;
        &:before {
          content: "* ";
          color: #2424b3;
        }
        span {
          color: #919191;
          font-weight: 400;
          font-size: 12px;
        }
      }
    }
  }
  .top {
    border-bottom: 1px solid #e8e8e8;
  }
  .copy_block {
    font-size: 10px;
    font-weight: 400;
    color: #7a9eff;
    cursor: pointer;
  }
`;

export default UpdateMetaJsonPage;

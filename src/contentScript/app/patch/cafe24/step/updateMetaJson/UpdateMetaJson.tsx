import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Checkbox, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { usePatchData } from "../../../../../../popup/store/patchData";
import { useNavigate } from "react-router-dom";
import Alert from "antd/es/alert/Alert";
import Button from "../../../../../components/Button";

const UpdateMetaJsonPage = () => {
  const navigate = useNavigate();
  const [inputFields, setInputFields] = useState({
    KGJS_responsive: false,
    KGJS_shopName: "",
    KGJS_logoName: "",
    KGJS_accessKey: "",
    KGJS_domain: "",
    KGJS_uiHide: false
  });

  const [textAreaValue, setTextAreaValue] = useState("");
  const kgtextArea = document.querySelector("#copyMetaJson") as HTMLTextAreaElement;
  const saveMetaJsonButton = document.querySelector("#meta-json-patch") as HTMLButtonElement;

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!kgtextArea) return;

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
    let jsonString = rawData
      .replace(/^{|}$/g, "")
      .split(", ")
      .map((pair) => {
        let [key, value] = pair.split("=");
        key = `"${key.trim()}"`;

        if (!value) {
          value = `""`;
        } else if (!isNaN(value) && !value.includes(".")) {
        } else {
          value = `"${value.trim()}"`;
        }

        return `${key}: ${value}`;
      })
      .join(", ");
    jsonString = `{ ${jsonString} }`;

    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error("❌ JSON 변환 오류:", error);
      setIsError(true);
      return null;
    }
  };

  const convertToRawFormat = (data) => {
    return JSON.stringify(data) // JSON을 문자열로 변환
      .replace(/"https?:\/\/[^"]+"/g, (match) => match.replace(/:/g, "%COLON%")) // URL 보호
      .replace(/:/g, "=") // 일반 콜론을 '='로 변경
      .replace(/,/g, ", ") // 콤마를 ', '으로 변경
      .replace(/"/g, "") // 큰따옴표 제거
      .replace(/%COLON%/g, ":"); // URL의 원래 콜론 복원
  };

  const highlightFields = [
    "KGJS_logoName",
    "KGJS_accessKey",
    "KGJS_domain",
    "KGJS_uiHide",
    "KGJS_responsive",
    "KGJS_shopName"
  ];
  const getLabelClass = (key) => (highlightFields.includes(key) ? "highlight input_label" : "input_label");

  const onClick = async () => {
    // await usePatchData.updateDomain(inputFields["KGJS_domain"]);

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

  return (
    <Wrapper className="kg_con">
      <div className="kg_title">Meta Json 수정</div>
      <div className="kg_sub">수정 후 저장 버튼을 눌러주세요.</div>
      <div className="input_wrapper top">
        {Object.keys(inputFields).map((key) => {
          return (
            <div key={key} className="metaJson_input_box">
              <div className={getLabelClass(key)}>
                {key.replace("KGJS_", "")}
                {key === "KGJS_uiHide" && <span>← check ❌</span>}
              </div>
              {typeof inputFields[key] === "boolean" || inputFields[key] === "true" || inputFields[key] === "false" ? (
                <Checkbox name={key} checked={checkCheckbox(inputFields[key])} onChange={handleChange} />
              ) : (
                <Input
                  name={key}
                  placeholder={key.replace("KGJS_", "")}
                  type="text"
                  value={inputFields[key]}
                  onChange={handleChange}
                />
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
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .input_wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .input_label {
      font-size: 14px;
      font-weight: 600;
      color: #333;
      &.highlight {
        color: #1890ff;
        font-weight: 700;
        &:before {
          content: "* ";
          color: #1890ff;
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
`;

export default UpdateMetaJsonPage;

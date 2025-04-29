import { Input, message } from "antd";
import React, { useEffect } from "react";
import useInput from "../../../popup/utils/hooks/useInput";
import { usePatchData } from "../../../popup/store/patchData";
import Button from "../Button";

const NotMatchingPage = ({ step }: { step? }) => {
  const { value, setValue, onChange } = useInput("");

  const location = window.location.href;
  const onClick = () => {
    if (!value) {
      message.error("process 번호를 입력해주세요.");
      return;
    }

    usePatchData.saveProcessesNumber(Number(value) || 0);

    if (step === 3) {
      window.open(`https://gateway.keepgrow.com/cms/setting/processes/${value}`);
      return;
    }

    window.open(`https://gateway.keepgrow.com/cms/setting/processes/${value}/modify`);
  };

  const { getPatchData } = usePatchData();

  const getProcessesNumber = async () => {
    try {
      if (location.includes(`gateway.keepgrow.com/cms/setting/processes/`)) {
        const processesNumber = location.split("/")[location.split("/").length - 1];
        return processesNumber;
      }
      return "";
    } catch (error) {
      return "";
    }
  };

  const getData = async () => {
    const patchData = await getPatchData();
    if (!patchData.processesNumber) {
      const processesNumber = await getProcessesNumber();
      setValue(processesNumber);
      return;
    }
    setValue(patchData.processesNumber || "");
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="kg_con">
      <div className="kg_title">CMS 페이지로 이동합니다.</div>
      <div className="kg_sub">Process 번호를 입력해주세요.</div>

      <Input value={value} type="number" onChange={onChange} onPressEnter={onClick} placeholder="43318" />
      <Button className="mt-3" onClick={onClick}>
        이동
      </Button>
    </div>
  );
};

export default NotMatchingPage;

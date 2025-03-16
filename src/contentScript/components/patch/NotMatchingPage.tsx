import { Input } from "antd";
import React, { useEffect } from "react";
import useInput from "../../../popup/utils/hooks/useInput";
import { usePatchData } from "../../../popup/store/patchData";
import Button from "../Button";

const NotMatchingPage = ({ step }: { step? }) => {
  const { value, setValue, onChange } = useInput("");

  const onClick = () => {
    usePatchData.saveProcessesNumber(Number(value) || 0);

    if (step === 3) {
      window.open(`https://gateway.keepgrow.com/cms/setting/processes/${value}`);
      return;
    }
    window.open(`https://gateway.keepgrow.com/cms/setting/processes/${value}/modify`);
  };

  const { getPatchData } = usePatchData();

  const getData = async () => {
    const patchData = await getPatchData();
    if (!patchData) return;
    setValue(patchData.processesNumber || "");
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="kg_con">
      <div className="kg_title">CMS 페이지로 이동합니다.</div>
      <div className="kg_sub">Process 번호를 입력해주세요.</div>

      <Input value={value} onChange={onChange} onPressEnter={onClick} placeholder="process 번호를 입력해주세요" />
      <Button className="mt-3" onClick={onClick}>
        이동
      </Button>
    </div>
  );
};

export default NotMatchingPage;

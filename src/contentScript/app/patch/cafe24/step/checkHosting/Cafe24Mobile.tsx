import React, { useEffect, useState } from "react";
import { usePatchData } from "../../../../../../popup/store/patchData";
import Button from "../../../../../components/Button";
import { Checkbox, message } from "antd";
import { Note } from "../../../../../../popup/store/note";

const Cafe24Mobile = () => {
  const [responsive, setResponsive] = useState(true);

  const onClick = async () => {
    usePatchData.update("responsive", responsive);
    message.success(`반응형이 저장되었습니다 : ${responsive ? "true" : "false"}`);
    await Note.add(`반응형 : ${responsive ? "true" : "false"}`);

    setTimeout(() => {
      window.close();
    }, 2000);
    return;
  };

  useEffect(() => {
    setTimeout(() => {
      const res = document.querySelectorAll("input[name='isUse']")[0] as HTMLInputElement;
      (res.parentElement as HTMLElement).style.backgroundColor = "#ffff73";
      setResponsive(!res?.checked || false);
    }, 200);
  }, []);

  return (
    <div>
      <div className="kg_con">
        <div className="kg_title">CAFE24 반응형 확인</div>
        <div>
          반응형
          <Checkbox
            className="ml-2"
            name="responsive"
            checked={responsive}
            onChange={() => setResponsive(!responsive)}
          />
        </div>
        <Button className="mt-4" onClick={onClick}>
          반응형 저장
        </Button>
      </div>
    </div>
  );
};

export default Cafe24Mobile;

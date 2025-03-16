import React, { useEffect, useState } from "react";
import { usePatchData } from "../../../../../../popup/store/patchData";
import Button from "../../../../../components/Button";

const Cafe24MainPage = () => {
  const [domain, setDomain] = useState("");
  const { getPatchData } = usePatchData();

  const getDomain = async () => {
    const patchData = await getPatchData();
    if (patchData) {
      setDomain(patchData.domain || "");
    }
  };
  useEffect(() => {
    getDomain();
  }, []);

  const onClick = () => {
    const location = window.location.href;
    window.location.href = location.replace("/main/dashboard", "/Manage/Index");
  };

  return (
    <div className="kg_con">
      <div className="kg_title">카페24 메인 화면</div>
      <div className="kg_sub">디자인 페이지로 이동합니다</div>
      <Button className="mt-4" onClick={onClick}>
        디자인 페이지 이동
      </Button>
    </div>
  );
};

export default Cafe24MainPage;

import React, { useEffect } from "react";
import styled from "styled-components";
import { usePatchData } from "../../../../../../popup/store/patchData";
import Button from "../../../../../components/Button";
import { message } from "antd";
import { Note } from "../../../../../../popup/store/note";

const Cafe24Domain = () => {
  const { getPatchData, patchData } = usePatchData();

  useEffect(() => {
    getPatchData();
  }, []);
  const findMainDomain = () => {
    const tbody = document.querySelector("tbody");
    if (!tbody) {
      message.error("tbody를 찾을 수 없습니다.");
      return null;
    }

    const rows = tbody.getElementsByTagName("tr");
    for (const row of rows) {
      const text = row.textContent || "";
      if (text.includes("상점대표 도메인")) {
        const firstTd = row.getElementsByTagName("td")[0] as HTMLTableCellElement;
        firstTd.style.backgroundColor = "#ffff73";
        let domain = firstTd.textContent?.trim();
        domain = domain.replace("대표 도메인 변경", "");
        domain = domain.trim();
        return domain;
      }
    }
    return null;
  };
  const findDefaultDomain = () => {
    const tbody = document.querySelector("tbody");
    if (!tbody) {
      message.error("tbody를 찾을 수 없습니다.");
      return null;
    }

    const rows = tbody.getElementsByTagName("tr");
    for (const row of rows) {
      const text = row.textContent || "";
      if (text.includes("기본제공 도메인")) {
        const firstTd = row.getElementsByTagName("td")[0] as HTMLTableCellElement;
        firstTd.style.backgroundColor = "#35ff5d";
        let domain = firstTd.textContent?.trim();
        return domain;
      }
    }
    return null;
  };

  const onClick = async () => {
    // 요소를 찾고 처리하는 함수

    const domain = findMainDomain();
    console.log("domain", domain);
    if (domain) {
      usePatchData.update("domain", domain);
      message.success(`도메인이 저장되었습니다 : ${domain}`);
      getPatchData();
      await Note.add(`domain : ${domain}`);
      setTimeout(() => {
        window.close();
      }, 2000);
      return;
    }
    const defaultDomain = findDefaultDomain();
    console.log("defaultDomain", defaultDomain);
    if (defaultDomain) {
      usePatchData.update("domain", defaultDomain);
      message.success(`도메인이 저장되었습니다 : ${defaultDomain}`);
      getPatchData();
      await Note.add(`domain : ${defaultDomain}`);
      setTimeout(() => {
        window.close();
      }, 2000);
      return;
    }
    message.error("도메인을 찾을 수 없습니다.");
  };

  return (
    <Wrapper>
      <div className="kg_con">
        <div className="kg_title">CAFE24 도메인 확인</div>
        <div className="kg_sub">도메인 저장 </div>
        <div className="login_box">
          <div>domain : {patchData?.domain || "-"}</div>
          <div>jsKey : {patchData?.jsKey || "-"}</div>
        </div>

        <Button onClick={onClick}>도메인 저장</Button>
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

export default Cafe24Domain;

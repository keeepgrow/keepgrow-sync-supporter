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
  const onClick = async () => {
    // 요소를 찾고 처리하는 함수
    const findDomainRow = () => {
      const tbody = document.querySelector("tbody");
      if (!tbody) {
        message.error("tbody를 찾을 수 없습니다.");
        return null;
      }

      const rows = tbody.getElementsByTagName("tr");
      for (const row of rows) {
        const text = row.textContent || "";
        if (text.includes("기본제공 도메인")) {
          return row;
        }
      }
      return null;
    };

    const row = findDomainRow();
    if (row) {
      const tds = row.getElementsByTagName("td");

      // td들의 내용 확인
      Array.from(tds).forEach((td, index) => {
        console.log(`${index}번째 td:`, td.textContent?.trim());
      });

      // 특정 td 선택 (예: 첫 번째 td)
      const firstTd = tds[0] as HTMLTableCellElement;
      firstTd.style.backgroundColor = "#ffff73";
      if (firstTd) {
        usePatchData.updateDomain(firstTd.textContent?.trim());
        message.success(`도메인이 저장되었습니다 : ${firstTd.textContent?.trim()}`);
        getPatchData();
        await Note.add(`domain : ${firstTd.textContent?.trim()}`);
        setTimeout(() => {
          window.close();
        }, 2000);
      }
    } else {
      message.error("도메인을 찾을 수 없습니다.");
    }
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

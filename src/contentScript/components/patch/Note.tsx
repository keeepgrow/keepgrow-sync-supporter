import React, { useState } from "react";
import { usePatchData } from "../../../popup/store/patchData";
import NoteModal from "../NoteModal";
import styled from "styled-components";
import { Chrome } from "../../../popup/utils/ChromeApi";
import { theme } from "../../style/theme";

const PatchNote = () => {
  const [openNote, setOpenNote] = useState(false);

  return (
    <>
      <Wrapper onClick={() => setOpenNote(true)}>
        <div className="note_title">Note</div>
        <img className="memo_img" src={Chrome.getUrl("note.png")} />
      </Wrapper>
      {openNote && <NoteModal setOpen={setOpenNote} />}
    </>
  );
};

const Wrapper = styled.div`
  width: 150px;
  height: 60px;
  padding: 0 15px;
  background-color: ${theme.color.secondary};
  border: 2px solid ${theme.color.main};
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  .note_title {
    font-size: 16px;
    font-weight: bold;
    color: ${theme.color.main};
  }
  .memo_img {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
  margin-bottom: 20px;
  &:hover {
    opacity: 0.8;
  }
`;

export default PatchNote;

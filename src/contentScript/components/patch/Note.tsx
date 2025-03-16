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
        {/* <img className="memo_img" src={Chrome.getUrl("note.png")} /> */}
      </Wrapper>
      {openNote && <NoteModal setOpen={setOpenNote} />}
    </>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 5px;
  left: 10px;
  .note_title {
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
    &:hover {
      color: ${theme.color.main};
    }
  }
`;

export default PatchNote;

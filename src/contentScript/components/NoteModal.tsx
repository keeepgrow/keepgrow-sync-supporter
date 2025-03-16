import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Storage } from "../../popup/utils/ChromeApi";
import TextArea from "antd/es/input/TextArea";
import { debounce } from "lodash";
import Button from "./Button";
import SquareButton from "./SquareButton";
import { Note } from "../../popup/store/note";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NoteModal = ({ setOpen }: Props) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    getContent();
  }, []);

  const getContent = async () => {
    const content = await Note.get();
    setContent(content);
  };
  const saveContent = useCallback(
    debounce((value) => Note.set(value), 500),
    []
  );

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    saveContent(e.target.value);
  };

  return (
    <Wrapper onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
      <TextArea
        className="note_content"
        autoSize={{ minRows: 10 }}
        value={content}
        onChange={(e) => onChange(e)}
        style={{ height: "100%" }}
      />
      <div className="btn_box">
        <SquareButton onClick={() => setOpen(false)}>닫기</SquareButton>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 90vh;
  top: 0;
  left: 0;
  background-color: rgba(164, 164, 164, 0.5);
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .btn_box {
    margin-top: 20px;
    width: 88%;
  }
  .note_content {
    position: relative;
    width: 300px;
    height: 400px;
    background-color: white;

    border-radius: 10px;
  }
`;

export default NoteModal;

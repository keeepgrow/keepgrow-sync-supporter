import React from "react";
import styled from "styled-components";
import { theme } from "../style/theme";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "main" | "secondary";
}

const SquareButton = (props: Props) => {
  const { color = "main" } = props;
  return (
    <Wrapper className={`kg_${color}`} {...props}>
      {props.children}
    </Wrapper>
  );
};

const Wrapper = styled.button`
  width: 100px;
  padding: 4px 0;
  cursor: pointer;

  background: none;
  background-color: #333;
  color: #fff;
  &.kg_secondary {
    background-color: #fff;
    border: 1px solid #b6b5b5;
    color: #333;
    &:hover {
      background-color: ${theme.color.light};
    }
  }

  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  transition: all 0.3s;
  &:hover {
    opacity: 0.8;
  }
`;

export default SquareButton;

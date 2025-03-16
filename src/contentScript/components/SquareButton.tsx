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
  width: 100%;
  padding: 16px 0;

  background: none;
  background-color: ${theme.color.main};
  color: ${theme.color.secondary};
  &.kg_secondary {
    background-color: ${theme.color.secondary};
    color: ${theme.color.main};
    &:hover {
      background-color: ${theme.color.light};
    }
  }

  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: all 0.3s;
  &:hover {
    opacity: 0.8;
  }
`;

export default SquareButton;

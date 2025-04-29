import React from "react";
import styled from "styled-components";
import { theme } from "../style/theme";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "main" | "secondary";
}

const Button = (props: Props) => {
  const { color = "main" } = props;
  return (
    <Wrapper className={`kg_${color}`} {...props}>
      {props.children}
    </Wrapper>
  );
};

const Wrapper = styled.button`
  width: 100%;
  padding: 8px 0;

  background-color: #333;
  color: #fff;
  cursor: pointer;

  &.kg_secondary {
    background-color: ${theme.color.white};
    color: #333;
    border: 1px solid #b6b5b5;
    &:hover {
      background-color: ${theme.color.light};
    }
  }
  &.kg_blue {
    background-color: ${theme.color.blue};
    color: #fff;
  }
  &.kg_red {
    background-color: #fe4f4f;
    color: #fff;
  }

  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: all 0.3s;
  &:hover {
    opacity: 0.8;
  }
  text-align: center;
`;

export default Button;

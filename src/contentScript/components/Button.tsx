import React from "react";
import styled from "styled-components";
import { theme } from "../style/theme";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "main" | "secondary" | "warning";
}

const Button = (props: Props) => {
  const { color = "main" } = props;
  const mapStyle = {
    main: {
      backgroundColor: "#333",
      color: "#fff"
    },
    secondary: {
      backgroundColor: "#fff",
      border: "1px solid #e6e6e6",
      color: "#333"
    },
    warning: {
      backgroundColor: "#fe5656",
      color: "#fff"
    }
  };
  return (
    <Wrapper {...props} style={mapStyle[color]}>
      {props.children}
    </Wrapper>
  );
};

const Wrapper = styled.button`
  width: 100%;
  padding: 8px 0;

  background-color: #333;
  color: #fff;

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

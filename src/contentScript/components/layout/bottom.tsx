import React from "react";
import styled from "styled-components";

const BottomLayout = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  position: fixed;

  bottom: 5vh;
  width: 330px;
  margin-top: 20px;

  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  flex-direction: column;
`;

export default BottomLayout;

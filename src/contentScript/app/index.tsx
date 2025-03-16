import React from "react";
import { MemoryRouter, useNavigate } from "react-router-dom";

import "../style/global.css";
import Router from "./router";
import { SidepanelService } from "../utils/sidepanel";
import styled from "styled-components";
import { Chrome } from "../../popup/utils/ChromeApi";

const ContentScriptApp = () => {
  return (
    <Wrapper className="kg-sidepanel">
      <img onClick={SidepanelService.togglePanel} className="kg-close-button" src={Chrome.getUrl("close.png")} />

      <div className="kg-sidepanel-content">
        <MemoryRouter initialEntries={["/"]}>
          <Router />
        </MemoryRouter>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 4px;
  right: 15px;
  font-size: 20px;
  border: none;
  cursor: pointer;
  .kg-close-button {
    position: absolute;
    top: 10px;
    right: 15px;
    width: 23px;
    height: 23px;
    cursor: pointer;
    z-index: 10000;
    &:hover {
      transform: scale(1.1);
    }
  }
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: #ffffff;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #e7e7e7;
    border-radius: 50px;
  }
`;

export default ContentScriptApp;

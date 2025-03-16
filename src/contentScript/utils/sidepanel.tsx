import React from "react";
import ContentScriptApp from "../app";
import { createRoot } from "react-dom/client";
import { Chrome, Storage } from "../../popup/utils/ChromeApi";

const PANEL_ID = "extension-content-panel";
const ICON_ID = "extension-toggle-icon";
const PANEL_VISIBILITY = "extension_visible";

const getPanel = () => document.getElementById(PANEL_ID);

const togglePanel = async () => {
  const element = getPanel() as HTMLElement;
  if (!element) return;
  const visibility = await isVisibility();

  Storage.SET(PANEL_VISIBILITY, visibility ? "off" : "on");

  element.style.display = visibility ? "none" : "block";
};

const isVisibility = async () => {
  const visibility = await Storage.GET(PANEL_VISIBILITY);

  if (!visibility) {
    Storage.SET(PANEL_VISIBILITY, "on");
    return true;
  }

  return visibility !== "off";
};

const createPanel = async () => {
  getPanel()?.remove();

  const container = document.createElement("div");
  container.id = PANEL_ID;

  createRoot(container).render(<ContentScriptApp />);

  const isVisible = await isVisibility();

  if (!isVisible) {
    container.style.display = "none";
  }

  return container;
};

const createtIcon = () => {
  const icon = document.createElement("div");
  icon.id = ICON_ID;
  const imageUrl = Chrome.getUrl("icon.png");
  icon.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;    
    background-color: #fff;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;
    z-index: 10000;
  `;

  const image = document.createElement("img");
  image.src = imageUrl;
  image.style.cssText = `
    width: 100%;
    height: 100%;
    border-radius: 50%;
  `;

  image.alt = "icon";
  icon.appendChild(image);
  icon.addEventListener("mouseover", () => {
    icon.style.transform = "scale(1.05)";
  });
  icon.addEventListener("mouseout", () => {
    icon.style.transform = "scale(1)";
  });

  icon.addEventListener("click", togglePanel);

  return icon;
};

export const SidepanelService = {
  createPanel,
  getPanel,
  createtIcon,
  togglePanel,
};

import { CUSTOMIZE_TYPES } from "../constants/customizeTypes";

export const theme = (value) => {
  return {
    type: CUSTOMIZE_TYPES.THEME,
    payload: value,
  };
};

export const contentWidth = (value) => {
  return {
    type: CUSTOMIZE_TYPES.CONTENT_WIDTH,
    payload: value,
  };
};

export const sidebarCollapsed = (value) => {
  return {
    type: CUSTOMIZE_TYPES.SIDEBAR_COLLAPSED,
    payload: value,
  };
};

export const sidebarCollapseButton = (value) => {
  return {
    type: CUSTOMIZE_TYPES.SIDEBAR_COLLAPSE_BUTTON,
    payload: value,
  };
};

export const layoutChange = (value) => {
  return {
    type: CUSTOMIZE_TYPES.LAYOUT_CHANGE,
    payload: value,
  };
};

export const navigationFull = (value) => {
  return {
    type: CUSTOMIZE_TYPES.NAVIGATION_FULL,
    payload: value,
  };
};

export const navigationBg = (value) => {
  return {
    type: CUSTOMIZE_TYPES.NAVIGATION_BG,
    payload: value,
  };
};

export const direction = (value) => {
  return {
    type: CUSTOMIZE_TYPES.DIRECTION,
    payload: value,
  };
};

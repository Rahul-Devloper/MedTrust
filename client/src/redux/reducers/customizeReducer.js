import { CUSTOMIZE_TYPES } from "../constants/customizeTypes";
import themeConfig from "../../configs/themeConfig";

const INITIAL_STATE = {
  theme: themeConfig.theme,
  contentWidth: themeConfig.contentWidth,
  sidebarCollapsed: themeConfig.sidebarCollapsed,
  sidebarCollapseButton: themeConfig.sidebarCollapseButton,
  layout: themeConfig.layout,
  navigationFull: themeConfig.navigationFull,
  navigationBg: themeConfig.navigationBg,
  direction: themeConfig.direction,
};

const customizeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CUSTOMIZE_TYPES.THEME:
      return {
        ...state,
        theme: action.payload,
      };

    case CUSTOMIZE_TYPES.CONTENT_WIDTH:
      return {
        ...state,
        contentWidth: action.payload,
      };

    case CUSTOMIZE_TYPES.SIDEBAR_COLLAPSED:
      return {
        ...state,
        sidebarCollapsed: action.payload,
      };

    case CUSTOMIZE_TYPES.SIDEBAR_COLLAPSE_BUTTON:
      return {
        ...state,
        sidebarCollapseButton: action.payload,
      };

    case CUSTOMIZE_TYPES.LAYOUT_CHANGE:
      return {
        ...state,
        layout: action.payload,
      };

    case CUSTOMIZE_TYPES.NAVIGATION_FULL:
      return {
        ...state,
        navigationFull: action.payload,
      };

    case CUSTOMIZE_TYPES.NAVIGATION_BG:
      return {
        ...state,
        navigationBg: action.payload,
      };

    case CUSTOMIZE_TYPES.DIRECTION:
      return {
        ...state,
        direction: action.payload,
      };

    default:
      return state;
  }
};

export default customizeReducer;

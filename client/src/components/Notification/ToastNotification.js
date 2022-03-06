import React from "react";
import { notification } from "antd";
import {
  RiCloseFill,
  RiCheckboxCircleFill,
  RiErrorWarningFill,
} from "react-icons/ri";

export const SuccessNotification = (message) => {
  notification.open({
    message: "Success",
    description: message,
    icon: <RiCheckboxCircleFill style={{ color: "#00F7BF" }} />,
    closeIcon: (
      <RiCloseFill className="remix-icon da-text-color-black-80" size={24} />
    ),
    duration: 3,
  });
};

export const InfoNotification = (message) => {
  notification.open({
    message: "Info",
    description: message,
    icon: <RiErrorWarningFill style={{ color: "#1BE7FF" }} />,
    closeIcon: (
      <RiCloseFill className="remix-icon da-text-color-black-80" size={24} />
    ),
    duration: 3,
  });
};

export const WarningNotification = (message) => {
  notification.open({
    message: "Warning",
    description: message,
    icon: <RiErrorWarningFill style={{ color: "#FFC700" }} />,
    closeIcon: (
      <RiCloseFill className="remix-icon da-text-color-black-80" size={24} />
    ),
    duration: 3,
  });
};

export const ErrorNotification = (message) => {
  notification.open({
    message: "Error",
    description: message,
    icon: <RiErrorWarningFill style={{ color: "#FF0022" }} />,
    closeIcon: (
      <RiCloseFill className="remix-icon da-text-color-black-80" size={24} />
    ),
    duration: 3,
  });
};

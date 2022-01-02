import React from "react";
import { Link } from "react-router-dom";

import { Divider, Avatar, Row, Col } from "antd";
import { RiSettings3Line } from "react-icons/ri";

import avatar from "../../../../assets/images/memoji/memoji-1.png";

const MenuFooter = (props) => {
  return props.collapsed === false ? (
    <Row
      className="da-sidebar-footer da-pb-24 da-px-24 da-bg-color-dark-100"
      align="middle"
      justify="space-between"
    >
      <Divider className="da-border-color-black-20 da-border-color-dark-70 da-mt-0" />

      <Col>
        <Row align="middle">
          <Avatar size={36} src={avatar} className="da-mr-8" />

          <div
            style={{
              margin: "1px 0 0 8px",
            }}
          >
            <span className="da-d-block da-text-color-black-100 da-text-color-dark-0 da-p1-body">
              Jane Doe
            </span>

            <Link
              to="/pages/profile/personel-information"
              className="da-badge-text da-text-color-dark-30"
              onClick={props.onClose}
            >
              View Profile
            </Link>
          </div>
        </Row>
      </Col>

      <Col>
        <Link to="/pages/profile/security" onClick={props.onClose}>
          <RiSettings3Line
            className="remix-icon da-text-color-black-100 da-text-color-dark-0"
            size={24}
          />
        </Link>
      </Col>
    </Row>
  ) : (
    <Row
      className="da-sidebar-footer da-pt-16 da-mb-16 da-bg-color-dark-100"
      align="middle"
      justify="center"
    >
      <Col>
        <Link to="/pages/profile/personel-information" onClick={props.onClose}>
          <Avatar size={36} src={avatar} />
        </Link>
      </Col>
    </Row>
  );
};

export default MenuFooter;

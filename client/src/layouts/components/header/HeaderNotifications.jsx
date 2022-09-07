import React from "react";
import { useSelector } from "react-redux";

import { Button, Badge, Row, Col, Dropdown, Divider, Avatar } from "antd";
import { Notification, Message, Calendar } from "react-iconly";

const HeaderNotifications = () => {
  const direction = useSelector((state) => state.customize.direction);

  const notificationMenu = (
    <div className="hp-py-16 hp-bg-color-black-0 hp-bg-color-dark-100 hp-border-color-black-40 hp-border-color-dark-80 hp-border-radius hp-border-1">
      <div className="hp-px-16">
        <Row align="middle" justify="space-between">
          <Col className="hp-p1-body hp-font-weight-500 hp-text-color-black-100 hp-text-color-dark-10 hp-text-color-dark-0 hp-mr-64">
            Notifications
          </Col>

          <Col className="hp-bg-color-primary-1 hp-border-radius-full hp-badge-text hp-text-color-black-0 hp-py-4 hp-px-6 hp-ml-24">
            0 New
          </Col>
        </Row>
      </div>

      <Divider className="hp-my-16 hp-mx-0 hp-bg-color-black-40 hp-bg-color-dark-80" />

      {/* <div className="hp-px-16">
        <Row align="middle">
          <Col className="hp-mr-8">
            <Avatar
              size={32}
              icon={
                <Message
                  size={17}
                  className="hp-text-color-primary-1 remix-icon"
                />
              }
              className="hp-d-flex-center-full"
            />
          </Col>

          <Col>
            <span className="hp-d-block hp-w-100 hp-mb-4 hp-badge-text hp-font-weight-500 hp-text-color-black-100 hp-text-color-dark-10">
              New message received
            </span>

            <span className="hp-d-block hp-input-description hp-font-weight-500 hp-text-color-black-80 hp-text-color-dark-40">
              8 unread messages.
            </span>
          </Col>
        </Row>
      </div>

      <Divider className="hp-my-16 hp-mx-0 hp-bg-color-black-40 hp-bg-color-dark-80" />

      <div className="hp-px-16">
        <Row align="middle">
          <Col className="hp-mr-8">
            <Avatar
              size={32}
              icon={
                <Calendar
                  size={17}
                  className="hp-text-color-primary-1 remix-icon"
                />
              }
              className="hp-d-flex-center-full"
            />
          </Col>

          <Col>
            <span className="hp-d-block hp-w-100 hp-mb-4 hp-badge-text hp-font-weight-500 hp-text-color-black-100 hp-text-color-dark-10">
              Upcoming Events
            </span>

            <span className="hp-d-block hp-input-description hp-font-weight-500 hp-text-color-black-80 hp-text-color-dark-40">
              You have 4 events this week.
            </span>
          </Col>
        </Row>
      </div> */}

      {/* <Divider className="hp-my-16 hp-mx-0 hp-bg-color-black-40 hp-bg-color-dark-80" /> */}

      <div className="hp-px-16">
        <Button type="primary" block disabled={true}>
          Clear all notifications
        </Button>
      </div>
    </div>
  );

  return (
    <Col className="hp-d-flex-center hp-mr-sm-12 hp-mr-16">
      <Button
        type="text"
        icon={
          <Dropdown overlay={notificationMenu} placement="bottomRight">
            <div className="hp-position-relative">
              <div
                className="hp-position-absolute"
                style={
                  direction === "rtl"
                    ? { left: -5, top: -5 }
                    : { right: -5, top: -5 }
                }
              >
                <Badge dot status="processing" />
              </div>

              <Notification set="curved" className="hp-text-color-black-60" />
            </div>
          </Dropdown>
        }
      />
    </Col>
  );
};

export default HeaderNotifications;

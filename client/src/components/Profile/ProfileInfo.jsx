import React, { useState } from "react";
import {
  Row,
  Col,
  Divider,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Button,
  Modal,
} from "antd";
import { useSelector } from "react-redux";
import { RiCloseFill, RiCalendarLine } from "react-icons/ri";
import { InfoNotification } from "../Notification/ToastNotification";

const ProfileInfo = () => {
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [preferenceModalVisible, setPreferenceModalVisible] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const listTitle = "da-p1-body";
  const listResult =
    "da-mt-sm-4 da-p1-body da-text-color-black-100 da-text-color-dark-0";
  const dividerClass = "da-border-color-black-40 da-border-color-dark-80";

  const contactModalShow = () => {
    setContactModalVisible(true);
  };

  const contactModalCancel = () => {
    setContactModalVisible(false);
  };

  const preferenceModalShow = () => {
    setPreferenceModalVisible(true);
  };

  const preferenceModalCancel = () => {
    setPreferenceModalVisible(false);
  };

  return (
    <div>
      <Modal
        title="Contact Edit"
        width={416}
        centered
        visible={contactModalVisible}
        onCancel={contactModalCancel}
        footer={null}
        closeIcon={
          <RiCloseFill className="remix-icon text-color-black-100" size={24} />
        }
      >
        <Form layout="vertical" name="basic" initialValues={{ remember: true }}>
          <Form.Item label="Full Name" name="fullname">
            <Input />
          </Form.Item>

          <Form.Item label="Display Name" name="displayname">
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>

          <Form.Item label="Phone" name="phone">
            <Input />
          </Form.Item>

          <Form.Item label="Date of Birth" name="dateofbirth">
            <DatePicker
              className="da-w-100"
              suffixIcon={
                <RiCalendarLine className="remix-icon da-text-color-black-60" />
              }
            />
          </Form.Item>

          <Form.Item label="Address" name="address">
            <Input.TextArea rows={3} />
          </Form.Item>

          <Row>
            <Col md={12} span={24} className="da-pr-sm-0 da-pr-12">
              <Button
                block
                type="primary"
                htmlType="submit"
                onClick={contactModalCancel}
              >
                Edit
              </Button>
            </Col>

            <Col md={12} span={24} className="da-mt-sm-12 da-pl-sm-0 da-pl-12">
              <Button block onClick={contactModalCancel}>
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>

      <Modal
        title="Preference Edit"
        width={316}
        centered
        visible={preferenceModalVisible}
        onCancel={preferenceModalCancel}
        footer={null}
        closeIcon={
          <RiCloseFill className="remix-icon text-color-black-100" size={24} />
        }
      >
        <Form layout="vertical" name="basic" initialValues={{ remember: true }}>
          <Form.Item label="Language" name="language">
            <Input />
          </Form.Item>

          <Form.Item label="Date Format" name="dateformat">
            <DatePicker
              className="da-w-100"
              suffixIcon={
                <RiCalendarLine className="remix-icon da-text-color-black-60" />
              }
            />
          </Form.Item>

          <Form.Item label="Timezone" name="timezone">
            <TimePicker className="da-w-100" />
          </Form.Item>

          <Row>
            <Col md={12} span={24} className="da-pr-sm-0 da-pr-12">
              <Button
                block
                type="primary"
                htmlType="submit"
                onClick={preferenceModalCancel}
              >
                Edit
              </Button>
            </Col>

            <Col md={12} span={24} className="da-mt-sm-12 da-pl-sm-0 da-pl-12">
              <Button block onClick={preferenceModalCancel}>
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>

      <Col md={15} span={24}>
        <h2>Personal Information</h2>
      </Col>

      <Divider className={dividerClass} />

      <Row align="middle" justify="space-between">
        <Col md={12} span={24}>
          <h3>Contact</h3>
        </Col>

        <Col md={12} span={24} className="da-profile-action-btn da-text-right">
          <Button
            type="primary"
            ghost
            onClick={() => InfoNotification("Coming soon")}
          >
            Edit
          </Button>
        </Col>

        <Col
          span={24}
          className="da-profile-content-list da-mt-8 da-pb-sm-0 da-pb-120"
        >
          <ul>
            <li>
              <span className={listTitle}>Full Name</span>
              <span className={listResult}>{user?.name}</span>
            </li>

            <li className="da-mt-18">
              <span className={listTitle}>Email</span>
              <span className={listResult}>{user?.email}</span>
            </li>

            <li className="da-mt-18">
              <span className={listTitle}>Phone</span>
              <a className={listResult} href="#">
                {user?.phone ? user?.phone : <i>Not set</i>}
              </a>
            </li>

            <li className="da-mt-18">
              <span className={listTitle}>Date of Birth</span>
              <span className={listResult}>
                {user?.dateOfBirth ? user?.dateOfBirth : <i>Not set</i>}
              </span>
            </li>

            <li className="da-mt-18">
              <span className={listTitle}>Address</span>
              <span className={listResult}>
                {user?.address ? user?.address : <i>Not set</i>}
              </span>
            </li>
          </ul>
        </Col>
      </Row>

      <Divider className={dividerClass} />

      <Row align="middle" justify="space-between">
        <Col md={12} span={24}>
          <h3>Preferences</h3>
        </Col>

        <Col md={12} span={24} className="da-profile-action-btn da-text-right">
          <Button
            type="primary"
            ghost
            onClick={() => InfoNotification("Coming soon")}
          >
            Edit
          </Button>
        </Col>

        <Col span={24} className="da-profile-content-list da-mt-sm-8 da-mt-24">
          <ul>
            <li>
              <span className={listTitle}>Language</span>
              <span className={listResult}>English</span>
            </li>

            <li className="da-mt-18">
              <span className={listTitle}>Date Format</span>
              <span className={listResult}>YYY/mm/dd</span>
            </li>

            <li className="da-mt-18">
              <span className={listTitle}>Timezone</span>
              <span className={listResult}>Dubai (GMT+4)</span>
            </li>
          </ul>
        </Col>
      </Row>
    </div>
  );
};

export default ProfileInfo;
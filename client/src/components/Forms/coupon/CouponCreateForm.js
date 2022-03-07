import React, { useState } from "react";
import { createCoupon } from "../../../api/coupon";
import { Row, Col, Form, Input, Button, DatePicker, InputNumber } from "antd";
import { withRouter } from "react-router";
import { SuccessNotification, ErrorNotification } from "../../../components";

const initialState = {
  name: "",
  code: "",
  expiry: "",
  discount: "",
  limit: "",
  used: "",
};

const CouponCreateForm = ({ history }) => {
  const [values, setValues] = useState(initialState);

  // Handle form changes
  const handleFormChange = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    createCoupon(values)
      .then((res) => {
        SuccessNotification(`${res.data.name} created successfully`);
        setValues(initialState);
        history.goBack();
      })
      .catch((err) => {
        ErrorNotification(err.response.data.message);
        console.log("CREATE_COUPON_ERROR", err.response.data.message);
      });
  };

  return (
    <Row>
      <Col span={24}>
        <Form
          labelCol={{
            span: 2,
          }}
          wrapperCol={{
            span: 12,
          }}
        >
          {/* Coupon name */}
          <Form.Item label="Name">
            <Input
              name="name"
              placeholder="Coupon name"
              onChange={handleFormChange}
              value={values.name}
              rules={[{ required: true }]}
            />
          </Form.Item>

          {/* Coupon code */}
          <Form.Item label="Code">
            <Input
              name="code"
              placeholder="Code"
              onChange={handleFormChange}
              value={values.code}
              rules={[{ required: true }]}
            />
          </Form.Item>

          {/* Expiry date */}
          <Form.Item label="Expiry Date">
            <DatePicker
              className="da-mb-16 da-mr-16"
              onChange={(date, dateString) =>
                setValues({ ...values, expiry: dateString })
              }
            />
          </Form.Item>

          {/* Discount percentage */}
          <Form.Item label="Discount %">
            <InputNumber
              name="discount"
              placeholder="Percentage"
              onChange={(value) => {
                setValues({
                  ...values,
                  discount: value,
                });
              }}
              value={values.discount}
              style={{ width: 150 }}
            />
          </Form.Item>

          {/* Limit */}
          <Form.Item label="Coupon Limit">
            <InputNumber
              name="limit"
              placeholder="Limit"
              onChange={(value) => {
                setValues({
                  ...values,
                  limit: value,
                });
              }}
              value={values.limit}
              style={{ width: 150 }}
            />
          </Form.Item>

          {/* Used */}
          <Form.Item label="Used">
            <InputNumber
              name="used"
              placeholder="Used"
              onChange={(value) => {
                setValues({
                  ...values,
                  used: value,
                });
              }}
              value={values.used}
              style={{ width: 150 }}
            />
          </Form.Item>

          {/* Submit button */}
          <Form.Item wrapperCol={{ span: 12, offset: 2 }}>
            <Button type="primary" onClick={handleFormSubmit}>
              Create
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default withRouter(CouponCreateForm);

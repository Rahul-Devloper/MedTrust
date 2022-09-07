import React, { useState, useEffect } from "react";
import { useParams, withRouter } from "react-router";
import { getCouponById, updateCouponById } from "../../../api/coupon";
import { Row, Col, Form, Input, Button, DatePicker, InputNumber } from "antd";
import { SuccessNotification, ErrorNotification } from "../../../components";
import moment from "moment";

const initialState = {
  name: "",
  code: "",
  expiry: "",
  discount: "",
  limit: "",
  used: "",
};

const CouponUpdateForm = ({ history }) => {
  const { id } = useParams();
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);

  // Get coupon by id
  const getCoupon = async () => {
    setLoading(true);
    try {
      const { data } = await getCouponById(id);
      // Convert date to moment object
      data.expiry = moment(data.expiry).format("YYYY/MM/DD");
      setValues(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("GET_COUPON_BY_ID_ERROR", error);
    }
  };

  useEffect(() => {
    getCoupon();
  }, []);

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

    updateCouponById(id, values)
      .then((res) => {
        SuccessNotification(`${res.data.name} updated successfully`);
        history.push("/super-admin/coupons");
      })
      .catch((error) => {
        ErrorNotification("Error updating coupon");
        console.log("UPDATE_COUPON_ERROR", error);
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
          {!loading && (
            <Form.Item label="Expiry Date">
              <DatePicker
                className="hp-mb-16 hp-mr-16"
                onChange={(date, dateString) =>
                  setValues({ ...values, expiry: dateString })
                }
                defaultValue={moment(values?.expiry, "YYYY/MM/DD")}
              />
            </Form.Item>
          )}

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
              Update
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default withRouter(CouponUpdateForm);

import React, { useState, useEffect } from "react";
import { useParams, withRouter } from "react-router";
import { getPlanById, updatePlanById } from "../../../api/plan";
import { Row, Col, Form, Input, Button, InputNumber, Select } from "antd";
import { SuccessNotification, ErrorNotification } from "../../../components";

const initialState = {
  name: "",
  metaDescription: "",
  monthlyPrice: "",
  annualPrice: "",
  stripeProductId: "",
  stripeMonthlyPriceId: "",
  stripeAnnualPriceId: "",
  seatType: "",
  maxProjects: "",
  maxUsers: "",
  maxStorage: "",
  trialDays: "",
  features: [],
};

const PlanUpdateForm = ({ history }) => {
  const { id } = useParams();
  const [values, setValues] = useState(initialState);

  // Get plan by id
  const getPlan = async () => {
    try {
      const { data } = await getPlanById(id);
      setValues(data);
    } catch (error) {
      console.log("GET_PLAN_BY_ID_ERROR", error);
    }
  };

  useEffect(() => {
    getPlan();
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
    updatePlanById(id, values)
      .then((res) => {
        SuccessNotification(`${res.data.name} updated successfully`);
        history.push("/super-admin/plans");
      })
      .catch((error) => {
        ErrorNotification("Error updating plan");
        console.log("UPDATE_PLAN_ERROR", error);
      });
  };

  return (
    <Row>
      <Col span={24}>
        <Form
          labelCol={{
            span: 3,
          }}
          wrapperCol={{
            span: 12,
          }}
        >
          {/* Plan name */}
          <Form.Item label="Name">
            <Input
              name="name"
              placeholder="Plan name"
              onChange={handleFormChange}
              value={values.name}
              rules={[{ required: true }]}
            />
          </Form.Item>

          {/* Plan meta description */}
          <Form.Item label="Meta Description">
            <Input
              name="metaDescription"
              placeholder="Enter meta description"
              onChange={handleFormChange}
              value={values.metaDescription}
              rules={[{ required: true }]}
            />
          </Form.Item>

          {/* Seat type */}
          <Form.Item label="Seat Type">
            <Input
              name="seatType"
              placeholder="Enter seat type"
              onChange={handleFormChange}
              value={values.seatType}
              rules={[{ required: true }]}
            />
          </Form.Item>

          {/* Stripe product id */}
          <Form.Item label="Stripe Product ID">
            <Input
              name="stripeProductId"
              placeholder="Enter stripe product ID"
              onChange={handleFormChange}
              value={values.stripeProductId}
              rules={[{ required: true }]}
            />
          </Form.Item>

          {/* Stripe monthly price id */}
          <Form.Item label="Stripe Monthly Price ID">
            <Input
              name="stripeMonthlyPriceId"
              placeholder="Enter stripe monthly price ID"
              onChange={handleFormChange}
              value={values.stripeMonthlyPriceId}
              rules={[{ required: true }]}
            />
          </Form.Item>

          {/* Stripe annual price id */}
          <Form.Item label="Stripe Annual Price ID">
            <Input
              name="stripeAnnualPriceId"
              placeholder="Enter stripe annual price ID"
              onChange={handleFormChange}
              value={values.stripeAnnualPriceId}
              rules={[{ required: true }]}
            />
          </Form.Item>

          {/* Monthly price */}
          <Form.Item label="Monthly Price">
            <InputNumber
              name="monthlyPrice"
              placeholder="Monthly price"
              onChange={(value) => {
                setValues({
                  ...values,
                  monthlyPrice: value,
                });
              }}
              value={values.monthlyPrice}
              style={{ width: 150 }}
            />
          </Form.Item>

          {/* Annual price */}
          <Form.Item label="Annual Price">
            <InputNumber
              name="annualPrice"
              placeholder="Annual price"
              onChange={(value) => {
                setValues({
                  ...values,
                  annualPrice: value,
                });
              }}
              value={values.annualPrice}
              style={{ width: 150 }}
            />
          </Form.Item>

          {/* Max users */}
          <Form.Item label="Max Users">
            <InputNumber
              name="maxUsers"
              placeholder="Max users"
              onChange={(value) => {
                setValues({
                  ...values,
                  maxUsers: value,
                });
              }}
              value={values.maxUsers}
              style={{ width: 150 }}
            />
          </Form.Item>

          {/* Max projects */}
          <Form.Item label="Max Projects">
            <InputNumber
              name="maxProjects"
              placeholder="Max projects"
              onChange={(value) => {
                setValues({
                  ...values,
                  maxProjects: value,
                });
              }}
              value={values.maxProjects}
              style={{ width: 150 }}
            />
          </Form.Item>

          {/* Max storage */}
          <Form.Item label="Max Storage">
            <InputNumber
              name="maxStorage"
              placeholder="Max storage"
              onChange={(value) => {
                setValues({
                  ...values,
                  maxStorage: value,
                });
              }}
              value={values.maxStorage}
              style={{ width: 150 }}
            />
          </Form.Item>

          {/* Trial days */}
          <Form.Item label="Trial days">
            <InputNumber
              name="trialDays"
              placeholder="Enter trial days"
              onChange={(value) => {
                setValues({
                  ...values,
                  trialDays: value,
                });
              }}
              value={values.trialDays}
              style={{ width: 150 }}
            />
          </Form.Item>

          {/* Tags features */}
          <Form.Item label="Features">
            <Select
              mode="tags"
              name="tags"
              placeholder="Type and press enter to add tags"
              onChange={(tags) => {
                setValues({
                  ...values,
                  features: tags,
                });
              }}
              value={values.features}
              maxTagCount={3}
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
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

export default withRouter(PlanUpdateForm);

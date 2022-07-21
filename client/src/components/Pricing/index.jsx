import React, { useState, useEffect } from "react";
import { Divider, Row, Col, Switch, Button, Tag } from "antd";
import PricingItem from "./item";
import { getAllPlans } from "../../api/plan";
import { useSelector } from "react-redux";
import { manageSubscription } from "../../api/stripe";

const Pricing = () => {
  const { currentSubscription } = useSelector((state) => state.admin);
  const [plans, setPlans] = useState([]);
  const [billCycle, setBillCycle] = useState(true);
  const [loading, setLoading] = useState(false);
  const billedText = `Billed ${billCycle ? "annually" : "monthly"}`;

  // Get all plans
  useEffect(() => {
    getAllPlans().then((res) => {
      setPlans(res.data);
    });
  }, []);

  // Toggle billing cycle
  const onChange = (checked) => {
    if (checked) {
      setBillCycle(true);
    } else {
      setBillCycle(false);
    }
  };

  // Handle manage subscription
  const handleManageSub = (e) => {
    e.preventDefault();
    setLoading(true);
    manageSubscription()
      .then((res) => {
        // Redirect to portalUrl
        window.location.href = res.data.portalUrl;
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <Row gutter={[32, 32]} className="da-mb-32">
      <Col span={24}>
        <Row>
          {/* Header  */}
          <Col span={24}>
            <h2>Subscription Details</h2>
            <p className="da-p1-body da-mb-0">
              Upgrade your plan to get more features and support
            </p>
          </Col>

          <Divider className="da-border-color-black-40 da-border-color-dark-80" />

          {/* Plans */}
          <Col span={24}>
            <Row align="middle" justify="center" className="da-mt-32 da-mb-24">
              <span
                className={`da-caption ${
                  billCycle
                    ? "da-text-color-black-60"
                    : "da-text-color-primary-1"
                }`}
              >
                Billed monthly
              </span>

              <Switch className="da-mx-8" defaultChecked onChange={onChange} />

              <span
                className={`da-caption ${
                  billCycle
                    ? "da-text-color-primary-1"
                    : "da-text-color-black-60"
                }`}
              >
                Billed Annually
              </span>
            </Row>

            <Row align="middle" justify="center" className="da-mt-32 da-mb-24">
              <h5 className="da-text-color-primary-1">
                Save 30% on annual plan
              </h5>
            </Row>

            {/* Pricing Item Component */}
            <PricingItem
              plans={plans}
              billCycle={billCycle}
              billedText={billedText}
              currentSubscription={currentSubscription}
            />
          </Col>
        </Row>
      </Col>

      <Divider className={"da-border-color-black-40 da-border-color-dark-80"} />

      {/* Admin Subscription Details*/}
      <Row align="middle" justify="space-between">
        <Col md={12} span={24}>
          <h3>My Billing Details</h3>
        </Col>
        <Col
          span={24}
          className="da-profile-content-list da-mt-8 da-pb-sm-0 da-pb-120"
        >
          <ul>
            <li>
              <span className="da-p1-body">Plan Name</span>
              <span
                className="da-mt-sm-4 da-p1-body da-text-color-black-100 da-text-color-dark-0"
                style={{
                  // Bold
                  fontWeight: "bold",
                }}
              >
                {currentSubscription?.currentPlan}
              </span>
            </li>

            <li className="da-mt-18">
              <span className="da-p1-body">Status</span>
              <span className="da-mt-sm-4 da-p1-body da-text-color-black-100 da-text-color-dark-0">
                <Tag color="blue">
                  {currentSubscription?.subscriptionStatus}
                </Tag>
              </span>
            </li>

            <li className="da-mt-18">
              <span className="da-p1-body">Start Date</span>
              <span className="da-mt-sm-4 da-p1-body da-text-color-black-100 da-text-color-dark-0">
                {currentSubscription?.subscription?.startPeriod
                  ? new Date(
                      currentSubscription?.subscription?.startPeriod * 1000
                    ).toUTCString()
                  : "N/A"}
              </span>
            </li>

            <li className="da-mt-18">
              <span className="da-p1-body">Bill Cycle</span>
              <span
                className="da-mt-sm-4 da-p1-body da-text-color-black-100 da-text-color-dark-0"
                style={{
                  // Capitalize first letter
                  textTransform: "capitalize",
                  // Bold
                  fontWeight: "bold",
                }}
              >
                {currentSubscription?.subscription?.billInterval
                  ? currentSubscription?.subscription?.billInterval + "ly"
                  : "N/A"}
              </span>
            </li>

            <li className="da-mt-18">
              <span className="da-p1-body">Next Billing</span>
              <span className="da-mt-sm-4 da-p1-body da-text-color-black-100 da-text-color-dark-0">
                {currentSubscription?.subscription?.startPeriod
                  ? new Date(
                      currentSubscription?.subscription.endPeriod * 1000
                    ).toUTCString()
                  : "N/A"}
              </span>
            </li>
          </ul>
        </Col>
      </Row>
      <Col md={12} span={24} className="da-profile-action-btn da-text-right">
        <Button
          type="primary"
          ghost
          onClick={handleManageSub}
          disabled={
            currentSubscription?.currentPlan === "Free" ||
            currentSubscription?.currentPlan === "Lifetime"
          }
          loading={loading}
        >
          Manage Subscription
        </Button>
      </Col>
    </Row>
  );
};

export default Pricing;

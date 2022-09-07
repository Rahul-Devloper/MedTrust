import React, { useState } from "react";
import { Row, Col, Button } from "antd";
import { createSubscription, manageSubscription } from "../../api/stripe";
import { useHistory } from "react-router-dom";

const PricingItem = (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  // Handle subscribe click
  const handlePlanClick = async (e, item) => {
    e.preventDefault();

    const pricingId = props.billCycle
      ? item.stripeAnnualPriceId
      : item.stripeMonthlyPriceId;

    // If new subscription
    if (props.currentSubscription?.currentPlan === "Free") {
      setLoading(true);
      createSubscription({ pricingId })
        .then((res) => {
          // Redirect to checkoutUrl
          window.location.href = res.data.checkoutUrl;
        })
        .catch(() => {
          setLoading(false);
          history.push("/cancel");
        });
    } else {
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
    }
  };

  // SVG Tick Icon
  const listSVGTick = (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.99992 13.6667C3.31792 13.6667 0.333252 10.682 0.333252 7.00004C0.333252 3.31804 3.31792 0.333374 6.99992 0.333374C10.6819 0.333374 13.6666 3.31804 13.6666 7.00004C13.6666 10.682 10.6819 13.6667 6.99992 13.6667ZM6.99992 12.3334C8.41441 12.3334 9.77096 11.7715 10.7712 10.7713C11.7713 9.77108 12.3333 8.41453 12.3333 7.00004C12.3333 5.58555 11.7713 4.229 10.7712 3.2288C9.77096 2.22861 8.41441 1.66671 6.99992 1.66671C5.58543 1.66671 4.22888 2.22861 3.22868 3.2288C2.22849 4.229 1.66659 5.58555 1.66659 7.00004C1.66659 8.41453 2.22849 9.77108 3.22868 10.7713C4.22888 11.7715 5.58543 12.3334 6.99992 12.3334ZM6.33525 9.66671L3.50659 6.83804L4.44925 5.89537L6.33525 7.78137L10.1059 4.01004L11.0493 4.95271L6.33525 9.66671Z"
        fill="#0010F7"
      />
    </svg>
  );

  const listMap = props.plans.map((item, index) => (
    <Col
      className={`hp-pricing-item hp-p-24 hp-mx-xl-8 hp-mx-16 hp-mb-sm-24 hp-mb-16 hp-border-1 hp-border-radius ${"hp-border-color-black-40 hp-border-color-dark-80"}`}
      key={index}
      align="middle"
    >
      {/* Ribbon */}
      {props.currentSubscription?.currentPlan === item.name && (
        <div className="ribbon ribbon-top-left">
          <span>My Plan</span>
        </div>
      )}
      <div>
        <Row justify="space-between">
          <Col span={24}>
            <h4
              className="hp-mb-0 hp-pricing-item-title"
              style={{
                marginTop: "15px",
              }}
            >
              {item.name}
            </h4>
            <p className="hp-pricing-item-subtitle hp-caption hp-mb-sm-8 hp-mb-32 hp-text-color-black-60"></p>
          </Col>
        </Row>
        {/* If enterprise, show contact sales button, not price */}
        {item?.name === "Enterprise" ? (
          <Button
            block
            type="secondary"
            className="hp-pricing-item-contact-sales-button hp-caption hp-py-4 hp-px-16 hp-bg-color-primary-4 hp-text-color-primary-1"
          >
            <a
              href="https://www.netraga.com/contact"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact Us
            </a>
          </Button>
        ) : (
          <span className="hp-pricing-item-price h2">
            {props.billCycle
              ? `$ ${item.annualPrice}`
              : `$ ${item.monthlyPrice}`}
          </span>
        )}
        <p
          className="hp-pricing-item-billed hp-caption hp-mt-sm-0 hp-mt-4 hp-mb-0 hp-text-color-black-60"
          style={{
            // Space above
            paddingTop: "8px",
          }}
        >
          {item.metaDescription}
        </p>

        <p className="hp-pricing-item-billed hp-caption hp-mt-sm-0 hp-mt-4 hp-mb-0 hp-text-color-black-60">
          {props.billedText}
        </p>

        <ul className="hp-mt-24 hp-mb-0 hp-p-0">
          {item.features.map((item, index) => (
            <li
              key={index}
              className={`hp-pricing-item-list hp-d-flex-center hp-mt-8`}
            >
              {listSVGTick}
              <span
                className={`hp-d-block hp-ml-8 hp-caption hp-font-weight-400`}
                style={{
                  paddingLeft: "8px",
                }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {item?.name === "Enterprise" ? (
        <Button
          block
          type="primary"
          className="hp-mt-32 hp-pricing-item-contact-sales-button hp-caption hp-py-4 hp-px-16 hp-bg-color-primary-4 hp-text-color-primary-1"
        >
          <a
            href="https://www.netraga.com/contact"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact Us
          </a>
        </Button>
      ) : (
        <Button
          className="hp-mt-32"
          block
          type="primary"
          onClick={(e) => {
            handlePlanClick(e, item);
          }}
          disabled={
            props.currentSubscription?.currentPlan === item.name ||
            item.name === "Free" ||
            props.currentSubscription?.currentPlan === "Lifetime"
          }
          loading={loading}
        >
          {props.currentSubscription?.currentPlan === item.name
            ? "Current Plan"
            : item.name === "Free"
            ? "Free"
            : props.currentSubscription?.currentPlan === "Business"
            ? "Downgrade"
            : "Upgrade"}
        </Button>
      )}
    </Col>
  ));

  return (
    <>
      <Row
        className="hp-mt-32"
        justify="center"
        style={{
          height: "80%",
        }}
      >
        {listMap}
      </Row>
    </>
  );
};

export default PricingItem;

import React from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import { CouponCreateForm } from "../../../components";
import { Card, Row, Col } from "antd";

const CouponCreate = ({ history }) => {
  return (
    <>
      <Card className="hp-border-color-black-40 hp-mb-32 hp-analytics-project-table-card hp-project-table-card">
        <Row>
          <Col span={24}>
            <Row>
              <RiArrowGoBackFill
                style={{ fontSize: "2em", cursor: "pointer" }}
                onClick={() => history.push("/super-admin/coupons")}
              />
              <h3
                className="hp-mb-16"
                style={{
                  marginLeft: "1em",
                  fontSize: "1.75em",
                }}
              >
                Create a coupon
              </h3>
            </Row>
            {/* Space */}
            <Row style={{ marginTop: "1em" }} />
            {/* Coupon Create Form */}
            <CouponCreateForm />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default CouponCreate;

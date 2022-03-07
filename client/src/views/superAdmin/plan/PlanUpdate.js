import React from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import { PlanUpdateForm } from "../../../components";
import { Card, Row, Col } from "antd";

const PlanUpdate = ({ history }) => {
  return (
    <>
      <Card className="da-border-color-black-40 da-mb-32 da-analytics-project-table-card da-project-table-card">
        <Row>
          <Col span={24}>
            <Row>
              <RiArrowGoBackFill
                style={{ fontSize: "2em", cursor: "pointer" }}
                onClick={() => history.push("/super-admin/plans")}
              />
              <h3
                className="da-mb-16"
                style={{
                  marginLeft: "1em",
                  fontSize: "1.75em",
                }}
              >
                Update plan
              </h3>
            </Row>
            {/* Space */}
            <Row style={{ marginTop: "1em" }} />
            {/* Plan Update Form */}
            <PlanUpdateForm />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default PlanUpdate;

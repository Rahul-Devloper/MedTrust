import React, { useEffect } from "react";
import { Row, Col } from "antd";
import { SubscriptionInfo } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getAdminSubscriptionAction } from "../../redux/actions/adminActions";

const MySubscription = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // Run only for admin
    if (user.role === "admin") {
      fetchAdminPlan();
    }
  }, []);

  // Fetch all admin subscription
  const fetchAdminPlan = async () => {
    // Dispatch the get admin subs action
    dispatch(getAdminSubscriptionAction());
  };

  return (
    <>
      <Row
        style={{
          paddingLeft: "50px",
          paddingRight: "40px",
        }}
      >
        <Col span={24}>
          <SubscriptionInfo />
        </Col>
      </Row>
    </>
  );
};

export default MySubscription;

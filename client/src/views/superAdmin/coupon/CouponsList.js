import React, { useState, useEffect } from "react";
import { ParentTable, ParentTableHead } from "../../../components";
import { Card, Row, Col, Button, Modal } from "antd";
import { RiEditFill, RiDeleteBin2Fill } from "react-icons/ri";
import { getAllCoupons, deleteCouponById } from "../../../api/coupon";
import { SuccessNotification, ErrorNotification } from "../../../components";

const CouponsList = ({ history }) => {
  const [coupons, setCoupons] = useState([]);

  // Fetch all coupons
  const fetchCoupons = async () => {
    const { data } = await getAllCoupons();
    setCoupons(data);
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  // Handle coupon create
  const handleCouponCreate = () => {
    history.push("/super-admin/coupons/create");
  };

  // Handle coupon update
  const handleCouponUpdate = (id) => {
    history.push(`/super-admin/coupons/update/${id}`);
  };

  // Handle coupon delete
  const handleCouponDelete = (id) => {
    // Confirm delete
    Modal.confirm({
      title: "Are you sure you want to delete this coupon?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await deleteCouponById(id);
          // Fetch all coupons
          fetchCoupons();
          // Show success notification
          SuccessNotification("Coupon deleted successfully");
        } catch (error) {
          // Show error notification
          ErrorNotification("Error deleting coupon");
        }
      },
    });
  };

  return (
    <>
      <Card
        className="hp-border-color-black-40 hp-mb-32 hp-analytics-project-table-card hp-project-table-card"
        style={{ height: "100%" }}
      >
        <Row>
          <Col span={24}>
            <Row justify="space-between">
              <h3 className="hp-mb-16">Coupons List</h3>
              <Button type="primary" onClick={handleCouponCreate}>
                Create Coupon
              </Button>
            </Row>
            {/* All coupons table */}
            <ParentTable>
              <ParentTableHead>
                <tr>
                  <th scope="col">Coupon name</th>
                  <th scope="col">Code</th>
                  <th scope="col">Discount</th>
                  <th scope="col">Expiry Date</th>
                  <th scope="col">Limit</th>
                  <th scope="col">Used</th>
                  <th scope="col">Action</th>
                </tr>
              </ParentTableHead>
              <tbody>
                {coupons.map((coupon) => (
                  <tr key={coupon._id}>
                    <td>{coupon?.name}</td>
                    <td>{coupon?.code}</td>
                    <td>{coupon?.discount} %</td>
                    <td>{coupon?.expiry?.split("T")[0]}</td>
                    <td>{coupon?.limit}</td>
                    <td>{coupon?.used}</td>
                    <td style={{ cursor: "pointer" }}>
                      {/* Edit Icon */}
                      <RiEditFill
                        onClick={(e) => handleCouponUpdate(coupon._id)}
                      />
                      {/* Space between icons */}
                      <span style={{ margin: "0 10px" }} />
                      {/* Delete Icon */}
                      <RiDeleteBin2Fill
                        onClick={(e) => handleCouponDelete(coupon._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </ParentTable>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default CouponsList;

import React, { useState, useEffect } from "react";
import { ParentTable, ParentTableHead } from "../../../components";
import { Card, Row, Col, Button, Modal } from "antd";
import { RiEditFill, RiDeleteBin2Fill } from "react-icons/ri";
import { getAllPlans, deletePlanById } from "../../../api/plan";
import { SuccessNotification, ErrorNotification } from "../../../components";

const PlansList = ({ history }) => {
  const [plans, setPlans] = useState([]);

  // Fetch all plans
  const fetchPlans = async () => {
    const { data } = await getAllPlans();
    setPlans(data);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // Handle plan create
  const handlePlanCreate = () => {
    history.push("/super-admin/plans/create");
  };

  // Handle plan update
  const handlePlanUpdate = (id) => {
    history.push(`/super-admin/plans/update/${id}`);
  };

  // Handle plan delete
  const handlePlanDelete = (id) => {
    // Confirm delete
    Modal.confirm({
      title: "Are you sure you want to delete this plan?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          // Delete plan
          await deletePlanById(id);
          // Fetch all plans
          fetchPlans();
          // Show success notification
          SuccessNotification("Plan deleted successfully");
        } catch (error) {
          // Show error notification
          ErrorNotification("Error deleting plan");
        }
      },
    });
  };

  return (
    <>
      <Card
        className="da-border-color-black-40 da-mb-32 da-analytics-project-table-card da-project-table-card"
        style={{ height: "100%" }}
      >
        <Row>
          <Col span={24}>
            <Row justify="space-between">
              <h3 className="da-mb-16">Plan List</h3>
              <Button type="primary" onClick={handlePlanCreate}>
                Create Plan
              </Button>
            </Row>
            {/* All plans table */}
            <ParentTable>
              <ParentTableHead>
                <tr>
                  <th scope="col">Plan name</th>
                  <th scope="col">Meta description</th>
                  <th scope="col">Monthly price</th>
                  <th scope="col">Annual price</th>
                  <th scope="col">Max projects</th>
                  <th scope="col">Max users</th>
                  <th scope="col">Trial days</th>
                  <th scope="col">Action</th>
                </tr>
              </ParentTableHead>
              <tbody>
                {plans.map((plan) => (
                  <tr key={plan._id}>
                    <td>{plan.name}</td>
                    <td>{plan.metaDescription}</td>
                    <td>{plan.monthlyPrice}</td>
                    <td>{plan.annualPrice}</td>
                    <td>{plan.maxProjects}</td>
                    <td>{plan.maxUsers}</td>
                    <td>{plan.trialDays}</td>
                    <td style={{ cursor: "pointer" }}>
                      {/* Edit Icon */}
                      <RiEditFill onClick={(e) => handlePlanUpdate(plan._id)} />
                      {/* Space between icons */}
                      <span style={{ margin: "0 10px" }} />
                      {/* Delete Icon */}
                      <RiDeleteBin2Fill
                        onClick={(e) => handlePlanDelete(plan._id)}
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

export default PlansList;

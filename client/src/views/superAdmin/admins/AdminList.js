import React, { useState, useEffect } from "react";
import { ParentTable, ParentTableHead } from "../../../components";
import { Card, Row, Col, Tag } from "antd";
import { TiEyeOutline } from "react-icons/ti";
import { RiEditFill } from "react-icons/ri";
import { getAllAdmins } from "../../../api/superAdmin";

const AdminList = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    getAllAdmins()
      .then((res) => {
        setAdmins(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Handle admin view
  const handleAdminView = (id) => {};

  // Handle admin edit
  const handleAdminEdit = (id) => {};

  return (
    <>
      <Card
        className="da-border-color-black-40 da-mb-32 da-analytics-project-table-card da-project-table-card"
        style={{ height: "100%" }}
      >
        <Row>
          <Col span={24}>
            <Row justify="space-between">
              <h3 className="da-mb-16">All Admins</h3>
            </Row>

            {/* All admins table */}
            <ParentTable>
              <ParentTableHead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Join Date</th>
                  <th scope="col">Plan</th>
                  <th scope="col">No. of Projects</th>
                  <th scope="col">Team Size</th>
                  <th scope="col">Action</th>
                </tr>
              </ParentTableHead>
              <tbody>
                {admins &&
                  admins?.map((admin) => (
                    <tr key={admin._id}>
                      <td
                        onClick={() => handleAdminView(admin._id)}
                        style={{ cursor: "pointer" }}
                      >
                        {admin.name}
                      </td>
                      <td>
                        <Tag color="blue">{admin.email}</Tag>
                      </td>
                      <td>{admin.createdAt.split("T")[0]}</td>
                      <td>{admin.currentPlan}</td>
                      <td>{admin.projects.length}</td>
                      <td>{admin.members.length + admin.managers.length}</td>
                      <td style={{ cursor: "pointer" }}>
                        {/* View Icon */}
                        <TiEyeOutline
                          size={19}
                          onClick={() => handleAdminView(admin._id)}
                        />
                        <span style={{ margin: "0 10px" }} />
                        {/* Edit Icon */}
                        <RiEditFill
                          onClick={() => handleAdminEdit(admin._id)}
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

export default AdminList;

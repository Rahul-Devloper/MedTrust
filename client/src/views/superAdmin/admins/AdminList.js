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
        className="hp-border-color-black-40 hp-mb-32 hp-analytics-project-table-card hp-project-table-card"
        style={{
          overflowY: "auto",
          height: "calc(100vh - 150px)",
        }}
      >
        <Row>
          <Col span={24}>
            <Row justify="space-between">
              <h3 className="hp-mb-16">All Admins</h3>
            </Row>

            {/* All admins table */}
            <ParentTable>
              <ParentTableHead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Join Date</th>
                  <th scope="col">Plan</th>
                  <th scope="col">No. of Chatbots</th>
                  <th scope="col">Team Size</th>
                  <th scope="col">Action</th>
                </tr>
              </ParentTableHead>
              <tbody>
                {admins?.length > 0 &&
                  admins?.map((admin) => (
                    <tr key={admin?._id}>
                      <td
                        onClick={() => handleAdminView(admin?._id)}
                        style={{ cursor: "pointer" }}
                      >
                        {admin?.name && admin?.name}
                      </td>
                      <td>
                        <Tag color="blue">{admin?.email && admin?.email}</Tag>
                      </td>
                      <td>
                        {admin?.createdAt && admin?.createdAt.split("T")[0]}
                      </td>
                      <td>{admin?.currentPlan}</td>
                      <td>{admin?.chatbots.length}</td>
                      <td>{admin?.team.length}</td>
                      <td style={{ cursor: "pointer" }}>
                        {/* View Icon */}
                        <TiEyeOutline
                          size={19}
                          onClick={() => handleAdminView(admin?._id)}
                        />
                        <span style={{ margin: "0 10px" }} />
                        {/* Edit Icon */}
                        <RiEditFill
                          onClick={() => handleAdminEdit(admin?._id)}
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

import React, { useState, useEffect } from "react";
import { ParentTable, ParentTableHead } from "../../../components";
import { Card, Row, Col, Tag } from "antd";
import { getAllLeads } from "../../../api/superAdmin";

const LeadsList = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    getAllLeads()
      .then((res) => {
        setLeads(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Card
        className="da-border-color-black-40 da-mb-32 da-analytics-project-table-card da-project-table-card"
        style={{ height: "100%" }}
      >
        <Row>
          <Col span={24}>
            <Row justify="space-between">
              <h3 className="da-mb-16">All Leads</h3>
            </Row>

            {/* All leads table */}
            <ParentTable>
              <ParentTableHead>
                <tr>
                  <th scope="col">Email</th>
                  <th scope="col">Country</th>
                  <th scope="col">State</th>
                  <th scope="col">City</th>
                  <th scope="col">Visit Date</th>
                  <th scope="col">Country Code</th>
                  <th scope="col">IP</th>
                </tr>
              </ParentTableHead>
              <tbody>
                {leads &&
                  leads?.map((lead) => (
                    <tr key={lead?._id} style={{ cursor: "pointer" }}>
                      <td>{lead?.email}</td>
                      <td>
                        <Tag color="blue">{lead?.meta?.country_name}</Tag>
                      </td>
                      <td>{lead?.meta?.state}</td>
                      <td>
                        <Tag color="blue">{lead?.meta?.city}</Tag>
                      </td>
                      <td>{lead?.createdAt.split("T")[0]}</td>
                      <td>{lead?.meta?.country_code}</td>
                      <td>
                        <Tag color="red">{lead?.meta?.IPv4}</Tag>
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

export default LeadsList;

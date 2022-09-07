import React, { useState, useEffect } from "react";
import { ParentTable, ParentTableHead } from "../../../components";
import { Card, Row, Col, Tag } from "antd";
import { getAllVisitors } from "../../../api/superAdmin";

const VisitorList = () => {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    getAllVisitors()
      .then((res) => {
        setVisitors(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
              <h3 className="hp-mb-16">All Visitors</h3>
            </Row>

            {/* All visitors table */}
            <ParentTable>
              <ParentTableHead>
                <tr>
                  <th scope="col">Country</th>
                  <th scope="col">Source</th>
                  <th scope="col">State</th>
                  <th scope="col">City</th>
                  <th scope="col">Visit Date</th>
                  <th scope="col">Country Code</th>
                  <th scope="col">IP</th>
                </tr>
              </ParentTableHead>
              <tbody>
                {visitors &&
                  visitors?.map((visitor) => (
                    <tr key={visitor?._id} style={{ cursor: "pointer" }}>
                      <td>
                        <Tag color="blue">{visitor?.meta?.country_name}</Tag>
                      </td>
                      <td>
                        {visitor?.utm_source?.split("utm_source=")[1]
                          ? visitor?.utm_source?.split("utm_source=")[1]
                          : visitor?.utm_source}
                      </td>
                      <td>{visitor?.meta?.state}</td>
                      <td>
                        <Tag color="blue">{visitor?.meta?.city}</Tag>
                      </td>
                      <td>{visitor?.createdAt?.split("T")[0]}</td>
                      <td>{visitor?.meta?.country_code}</td>
                      <td>
                        <Tag color="red">{visitor?.meta?.IPv4}</Tag>
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

export default VisitorList;

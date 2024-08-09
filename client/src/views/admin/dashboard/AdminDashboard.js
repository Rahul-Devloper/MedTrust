import React from "react";
import { useSelector } from "react-redux";
import { Row, Col } from "antd";
import CardGrid from '../../../components/Cards/CardGrid'

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth)

  return (
    <>
      <Row gutter={[32, 0]}>
        <Col span={24}>
          <h2
            style={{
              marginLeft: '10px',
            }}>
            Welcome, {user?.name.split(' ')[0]} 👋
          </h2>
        </Col>
      </Row>
      <h2>Select what you want to do</h2>
      <Row gutter={[16, 16]} justify='center'>
        <Col span={10}>
          <CardGrid
            children={['Manage Patients', 'Manage Doctors']}
            gridStyle={{ width: '50%', textAlign: 'center' }}
            // targetOffset={targetOffset}
            isSticky={false}
            viewPath={'/admin/'}
            toRenderView={true}
            isHorizontal={true}
            alignment='center'
          />
        </Col>
      </Row>
    </>
  )
}

export default AdminDashboard;
